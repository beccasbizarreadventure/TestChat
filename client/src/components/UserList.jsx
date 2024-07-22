import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const users = [
  { id: 1, email: 'user1@example.com' },
  { id: 2, email: 'user2@example.com' },
  { id: 3, email: 'user3@example.com' },
];

function UserList() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">User List</h1>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between w-64">
            <span>{user.email}</span>
            <Link to={`/chat/${user.id}`}>
              <button>Message</button>
            </Link>
          </div>
        ))}
      </div>
      <button onClick={handleLogout} className="mt-4">Logout</button>
    </div>
  );
}

export default UserList;