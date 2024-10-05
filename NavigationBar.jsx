import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-section">
          <h1>DEV@Deakin</h1>
        </div>
        <div className="navbar-section">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="navbar-section navbar-links">
          <Link to="/post">Post</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavigationBar;

