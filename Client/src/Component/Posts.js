import React from 'react';

const Posts = ({ users, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {users.map(post => (
        <li  className='list-group-item'>
          {post.email}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
