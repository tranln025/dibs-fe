import React from 'react';
import MyPosts from './MyPosts';
import DibsClaimed from './DibsClaimed';
import './ProfileTabs.css';

const ProfileTabs = props => {
  return (
    <div className="profile-tabs">
      <ul className="nav nav-tabs">
        <li><a data-toggle="tab" href="#myposts">My Posts</a></li>
        <li><a data-toggle="tab" href="#dibsclaimed">Dibs Claimed</a></li>
      </ul>

      <div className="tab-content">
        <div id="myposts" className="tab-pane fade">
          <MyPosts myPosts={props.myPosts} />
        </div>
        <div id="dibsclaimed" className="tab-pane fade">
          <DibsClaimed dibsClaimed={props.dibsClaimed} />
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;