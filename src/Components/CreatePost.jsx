import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [caption, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('Posts').insert([
      { title, caption }
    ]);

    if (error) console.log('Error:', error);
    else navigate('/');
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="create-post-input"
          required
        />
        <textarea
          value={caption}
          onChange={e => setContent(e.target.value)}
          placeholder="Caption"
          className="create-post-textarea"
        />
        <button type="submit" className="create-post-submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;

