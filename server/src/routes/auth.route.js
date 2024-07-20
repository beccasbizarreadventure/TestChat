import express from 'express';
import {login ,logout, register} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', login);

// https://localhost:5000/api/auth/register
router.post('/register', register);

router.post('/logout', logout);

export default router;