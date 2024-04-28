import React from 'react';
import { Link } from 'react-router-dom';

function Post({ post, formatTimeAgo }) {
    return (
      <li className="post-card">
        <div className="post-meta">Posted {formatTimeAgo(new Date(post.created_at), { addSuffix: true })}</div>
        <Link to={`/post/${post.id}`} className="post-title">{post.title}</Link>
        <div className="post-upvotes">{post.up_votes} upvotes</div>
      </li>
    );
  }
  
  export default Post;
