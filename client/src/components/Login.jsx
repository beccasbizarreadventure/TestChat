import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    navigate('/users');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-black" />
        </div>
        <div>
          <label className="block">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black" />
        </div>
        <div>
          <label className="block">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-black" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;