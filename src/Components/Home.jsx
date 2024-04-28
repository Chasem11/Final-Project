import React, { useEffect, useState } from 'react';
import Post from './Post';
import { supabase } from '../supabaseClient';
import { formatDistanceToNow } from 'date-fns';

function Home() {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Newest'); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();  
  }, [activeFilter, searchTerm]); 

  const fetchPosts = async () => {
    let query = supabase.from('Posts').select('*');

    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    if (activeFilter === 'Most Popular') {
      query = query.order('up_votes', { ascending: false }); 
    } else {
      query = query.order('created_at', { ascending: false });  
    }

    const { data, error } = await query;

    if (error) {
      console.log('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  return (
    <div className="app-container">
      <div className="filter-container">
        <button
          className={`filter-btn ${activeFilter === 'Newest' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Newest')}
        >
          Newest
        </button>
        <button
          className={`filter-btn ${activeFilter === 'Most Popular' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Most Popular')}
        >
          Most Popular
        </button>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <ul className="posts-list">
        {posts.map(post => (
          <Post key={post.id} post={post} formatTimeAgo={formatDistanceToNow} />
        ))}
      </ul>
    </div>
  );
}

export default Home;

