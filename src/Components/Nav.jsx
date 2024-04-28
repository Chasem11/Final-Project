import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <h1>Sports Chat</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create New Post</Link>
      </div>
    </nav>
  );
}

export default Nav;