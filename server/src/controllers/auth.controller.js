import bcryptjs from 'bcryptjs';
import generateToken from '../utilities/generateToken.js';
import {registerUser, findUser} from '../db/queries/users.queries.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await registerUser(name, email, hashedPassword);

    if (newUser) {
      generateToken(newUser.id, res)
      res.status(201).json({ 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  }
  catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
export const login = async (req, res) => { 
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await findUser(email);
    console.log (user);
    if (user.email !== email) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    generateToken(user.id, res);
    res.status(200).json({ 
      id: user.id, 
      name: user.name, 
      email: user.email 
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => { };