import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DeleteModal extends Component {
  state = {
    confirmed: false,
  };

  handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${this.props.freebie._id}`)
      .then((res) => {
        this.props.history.goBack()
      })
      .catch(err => console.log(err));
  };

  handleCancel = () => {
    this.props.handleDeleteModalOpen();
  };

  render() {
    return (
      <Modal show={this.props.deleteModalOpen} onHide={this.props.handleDeleteModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete "{this.props.freebie.title}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={this.handleCancel} className="btn btn-dark">Cancel</Button>
          <Button onClick={this.handleDelete} className="btn btn-danger">Yes</Button>
        </Modal.Body>
      </Modal>
    );
  };
};

export default withRouter(DeleteModal);