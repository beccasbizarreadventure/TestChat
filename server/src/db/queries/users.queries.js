import client from '../index.js';

const registerUser = async (name, email, password) => {
  try {
    const data = await client.query(
      `INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, email, password]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const data = await client.query(
      `SELECT * FROM users 
      WHERE email = $1`,
      [email]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const data = await client.query(
      `SELECT * FROM users
      WHERE id = $1`,
      [id]
    );
    return data.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export {registerUser, getUserByEmail, getUserById};