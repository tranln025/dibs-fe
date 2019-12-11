import React, { Component } from 'react';
import Freebies from './Freebies/Freebies';
import './FreebiesList.css';

class FreebiesList extends Component {
  componentDidMount() {
    this.props.fetchFreebies();
  };

  render() {
    return (
      <div className="freebies-list container">
        <Freebies freebies={this.props.freebies} />
      </div>
    );
  };
};

export default FreebiesList;