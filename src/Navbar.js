import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">AuthPortal</h2>
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
