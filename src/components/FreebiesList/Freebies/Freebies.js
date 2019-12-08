import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card';
import { withRouter } from "react-router";

class Freebies extends Component {

  render() {
    const freebies = this.props.freebies.map(freebie => {    
      return (
        <Card onClick={() => this.props.history.push(`/freebies/${freebie._id}`)} key={freebie._id}>
          <Card.Img variant="top" src={freebie.photo} />
          <Card.Body>
            <Card.Title>{freebie.title} 
              <br />
              <small>{freebie.author.username}</small>
            </Card.Title>
            <Card.Text>{freebie.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted"><Moment fromNow>{freebie.datePosted}</Moment></small>
          </Card.Footer>
        </Card>
      );
    });
  
    return (
      <CardColumns>
        {freebies}
      </CardColumns>
    );
  };
};

export default withRouter(Freebies);