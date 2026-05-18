import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import chatRoute from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Handles large layout JSON objects safely

app.use('/api/chat', chatRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running smoothly on port ${PORT}`);
});