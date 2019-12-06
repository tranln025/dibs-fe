import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Routes from './config/Routes';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
  };

  setCurrentUser = (userId) => {
    this.setState({ currentUser: userId });
    localStorage.setItem('uid', userId);
  };

  logout = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/auth/logout`, { withCredentials: true })
      .then(res => {
        localStorage.removeItem('uid');
        this.setState({ currentUser: null });
        this.props.history.push('/');
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} logout={this.logout} />
        <h1>App</h1>
        <Routes currentUser={this.state.currentUser} />
      </div>
    )
  }
}

export default withRouter(App);
