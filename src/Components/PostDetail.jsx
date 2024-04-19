import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
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
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.caption}</p>
          <button onClick={handleUpvote}>Upvote ({post.up_votes})</button>
          {/* Additional UI elements for comments can be added here */}
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostDetail;

