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

export {newChatMessage};