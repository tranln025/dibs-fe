import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileTabs.css';

const MyPosts = props => {
  const myPosts = props.myPosts.map(post => {
    return (
      <div className="img-overlay-container" key={post._id}>
        <Link to={`/freebies/${post._id}`}>
          <img src={post.photo} alt="Avatar" className="post-image" />
          <div className="middle">
            <div className="text">{post.title}</div>
          </div>
        </Link>
      </div>
    )
  })

  return (
    <div className="row">
      {myPosts}
    </div>
  );
};

export default MyPosts;