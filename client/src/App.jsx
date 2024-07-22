import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserListPage from './pages/UserListPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/api/auth/login" element={<LoginPage />} />
      <Route path="/api/auth/register" element={<RegisterPage />} />
      <Route path="/api/messages/chats" element={<UserListPage />} />
      <Route path="api/messages/:id" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
