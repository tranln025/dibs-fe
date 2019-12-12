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
            <div className="landing-hero">
              <img src="https://images.unsplash.com/photo-1531263539449-56fdf29dfc4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" />
            </div>
            <div className="about-dibs">
              <div className="row">
                <div className="col-md-6">
                Dibs provides you with an quick and easy way to declutter your home, grab free food nearby, or give gifts to strangers! Dibs is localized to San Francisco, so you know if you call dibs on an item or put something up for grabs, your dreams will come true within the hour. Sign up now to get dibbin'!
                </div>
                <div className="col-md-6">
                  <p>"Dibs is literally the greatest thing ever. I've been grabbing free stuff left and right! Look at my hat. Look how cute. I got it from someone on Dibs!"</p>
                  <p className="testimony-author"> - Chulian, satisfied customer</p>
                  <hr />
                  <p>"I LOVE DIBS. I gave away 90% of my furniture and now I'm living my best minimalist life."</p>
                  <p className="testimony-author"> - Chust Chay, another satisfied customer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="register-form col-md-4">
            <h3>Start Dibbin'</h3>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupfirstName">
                <Form.Control required onChange={this.handleChange} className="landing-input" placeholder="First Name" type="text" name="firstName" value={this.state.firstName} />
              </Form.Group>
              <Form.Group controlId="formGrouplastName">
                <Form.Control required onChange={this.handleChange} className="landing-input" placeholder="Last Name" type="text" name="lastName" value={this.state.lastName} />
              </Form.Group>
              <Form.Group controlId="formGroupUsername">
                <Form.Control required onChange={this.handleChange} className="landing-input" placeholder="Username" type="text" name="username" value={this.state.username} />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Control required onChange={this.handleChange} className="landing-input" placeholder="Email" type="email" name="email" value={this.state.email} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control required onChange={this.handleChange} className="landing-input" placeholder="Password" type="password" name="password" value={this.state.password} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword2">
                <Form.Control required onChange={this.handleChange} className="landing-input" placeholder="Confirm Password" type="password" name="password2" value={this.state.password2} />
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