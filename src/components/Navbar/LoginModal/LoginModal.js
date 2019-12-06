import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router";
import axios from 'axios';

class LoginModal extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,
    this.state, {
      withCredentials: true,
    })
    .then((res) => {
      this.props.setCurrentUser(res.data.data);
      this.props.history.push(`/users/${res.data.data}`);
      this.props.handleLoginModalOpen();
    })
    .catch((error) => console.log(error));
  };

  render() {
    return (
      <Modal show={this.props.loginModalOpen} onHide={this.props.handleLoginModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} >
            <Form.Group controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleChange} type="text" name="username" value={this.state.username} />
              </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleChange} type="password" name="password" value={this.state.password} />
              </Form.Group>
            <Button className="btn btn-primary float-right" type="submit">Login</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
};

export default withRouter(LoginModal);