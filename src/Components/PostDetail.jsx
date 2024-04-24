import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CommentForm from './CommentForm';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);  // Adding id as a dependency to refetch if the id changes

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) console.log('Error loading post:', error);
    else setPost(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('post_id', id);
    
    if (error) {
      console.log('Error loading comments:', error);
    } else {
      setComments(data);
    }
  };

  const handleUpvote = async () => {
    const newUpvotes = post.up_votes + 1;
    const { data, error } = await supabase
      .from('Posts')
      .update({ up_votes: newUpvotes })
      .match({ id: id });

    if (error) {
      console.log('Error upvoting:', error);
    } else {
      setPost({ ...post, up_votes: newUpvotes });  // Update state to reflect the new upvote count
    }
  };

  return (
    <div className="post-detail-container">
      {post ? (
        <>
          <img src={post.image_url} alt="Post visual content" className="post-image" />
          <h1 className="post-title">{post.title}</h1>
          <p className="post-caption">{post.caption}</p>
          <div className="upvote-section">
            <button onClick={handleUpvote} className="upvote-button">
              {/* Upvote icon here */}
            </button>
            <span className="upvote-count">{post.up_votes} upvotes</span>
          </div>
          <div className="comment-section">
            {/* Render comments here */}
            {comments.map(comment => (
              <div key={comment.id} className="comment">{comment.comment}</div>
            ))}
            {/* Comment input and submit button */}
            <input type="text" className="comment-input" placeholder="Leave a comment..." />
            <button className="comment-submit">Submit</button>
          </div>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetail;

