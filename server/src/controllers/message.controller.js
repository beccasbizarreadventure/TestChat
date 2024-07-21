import { findPrivateChat, createNewChat, addChatParticipants } from "../db/queries/chats.queries.js";
import { newChatMessage } from "../db/queries/messages.queries.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.body.user_id // the user token from the protectRoute middleware

    let chat = await findPrivateChat(senderId, receiverId)

    if (chat) {
     await newChatMessage(senderId, chat.id, message);
     res.status(200).json({ message: "Message sent successfully" });
    }

    if (!chat) {
      const chatId = await createNewChat();
      const participants = [senderId, receiverId];
      await addChatParticipants(participants, chatId);
      await newChatMessage(senderId, chatId, message);
      res.status(201).json({ message: "New chat created and message sent successfully" });
    }

  } catch(error) {
    console.error("Error in sendMessage: ", error.message); 
    res.status(500).json({error: "Internal server error"});
  }
};