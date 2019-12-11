import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router";
import axios from 'axios';
import './Landing.css';

class Landing extends Component {
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
    })
    .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="landing">
        <div className="row">
          <div className="col-md-8">
            <div className="hero">
              <img src="https://images.unsplash.com/photo-1531263539449-56fdf29dfc4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" />
            </div>
            <div className="about-dibs">
              <div className="row">
                <div className="col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis. Placerat orci nulla pellentesque dignissim. Mattis pellentesque id nibh tortor. Sapien eget mi proin sed libero. Volutpat diam ut venenatis tellus in metus vulputate eu. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Iaculis urna id volutpat lacus laoreet non.
                </div>
                <div className="col">
                  Id porta nibh venenatis cras sed felis. Donec pretium vulputate sapien nec sagittis aliquam. Lacus viverra vitae congue eu consequat ac felis donec et. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Pellentesque massa placerat duis ultricies lacus sed.
                </div>
              </div>
            </div>
          </div>
          <div className="register-form col-md-4">
            <h3>Start Dibbin'</h3>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupfirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="firstName" value={this.state.firstName} />
              </Form.Group>
              <Form.Group controlId="formGrouplastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="lastName" value={this.state.lastName} />
              </Form.Group>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="username" value={this.state.username} />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.handleChange} type="email" name="email" value={this.state.email} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.handleChange} type="password" name="password" value={this.state.password} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={this.handleChange} type="password" name="password2" value={this.state.password2} />
              </Form.Group>
              <Button className="btn btn-primary float-right" type="submit">Sign Up</Button>
            </Form>
          </div>
        </div>
      </div>


    )
  }
}

export default withRouter(Landing);