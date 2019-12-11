import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
      this.props.setCurrentUser(res.data.data);
      this.props.history.push(`/freebies`);
      this.props.handleRegisterModalOpen();
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
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupfirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required onChange={this.handleChange} type="text" name="firstName" value={this.state.firstName} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGrouplastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required onChange={this.handleChange} type="text" name="lastName" value={this.state.lastName} />
                </Form.Group>
              </Col>
            </Form.Row>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required onChange={this.handleChange} type="text" name="username" value={this.state.username} />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required onChange={this.handleChange} type="email" name="email" value={this.state.email} />
              </Form.Group>
            <Form.Group controlId="formGroupPassword"> 
              <Form.Label>Password</Form.Label>
              <Form.Control required onChange={this.handleChange} type="password" name="password" value={this.state.password} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required onChange={this.handleChange} type="password" name="password2" value={this.state.password2} />
            </Form.Group>
            <Button className="btn btn-primary float-right" type="submit">Sign Up</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
};

export default withRouter(RegisterModal);