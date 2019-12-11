import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import EditAvatarModal from './EditAvatarModal/EditAvatarModal';
import './ProfileUserInfo.css';

class ProfileUserInfo extends Component {
  state = {
    userObject: {},
    editAvatarModal: false,
    // activeDib: {},
  };

  fetchUserInfo = () => {
    const currentUser = localStorage.getItem('uid')
    axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser}`, {
      withCredentials: true,
    })
    .then(res => {
      this.setState({
        userObject: res.data.data,
      })
    })
    .catch(err => console.log(err))
  }

  // getActiveDib = () => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
  //     withCredentials: true,
  //   })
  //   .then(res => {
  //     let activeDib = res.data.data.filter(post => post.currentDib && post.currentDib.dibber === this.state.userObject._id);
  //     this.setState({
  //       activeDib,
  //     })
  //   })
  //   .catch(err => console.log(err))
  // }

  componentDidMount() {
    this.fetchUserInfo();
    // this.getActiveDib();
  }

  handleEditAvatarModal = () => {
    this.setState((prevState) => {
      return {
        editAvatarModal: !prevState.editAvatarModal
      }
    }, this.fetchUserInfo);
  };

  render() {
    const user = this.state.userObject;
    return (
      <div className="user-info col-md-3">
        <div onClick={this.handleEditAvatarModal} className="avatar-container">
          <img src={user.photo} alt="Avatar" className="avatar-image" />
          <div className="middle">
            <div className="text">Update</div>
          </div>
        </div>
        <p>{user.username}</p>
        <p>{user.firstName} {user.lastName}</p>
        <p>Dibber since <Moment local format="MMMM YYYY">{user.joinDate}</Moment></p>
        <h4 className="current-dib">{}</h4>
        <EditAvatarModal 
          userObject={this.state.userObject}
          editAvatarModal={this.state.editAvatarModal} 
          handleEditAvatarModal={this.handleEditAvatarModal} 
        />
      </div>
    );
  };
};

export default ProfileUserInfo;