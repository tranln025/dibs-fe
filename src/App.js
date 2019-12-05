import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import './App.css';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
  };

  render() {
    return (
      <>
        <Navbar />
        <h1>App.js</h1>
      </>
    )
  }
}

export default withRouter(App);
