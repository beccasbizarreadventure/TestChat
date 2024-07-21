import bcryptjs from 'bcryptjs';
import generateToken from '../utilities/generateToken.js';
import {registerUser, getUserByEmail, getUserById} from '../db/queries/users.queries.js';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email in use' });
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

const login = async (req, res) => { 
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
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

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logout success"});
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await getUserById(req.body.user_id)
    if(!user) {
      return res.status(404).json({error:"User not found"});
    }
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

 export {register, login, logout, currentUser};