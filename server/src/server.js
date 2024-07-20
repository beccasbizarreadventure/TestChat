import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Home route');
});

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});