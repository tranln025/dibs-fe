import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class EditModal extends Component {
  state = {
    photo: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.userObject._id}`,
    this.state, {
      withCredentials: true,
    })
    .then((res) => {
      this.props.handleEditAvatarModal();
    })
    .catch((error) => console.log(error));
  };

  render() {
    return (
      <Modal show={this.props.editAvatarModal} onHide={this.props.handleEditAvatarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGroupPhoto">
              <Form.Label>Image Link</Form.Label>
              <Form.Control onChange={this.handleChange} type="text" name="photo" value={this.state.photo} />
            </Form.Group>
            <Button className="btn btn-primary float-right" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
};

export default EditModal;