import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import PostDetail from './Components/PostDetail';
import CreatePost from './Components/CreatePost';
import Nav from './Components/Nav';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use element instead of component */}
          <Route path="/post/:id" element={<PostDetail />} /> {/* Use element instead of component */}
          <Route path="/create" element={<CreatePost />} /> {/* Use element instead of component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

