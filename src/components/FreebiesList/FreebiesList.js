import React, { Component } from 'react';
import axios from 'axios';
import Freebie from './Freebie/Freebie';

class FreebiesList extends Component {
  state = {
    freebies: []
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(res => {
      this.setState({
        freebies: res.data.data
      })
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="freebies-list container">
        <Freebie freebies={this.state.freebies} />
      </div>
    );
  };
};

export default FreebiesList;