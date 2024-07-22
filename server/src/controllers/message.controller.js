import { findPrivateChat, createNewChat, addChatParticipants } from "../db/queries/chats.queries.js";
import { newChatMessage, findChatWithMessages } from "../db/queries/messages.queries.js";
import { getAllOtherUsers } from "../db/queries/users.queries.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.body.user_id // the user token from the protectRoute middleware

    const chat = await findPrivateChat(senderId, receiverId)

    if (chat) {
     const newMessage = await newChatMessage(senderId, chat.id, message);
     res.status(201).json({ 
      message: "Message sent successfully",
      data: {
        chatId: chat.id,
        newMessage: newMessage
      } 
    });
    }

    if (!chat) {
      const chatId = await createNewChat();
      const participants = [senderId, receiverId];
      await addChatParticipants(participants, chatId);
      const newMessage = await newChatMessage(senderId, chatId, message);
      res.status(201).json({ 
        message: "New chat created and message sent successfully",
        data: {
          chatId: chatId,
          participants: participants,
          newMessage: newMessage
        }
       });
    }

    // socket.io here

  } catch(error) {
    console.error("Error in sendMessage: ", error.message); 
    res.status(500).json({error: "Internal server error"});
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id: otherUserInChat } = req.params; // this loads the messages that the logged in user has with another specific user
    const senderId = req.body.user_id;
    const chat = await findChatWithMessages(senderId, otherUserInChat);

    if (!chat || chat.length === 0) {
      return res.status(200).json([]); // Return an empty array if no chat messages found
    }
    return res.status(200).json(chat);
  } catch(error) {
    console.error("Error in getMessages: ", error.message); 
    res.status(500).json({error: "Internal server error"});
  }
};

// to click message button next to a user name and open the convo
export const getOtherUsers = async (req, res) => {
  try {
    const currentUser = req.body.user_id;
    const users = await getAllOtherUsers(currentUser);

    return res.status(200).json(users);
  } catch(error) {
    console.error("Error in getOtherUsers: ", error.message); 
    res.status(500).json({error: "Internal server error"});
  }
};