import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import Button from 'react-bootstrap/Button';
import RegisterModal from './RegisterModal/RegisterModal';
import LoginModal from './LoginModal/LoginModal';
import './Navbar.css';

class Navbar extends Component {
  state = {
    loginModalOpen: false,
    registerModalOpen: false,
  };

  // Source for modal handling: https://stackoverflow.com/questions/56960664/how-to-make-popup-modal-appear-when-clicking-a-link
  handleLoginModalOpen = () => {
    this.setState((prevState) => {
      return {
        loginModalOpen: !prevState.loginModalOpen
      }
    });
  };

  handleRegisterModalOpen = () => {
    this.setState((prevState) => {
      return {
        registerModalOpen: !prevState.registerModalOpen
      }
    });
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
          <div className="container">
            <Link to="/"><span className="navbar-brand">Dibs!</span></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample04">
              <ul className="navbar-nav ml-auto">
                {!this.props.currentUser ?
                <>
                <li className="nav-item">
                  <a onClick={this.handleLoginModalOpen} variant="info" className="nav-link login">Log In </a>
                </li>
                <li className="nav-item active">
                  <Button onClick={this.handleRegisterModalOpen} variant="info" className="nav-link register">Register <span className="sr-only">(current)</span></Button>
                </li>
                </> : <>
                <li className="nav-item">
                  <Link to="/freebies" className="nav-link">Freebies</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item active">
                  <Button onClick={this.props.logout} variant="info" className="nav-link">Log Out</Button>
                </li>
                </> }
              </ul>
            </div>
          </div>
        </nav>
        <LoginModal loginModalOpen={this.state.loginModalOpen} handleLoginModalOpen={this.handleLoginModalOpen} setCurrentUser={this.props.setCurrentUser} />
        <RegisterModal registerModalOpen={this.state.registerModalOpen} handleRegisterModalOpen={this.handleRegisterModalOpen} setCurrentUser={this.props.setCurrentUser} />
      </>
    )
  }
};

export default withRouter(Navbar);