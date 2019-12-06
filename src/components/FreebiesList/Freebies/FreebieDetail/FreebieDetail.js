import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class FreebieDetail extends Component {
  state = {
    freebie: {}
  }

  componentDidMount() {
    const postId = this.props.match.params.id
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
    .then(res => {
      this.setState({
        freebie: res.data.data
      })
    })
    .catch(err => console.log(err))
  };

  handleDibs = () => {
    console.log('dibs clicked')
  }

  render() {
    const freebie = this.state.freebie;
    console.log("author object>>>", freebie.author);
    console.log("freebie object>>>", freebie)
    return (
      <div className="container">
        <img className="freebie-photo" src={freebie.photo} alt={freebie.title} />
        {/* <img className="freebie-author-photo" src={freebie.author.photo} alt={freebie.author.username} /> */}
        <h3>{freebie.title}</h3>
        {/* <small>{freebie.author.username}</small> */}
        <p>{freebie.address}</p>
        <p>{freebie.datePosted}</p>
        <p>{freebie.description}</p>
        <Button onClick={this.handleDibs} className="btn btn-primary">DIBS!</Button>
      </div>
    );
  };
};

export default FreebieDetail;