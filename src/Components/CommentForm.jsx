import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function CommentForm({ postId, onNewComment }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('Comments')
      .insert([{ post_id: postId, comment }])
      .select();

    if (error) {
      console.log('Error submitting comment:', error);
    } else if (data && data.length > 0) {
      console.log('Comment added:', data);
      setComment('');
      onNewComment(data[0]);
    } else {
      console.log('No data returned after adding comment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        className="comment-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
        required
      ></textarea>
      <button type="submit" className="submit-comment-btn">Submit Comment</button>
    </form>
  );
}

export default CommentForm;

