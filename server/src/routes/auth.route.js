import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Login successful');
});

// https://localhost:5000/api/auth/register
router.get('/register', (req, res) => {
  res.send('Register successful');
});

router.get('/logout', (req, res) => {
  res.send('Logout successful');
});

export default router;