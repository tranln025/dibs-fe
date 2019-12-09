import React, { Component } from 'react';
import FreebiesList from '../../components/FreebiesList/FreebiesList';
import NewFreebieForm from '../../components/NewFreebieForm/NewFreebieForm';
import axios from 'axios';

class FreebiesContainer extends Component {
  state = {
    freebiesFormOpen: false,
    freebies: [],
  }

  fetchFreebies = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(res => {
      this.setState({
        freebies: res.data.data
      })
    })
    .catch(err => console.log(err));
  }

  handleFreebiesFormOpen = () => {
    this.setState((prevState) => {
      return {
        freebiesFormOpen: !prevState.freebiesFormOpen
      }
    });
  }

  render() {
    return (
      <>
        <h1>FreebiesContainer</h1>
        <button onClick={this.handleFreebiesFormOpen}>Add Freebie</button>
        <FreebiesList
          freebies={this.state.freebies} 
          fetchFreebies={this.fetchFreebies} 
        />
        <NewFreebieForm 
          freebiesFormOpen={this.state.freebiesFormOpen} 
          handleFreebiesFormOpen={this.handleFreebiesFormOpen} 
          currentUser={this.props.currentUser}
          fetchFreebies={this.fetchFreebies} 
        />
      </>
    )
  }
}

export default FreebiesContainer;