import express from 'express';
import protectRoute from '../utilities/protectRoute.js';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
const router = express.Router();

// https://localhost:5000/api/messages/send/:id
router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessages);

export default router;