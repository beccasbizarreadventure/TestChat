import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">Welcome to the Chat App</h1>
      <div className="space-x-4">
        <Link to="/api/auth/login">
          <button>Login</button>
        </Link>
        <Link to="/api/auth/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;