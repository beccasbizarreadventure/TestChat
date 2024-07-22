import express from 'express';
import protectRoute from '../utilities/protectRoute.js';
import { sendMessage, getMessages, getOtherUsers } from '../controllers/message.controller.js';
const router = express.Router();

// https://localhost:5000/api/messages/chats
// CHATS HAS TO BE FIRST SO IT ISN'T SEEN AS AN ID
router.get('/chats', protectRoute, getOtherUsers);
// https://localhost:5000/api/messages/:id
router.get('/:id', protectRoute, getMessages);


// https://localhost:5000/api/messages/send/:id
router.post('/send/:id', protectRoute, sendMessage);

export default router;