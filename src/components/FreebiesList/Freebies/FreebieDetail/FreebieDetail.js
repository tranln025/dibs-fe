import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import 'moment-timezone';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import CommentsContainer from '../../../../containers/CommentsContainer/CommentsContainer';
import './FreebieDetail.css'
import claimed from './claimed.png'

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
    const body = {
      post: this.state.freebie._id,
      dibber: this.props.currentUser,
    };
    axios.post(`${process.env.REACT_APP_API_URL}/dibs`,
    body, {
      withCredentials: true,
    })
    .then(res => {
      this.setState({
        currentDib: res.data.data.currentDib,
      });
      this.fetchPostInfo();
    })
    .catch(err => console.log(err));
  };

  deleteDib = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/dibs/${this.state.currentDib._id}`)
    .then((res) => {
      this.fetchPostInfo();
    })
    .catch(err => console.log(err));
  };

  handleEditModalOpen = () => {
    this.setState((prevState) => {
      return {
        editModalOpen: !prevState.editModalOpen
      };
    }, this.fetchPostInfo);
  };

  handleDeleteModalOpen = () => {
    this.setState((prevState) => {
      return {
        deleteModalOpen: !prevState.deleteModalOpen
      };
    });
  };

  markAsClaimed = () => {
    // Mark dib as claimed: true
    axios.put(`${process.env.REACT_APP_API_URL}/dibs/${this.state.currentDib._id}`,
      {claimed: true}, 
      { withCredentials: true, })
    .catch(err => console.log(err));

    // Add dib to User's dibsClaimed array
    axios.get(`${process.env.REACT_APP_API_URL}/users/${this.state.currentDib.dibber}/addClaimedDib`, {
      params: {
        dibberId: this.state.currentDib.dibber,
        dibId: this.state.currentDib._id,
      }
    })
    .catch(err => console.log(err));

    // Remove currentDib and add dibber as claimant from post instance
    axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.state.freebie._id}`, 
      { currentDib: null, claimant: this.state.currentDib.dibber }, 
      { withCredentials: true, })
    .then(res => {
      // Remove currentDib from state
      this.setState({
        currentDib: null,
      }, this.fetchPostInfo)
    })
    .catch(err => console.log(err));
  };

  addControls = () => {
    // if a user is logged in
    if (this.props.currentUser) {
      // if user is logged in and is author
      if (this.state.author._id === this.props.currentUser) {
        // if user is logged in and is author and dib exists
        if (this.state.currentDib) {
          // if user is logged in and is author and a dib exists and freebie is NOT claimed
          if (!this.state.freebie.claimant) {
            return (
              <div className="claimed-btn-block">
                <Button onClick={this.markAsClaimed} variant="warning">Mark as Claimed</Button>
              </div>
            )
          // if user is logged in and is author and a dib exists and freebie IS claimed
          } else {
            return (
              // <></>
              <img className="claimed-label" src={claimed}/>
              // <h2 className="claimed-label">CLAIMED</h2>
            )
        };
        // if user is logged in and is author and no currentDib exists
        } else {
          // if user is logged in and is author and no currentDib exists but freebie is claimed
          if (this.state.freebie.claimant) {
            return (
              // <h2 className="claimed-label">CLAIMED by {this.state.freebie.claimant.username}</h2>
              <img className="claimed-label" src={claimed}/>
            )
          // if user is logged in and is author and no currentDib exists and freebie is NOT claimed
          } else {
            return (
              <div className="author-control-btn-block">
                <span className="author-control-btn" onClick={this.handleEditModalOpen} ><i className="fas fa-edit fa-2x"></i></span>
                <span className="author-control-btn" onClick={this.handleDeleteModalOpen} ><i className="fas fa-trash-alt fa-2x"></i></span>
                <p className="dibs-error">No one has called dibs yet!</p>
              </div>
            )
          }
        }
      // if user is logged in and is NOT author
      } else {
        // if user is logged in and is NOT author and dib exists
        if (this.state.currentDib) {
          return (
            <div className="dibs-btn-block">
              <Button 
                onClick={this.createDib} 
                className="btn btn-primary dibs-btn" 
                title={this.state.currentDib ? "Item has been dibbed" : null} 
                disabled={this.state.currentDib}>DIBS!
              </Button>
            </div>
          )
        // if user is logged in and is NOT author and no dib exists
        } else {
          // if user is logged in and is NOT author and no dib exists and freebie is claimed
          if (this.state.freebie.claimant) {
            return (
              // <h2 className="claimed-label">CLAIMED by {this.state.freebie.claimant.username}</h2>
              <img className="claimed-label" src={claimed}/>
            )
          // if user is logged in and is NOT author and no dib exists and freebie is NOT claimed
          } else {
            return (
              <div className="dibs-btn-block">
                <Button 
                  onClick={this.createDib} 
                  className="btn btn-primary dibs-btn" 
                  title={this.state.currentDib ? "Item has been dibbed" : null} 
                  disabled={this.state.currentDib}>DIBS!
                </Button>
              </div>
            )
          }
        }
      }
    }
  }

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
          this.deleteDib();
        } else {
          this.setState({
            currentDib: null,
          });
          axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.state.freebie._id}`,
          {currentDib: null}, {
            withCredentials: true,
          })
          .catch(err => console.log(err))
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
        <></>
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
      <div className="freebie-detail container">
        <div className="row">
          <div className="col-md-6">
            <img className="freebie-photo" src={freebie.photo} alt={freebie.title} />
          </div>
          <div className="col-md-6">
            <h3>{freebie.title}</h3>
            <p>{freebie.address}</p>
            <p>Posted <Moment local format="MMM. DD, YYYY [at] h:MM a">{freebie.datePosted}</Moment></p>
            <p>{freebie.description}</p>
            <hr />
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
            {this.addControls()}
            {this.showDibError()}
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
          </div>
        </div>

        <CommentsContainer currentUser={this.props.currentUser} freebie={this.state.freebie} />
      </div>
    );
  };
};

export default withRouter(FreebieDetail);