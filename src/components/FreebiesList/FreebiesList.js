import React, { Component } from 'react';
import axios from 'axios';
import Freebie from './Freebie/Freebie';

class FreebiesList extends Component {
  componentDidMount() {
    this.props.fetchFreebies();
  };

  render() {
    return (
      <div className="freebies-list container">
        <Freebie freebies={this.props.freebies} />
      </div>
    );
  };
};

export default FreebiesList;