// Navbar.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <nav className="bg-cyan-950 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Lingio-Connect</div>
        <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-cyan-950 transition duration-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
