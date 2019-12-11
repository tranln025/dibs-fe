import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileTabs.css';

const DibsClaimed = props => {
  const dibsClaimed = props.dibsClaimed.map(post => {
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
      {dibsClaimed}
    </div>
  );
};

export default DibsClaimed;