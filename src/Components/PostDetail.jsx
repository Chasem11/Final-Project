import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { supabase } from '../supabaseClient';
import CommentForm from './CommentForm';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCaption, setEditCaption] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) console.log('Error loading post:', error);
    else {
      setPost(data);
      setEditTitle(data.title);
      setEditCaption(data.caption);
    }
  };

  const handleNewComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('post_id', id);
    
    if (error) console.log('Error loading comments:', error);
    else setComments(data);
  };

  const handleUpvote = async () => {
    const newUpvotes = post.up_votes + 1;
    const { data, error } = await supabase
      .from('Posts')
      .update({ up_votes: newUpvotes })
      .match({ id: id });

    if (error) console.log('Error upvoting:', error);
    else setPost({ ...post, up_votes: newUpvotes });
  };

  const handleDelete = async () => {
    try {
      const { error: commentError } = await supabase
        .from('Comments')
        .delete()
        .match({ post_id: id });
  
      if (commentError) {
        throw new Error('Error deleting comments: ' + commentError.message);
      }
      const { error: postError } = await supabase
        .from('Posts')
        .delete()
        .match({ id: id });
  
      if (postError) {
        throw new Error('Error deleting post: ' + postError.message);
      }

      navigate('/');  
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .update({ title: editTitle, caption: editCaption })
      .match({ id: id });

    if (error) console.log('Error updating post:', error);
    else {
      setPost({ ...post, title: editTitle, caption: editCaption });
      setEditMode(false);
    }
  };

  return (
    <div className="post-detail-container">
      {post ? (
        <>
          {editMode ? (
            <>
              <input className="edit-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <textarea className="edit-textarea" value={editCaption} onChange={(e) => setEditCaption(e.target.value)} />
              <button className="save-changes-btn" onClick={handleEdit}>Save Changes</button>
            </>
          ) : (
            <>
              <h1 className="post-title">{post.title}</h1>
              <p className="post-caption">{post.caption}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </>
          )}
          <button onClick={handleDelete} className="delete-button">Delete Post</button>
          <div className="upvote-section">
            <button onClick={handleUpvote} className="upvote-button">
            </button>
            <span className="upvote-count">{post.up_votes} upvotes</span>
          </div>
          <div className="comment-section">
            <h2>Comments</h2>
            {comments.map(comment => (
              <div key={comment.id} className="comment">{comment.comment}</div>
            ))}
            <CommentForm postId={id} onNewComment={handleNewComment} />
          </div>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetail;

