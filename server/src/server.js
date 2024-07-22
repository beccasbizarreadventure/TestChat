import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import client from './db/index.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import {app, server} from './socket/socket.js';

config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser()); // for cookies
app.use(express.json()); // for parsing json data

app.get('/', (req, res) => {
  res.send('Home route');
});

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
  client.connect()
  .then(() => console.log('Connected to the database, server running on port', PORT))
  .catch(err => console.error('Connection error', err.stack));
});