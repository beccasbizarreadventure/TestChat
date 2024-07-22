import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const messages = [
  { sender: 'user1', text: 'Hello!' },
  { sender: 'user2', text: 'Hi there!' },
];

function Chat() {
  const { userId } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    // Perform send message logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Chat with User {userId}</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-left">
            <span className="font-bold">{msg.sender}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="space-y-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-black"
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => navigate('/users')} className="mt-4">Back</button>
    </div>
  );
}

export default Chat;