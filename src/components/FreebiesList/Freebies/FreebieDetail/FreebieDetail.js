import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import 'moment-timezone';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import './FreebieDetail.css'

class FreebieDetail extends Component {
  state = {
    freebie: {},
    author: {},
    editModalOpen: false,
    deleteModalOpen: false,
  }

  fetchPostInfo = () => {
    const postId = this.props.match.params.id
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
    .then(res => {
      this.setState({
        freebie: res.data.data,
        author: res.data.data.author
      })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchPostInfo();
  };

  handleDibs = () => {
    console.log('dibs clicked')
  };

  handleEditModalOpen = () => {
    console.log('handleEditModalOpen')
    this.setState((prevState) => {
      return {
        editModalOpen: !prevState.editModalOpen
      };
    }, this.fetchPostInfo);
  };

  handleDeleteModalOpen = () => {
    console.log('handleDeleteModalOpen')
    this.setState((prevState) => {
      return {
        deleteModalOpen: !prevState.deleteModalOpen
      };
    });
  };

  markAsClaimed = () => {
    console.log('markAsClaimed')
  };

  addAuthorControls = () => {
    return (
      <>
        <div className="author-controls">
          <span className="author-control-btn" onClick={this.handleEditModalOpen} >Edit</span>
          <span className="author-control-btn" onClick={this.handleDeleteModalOpen} >Delete</span>
          <Button onClick={this.markAsClaimed} variant="warning">Mark as Claimed</Button>
        </div>
        <EditModal 
          freebie={this.state.freebie} 
          editModalOpen={this.state.editModalOpen} 
          handleEditModalOpen={this.handleEditModalOpen} 
        />
        <DeleteModal 
          freebie={this.state.freebie} 
          deleteModalOpen={this.state.deleteModalOpen} 
          handleDeleteModalOpen={this.handleDeleteModalOpen} 
        />
      </>
    );
  };

  render() {
    const freebie = this.state.freebie;
    const author = this.state.author;
    return (
      <div className="container">
        <img className="freebie-photo" src={freebie.photo} alt={freebie.title} />
        <h3>{freebie.title}</h3>
        <p>{freebie.address}</p>
        <p>Posted <Moment local format="MMM. DD, YYYY [at] hh:MM a">{freebie.datePosted}</Moment></p>
        <p>{freebie.description}</p>
        <div className="seller-info">
          <p>Seller Information</p>
          <div className="row">
            <div className="freebie-author-photo">
              <img src={author.photo} alt={author.username} />
            </div>
            <div className="freebie-author-info">
              <small>{author.username}</small>
              <br />
              <small>Dibber since <Moment local format="MMMM YYYY">{author.joinDate}</Moment></small>
            </div>
          </div>
        </div>
        {this.state.author._id === localStorage.getItem('uid') ?
          this.addAuthorControls() 
          :
          <Button onClick={this.handleDibs} className="btn btn-primary">DIBS!</Button>
        }
      </div>
    );
  };
};

export default FreebieDetail;