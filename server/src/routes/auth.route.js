import express from 'express';
import protectRoute from '../utilities/protectRoute.js';
import {login ,logout, register, currentUser} from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/user', protectRoute, currentUser);
// https://localhost:5000/api/auth/login
router.post('/login', login);
// https://localhost:5000/api/auth/register
router.post('/register', register);
// https://localhost:5000/api/auth/logout
router.post('/logout', logout);

export default router;