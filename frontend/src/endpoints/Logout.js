import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutLink = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login'); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:underline focus:outline-none"
    >
      Logout
    </button>
  );
};

export default LogoutLink;
