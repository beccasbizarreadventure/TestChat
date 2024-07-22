import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173/"], // REACT app origin
    methods: ["GET", "POST"],
  }
});
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = { }; // for users currently online, maps the userId to the socketId

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  console.log("User connected", userId);

  // socket.on listens to events from both client and server
  socket.on('disconnect', () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
  });
});

export { app, io, server };