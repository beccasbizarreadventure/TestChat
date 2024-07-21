import client from '../index.js';

const registerUser = async (name, email, password) => {
  try {
    const data = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;