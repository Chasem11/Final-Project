// CommentForm.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function CommentForm({ postId }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('Comments')
      .insert([
        { post_id: postId, comment: comment }
      ]);

    if (error) {
      console.log('Error submitting comment:', error);
    } else {
      // Optionally perform an action after the comment is added
      console.log('Comment added:', data);
      setComment(''); // Reset comment input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
        required
      ></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;
