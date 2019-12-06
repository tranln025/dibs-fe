import React, { Component } from 'react';
import FreebiesList from '../../components/FreebiesList/FreebiesList';
import NewFreebieForm from '../../components/NewFreebieForm/NewFreebieForm';

class FreebiesContainer extends Component {
  state = {
    freebiesFormOpen: false,
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
        <FreebiesList />
        <NewFreebieForm 
          freebiesFormOpen={this.state.freebiesFormOpen} 
          handleFreebiesFormOpen={this.handleFreebiesFormOpen} 
          currentUser={this.props.currentUser} 
        />
      </>
    )
  }
}

export default FreebiesContainer;