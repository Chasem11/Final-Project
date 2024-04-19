// Home.jsx
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { supabase } from '../supabaseClient';
import { formatDistanceToNow } from 'date-fns';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Fetch posts with their upvote counts ordered by creation time
    const { data, error } = await supabase
      .from('Posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  return (
    <div className="app-container">
      <div className="filter-container">
        {/* Buttons to sort the posts */}
        <button className="filter-btn active">Newest</button>
        <button className="filter-btn">Most Popular</button>
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
