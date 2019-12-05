import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class LoginModal extends Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    return (
      <h1>LoginModal</h1>
    )
  }
}

export default LoginModal;