import React, { Component } from 'react';
import axios from 'axios';
import ProfileUserInfo from '../../components/ProfileUserInfo/ProfileUserInfo';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import './ProfileContainer.css';

class ProfileContainer extends Component {
  state = {
    myPosts: [],
    dibsClaimed: [],
    currentUser: localStorage.getItem('uid'),
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(res => {
      const allPosts = res.data.data;
      const myPosts = allPosts
        .filter(post => post.author._id === this.state.currentUser)
        .sort((a, b) => (a.datePosted < b.datePosted) ? 1 : -1);
      const dibsClaimed = allPosts
        .filter(post => post.claimant && post.claimant._id === this.state.currentUser)
        .sort((a, b) => (a.datePosted < b.datePosted) ? 1 : -1);
      this.setState({
        myPosts,
        dibsClaimed,
      });
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <div className="profile-container container">
          <div className="row">
            <ProfileUserInfo userObject={this.state.userObject}/>
            <ProfileTabs myPosts={this.state.myPosts} dibsClaimed={this.state.dibsClaimed} />
          </div>
        </div>
      </>
    )
  }
}

export default ProfileContainer;