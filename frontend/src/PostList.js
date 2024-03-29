import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreateComment } from './CreateComment';
import { CommentList } from './CommentList';

export const PostList = () => {
  const [post, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get('http://localhost:4002/posts');

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPosts = Object.values(post).map(post => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CreateComment postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
