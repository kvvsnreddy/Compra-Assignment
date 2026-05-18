import { useState } from 'react';
import axios from 'axios';
import initialLayoutData from '../data/initialLayout.json';

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayoutData);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMessagePayload = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessagePayload]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: text,
        layout,
        history: messages.slice(-6), // Send last 6 turns for semantic memory context
      });

      setLayout(response.data.updatedLayout);
      setMessages((prev) => [...prev, { role: 'assistant', content: response.data.explanation }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Could not connect to layout intelligence pipeline layer.' }]);
    } finally {
      setLoading(false);
    }
  };

  return { layout, messages, loading, sendMessage };
}
