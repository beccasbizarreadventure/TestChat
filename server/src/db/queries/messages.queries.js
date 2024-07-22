import client from '../index.js';

const newChatMessage = async (senderId, chatId, message) => {
  try {
    const data = await client.query(
      `INSERT INTO chat_messages (user_id, chat_id, message) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [senderId, chatId, message]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const findChatWithMessages = async (senderId, receiverId) => {
  try {
    const data = await client.query(
      `SELECT chat_messages.*, chats.*
      FROM chat_messages
      JOIN chats ON chat_messages.chat_id = chats.id
      JOIN chat_participants ON chats.id = chat_participants.chat_id
      WHERE chat_participants.user_id = $1
        AND EXISTS (
          SELECT 1
          FROM chat_participants
          WHERE chat_participants.chat_id = chats.id
            AND chat_participants.user_id = $2
        )
      ORDER BY chat_messages.created_at ASC`,
      [senderId, receiverId]
    );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};


export {newChatMessage, findChatWithMessages};