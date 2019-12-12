import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import FreebiesList from '../../components/FreebiesList/FreebiesList';
import NewFreebieForm from '../../components/NewFreebieForm/NewFreebieForm';
import axios from 'axios';
import './FreebiesContainer.css';

class FreebiesContainer extends Component {
  state = {
    freebiesFormOpen: false,
    freebies: [],
  }

  fetchFreebies = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(res => {
      const freebies = res.data.data;
      const unclaimedFreebies = freebies.filter((item) => !item.claimant)
      this.setState({
        freebies: unclaimedFreebies.sort((a, b) => (a.datePosted < b.datePosted) ? 1 : -1)
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
        <Parallax
          className="freebies-hero"
          blur={{ min: -15, max: 15 }}
          bgImage={require('./grab-darken.jpg')}
          bgImageAlt="the dog"
          strength={-200}
        >
          <div className="parallax-cover">
            <div className="parallax-inner">
              <h1><b>UP FOR GRABS</b></h1>
              <a onClick={this.handleFreebiesFormOpen}><i className="fas fa-plus-circle fa-3x"></i></a>
            </div>
          </div>

        </Parallax>
        
        
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