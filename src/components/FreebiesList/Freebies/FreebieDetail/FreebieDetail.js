import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    currentDib: {},
    dibberIsCurrentUser: false,
  }

  fetchPostInfo = () => {
    const postId = this.props.match.params.id
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
    .then(res => {
      this.setState({
        freebie: res.data.data,
        author: res.data.data.author,
        currentDib: res.data.data.currentDib,
      }, this.checkForDib)
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchPostInfo();
  };

  createDib = () => {
    console.log('dibs clicked');
    const body = {
      post: this.state.freebie._id,
      dibber: this.props.currentUser,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/dibs`,
    body, {
      withCredentials: true,
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        currentDib: res.data.data.currentDib,
      });
      this.fetchPostInfo();
    })
    .catch(err => console.log(err));
  };

  deleteDib = () => {
    console.log('dib deleted');
    axios.delete(`${process.env.REACT_APP_API_URL}/dibs/${this.state.currentDib._id}`)
    .then((res) => {
      this.fetchPostInfo();
    })
    .catch(err => console.log(err));
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
    console.log('markAsClaimed');
    // add dib to User's dibsClaimed array
    // remove state currentDib
    // remove post currentDIb
    // fetchpostinfo
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

  checkForDib = () => {
    let dib = this.state.currentDib;
    if (dib) {
      let expirationTime = Date.parse(dib.timeExpired);
      if (Date.now() < expirationTime) {
        if (dib.dibber !== this.props.currentUser) {
          this.setState({
            dibberIsCurrentUser: false,
          })
        } else {
          this.setState({
            dibberIsCurrentUser: true,
          })
        }
      } else {
        if (!dib.claimed) {
          this.setState({
            currentDib: null,
          });
          axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.state.freebie._id}`,
          {currentDib: null}, {
            withCredentials: true,
          })
        } else {
          this.setState({
            currentDib: null,
          });
          axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.state.freebie._id}`,
          {currentDib: null}, {
            withCredentials: true,
          })
        };
      };
    };
  };

  showDibError = () => {
    if (this.state.currentDib && this.state.dibberIsCurrentUser) {
      return (
        <p className="dibs-error">You've called dibs! Claim your prize by <Moment format="h:mm a">{this.state.currentDib.timeExpired}</Moment> or you'll lose your dibs! </p>
      )
    } else if (this.state.currentDib && !this.state.dibberIsCurrentUser) {
      return (
        <p className="dibs-error">Someone has already called dibs! Try again later</p>
      )
    } else {
      return (
        <></>
      );
    };
  };

  render() {
    const freebie = this.state.freebie;
    const author = this.state.author;
    return (
      <div className="container">
        <img className="freebie-photo" src={freebie.photo} alt={freebie.title} />
        <h3>{freebie.title}</h3>
        <p>{freebie.address}</p>
        <p>Posted <Moment local format="MMM. DD, YYYY [at] h:MM a">{freebie.datePosted}</Moment></p>
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
        {this.state.author._id === this.props.currentUser ?
          this.addAuthorControls() 
          :
          <Button 
            onClick={this.createDib} 
            className="btn btn-primary dibs-btn" 
            title={this.state.currentDib ? "Item has been dibbed" : null} 
            disabled={this.state.currentDib}>DIBS!
          </Button>
        }
        {this.showDibError()}
      </div>
    );
  };
};

export default withRouter(FreebieDetail);