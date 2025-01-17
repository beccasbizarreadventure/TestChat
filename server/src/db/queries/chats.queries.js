import client from '../index.js';

const findPrivateChat = async (senderId, receiverId) => {
  try {
    const data = await client.query(
      `SELECT chats.*
      FROM chats
      JOIN chat_participants ON chats.id = chat_participants.chat_id
      WHERE chat_participants.user_id = $1
        AND EXISTS (
          SELECT 1
          FROM chat_participants
          WHERE chat_participants.chat_id = chats.id
            AND chat_participants.user_id = $2
        )`,
      [senderId, receiverId]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};


const createNewChat = async () => {
  try { 
  const data = await client.query(
  `INSERT INTO chats 
  DEFAULT VALUES
  RETURNING id`);
  return data.rows[0].id;
  } catch (error) {
  console.log(error);
  }
};


const addChatParticipants = async (participants, chatId) => {
  try {
    const promises = participants.map(participant => 
      client.query(
        `INSERT INTO chat_participants (user_id, chat_id) 
         VALUES ($1, $2) 
         RETURNING *`,
        [participant, chatId]
      )
    );
    const results = await Promise.all(promises);
    return results.map(result => result.rows[0]);
  } catch (error) {
    console.log("Error adding chat participants:", error);
    throw error;
  }
};

export {findPrivateChat, createNewChat, addChatParticipants};