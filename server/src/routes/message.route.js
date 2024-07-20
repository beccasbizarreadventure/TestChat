import express from 'express';
const router = express.Router();

// https://localhost:5000/api/messages/chat
router.get('/chat', (req, res) => {
  res.send('Messages chat route');
});

export default router;