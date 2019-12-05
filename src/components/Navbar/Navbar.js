import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RegisterModal from './RegisterModal/RegisterModal';
import LoginModal from './LoginModal/LoginModal';

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
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand">Expand at md</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample04">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Button onClick={this.handleLoginModalOpen} className="nav-link">Log In <span className="sr-only">(current)</span></Button>
                </li>
                <li className="nav-item">
                  <Button onClick={this.handleRegisterModalOpen} className="nav-link">Register</Button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">Freebies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">Profile</Link>
                </li>
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

export default Navbar;