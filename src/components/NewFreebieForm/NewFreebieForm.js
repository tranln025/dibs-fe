import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class NewFreebieForm extends Component {
  state = {
    title: '',
    address: '',
    photo: '',
    description: '',
    author: this.props.currentUser,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/posts`,
    this.state, {
      withCredentials: true,
    })
    .then((res) => {
      this.props.handleFreebiesFormOpen();
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <Modal show={this.props.freebiesFormOpen} onHide={this.props.handleFreebiesFormOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Post a Freebie</Modal.Title>
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

export default NewFreebieForm;