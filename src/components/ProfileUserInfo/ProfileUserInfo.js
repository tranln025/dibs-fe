import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import EditAvatarModal from './EditAvatarModal/EditAvatarModal';

class ProfileUserInfo extends Component {
  state = {
    userObject: {},
    editAvatarModal: false,
  };

  fetchUserInfo = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
      withCredentials: true,
    })
    .then(res => {
      this.setState({
        userObject: res.data.data,
      })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchUserInfo();
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
      <div className="user-info">
        <a onClick={this.handleEditAvatarModal}><img src={user.photo} /></a>
        <p>{user.username}</p>
        <p>{user.firstName} {user.lastName}</p>
        <p>Dibber since <Moment local format="MMMM YYYY">{user.joinDate}</Moment></p>
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