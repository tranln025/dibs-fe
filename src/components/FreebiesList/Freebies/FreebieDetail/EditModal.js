import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class EditModal extends Component {
  state = {
    title: this.props.freebie.title,
    address: this.props.freebie.address,
    photo: this.props.freebie.photo,
    description: this.props.freebie.description,
    author: this.props.freebie.author,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/posts/${this.props.freebie._id}`,
    this.state, {
      withCredentials: true,
    })
    .then((res) => {
      this.props.handleEditModalOpen();
    })
    .catch((error) => console.log(error));
  };

  render() {
    return (
      <Modal show={this.props.editModalOpen} onHide={this.props.handleEditModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Edit "{this.props.freebie.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={this.handleChange} type="text" name="title" value={this.state.title} />
            </Form.Group>
            <Form.Group controlId="formGroupAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={this.handleChange} type="text" name="address" value={this.state.address} />
            </Form.Group>
            <Form.Group controlId="formGroupPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control onChange={this.handleChange} type="text" name="photo" value={this.state.photo} />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" onChange={this.handleChange} type="text" name="description" value={this.state.description} />
            </Form.Group>
            <Button className="btn btn-primary float-right" type="submit">Post</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  };
};

export default EditModal;