import db from '../db/index.js';

export const registerUser = async (name, email, password) => {
  try {
    const newUser = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return newUser.rows[0];
  } catch (error) {
    console.log(error);
  }
};

