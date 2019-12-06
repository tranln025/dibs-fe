import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router";
import axios from 'axios';

class RegisterModal extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, this.state, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.status === 400 || res.data.status === 500) {
        this.setState({
          usernameValid: false,
          emailValid: false,
        })
      } else {
        this.props.setCurrentUser(res.data.data);
        this.props.history.push(`/users/${res.data.data}`);
        this.props.handleRegisterModalOpen();
      }
    })
    .catch(err => console.log(err))
  };

  render() {
    return (
      <Modal show={this.props.registerModalOpen} onHide={this.props.handleRegisterModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="firstName" name="firstName" value={this.state.firstName} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="lastName" name="lastName" value={this.state.lastName} />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="username" name="username" value={this.state.username} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="email" id="email" name="email" value={this.state.email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password2" name="password2" value={this.state.password2} />
            </div>
            <button className="btn btn-primary float-right" type="submit">Sign Up</button>
          </form>
        </Modal.Body>
      </Modal>
    );
  };
};

export default withRouter(RegisterModal);