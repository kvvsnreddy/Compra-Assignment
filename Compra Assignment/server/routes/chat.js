import express from 'express';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';
import { callLLM } from '../services/llmService.js';
import { resizeArtboard } from '../services/layoutTransforms.js';
import { validateLayout } from '../utils/jsonValidator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, layout, history } = req.body;
    let currentLayout = structuredClone(layout);

    // Rule-based interception for aspect ratio switches to preserve precision
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('9:16') || lowerMessage.includes('story') || lowerMessage.includes('reel')) {
      currentLayout = resizeArtboard(currentLayout, 1080, 1920);
    } else if (lowerMessage.includes('1:1') || lowerMessage.includes('square')) {
      currentLayout = resizeArtboard(currentLayout, 1080, 1080);
    } else if (lowerMessage.includes('16:9') || lowerMessage.includes('youtube')) {
      currentLayout = resizeArtboard(currentLayout, 1920, 1080);
    }

    const systemPrompt = buildSystemPrompt(currentLayout);
    const llmResult = await callLLM(systemPrompt, history, message);

    validateLayout(llmResult.updatedLayout);

    res.json({
      explanation: llmResult.explanation,
      updatedLayout: llmResult.updatedLayout,
    });
  } catch (error) {
    console.error('❌ Interaction Route Failure:', error);
    res.status(500).json({ explanation: 'An internal validation or processing failure occurred.', updatedLayout: req.body.layout });
  }
});

export default router;