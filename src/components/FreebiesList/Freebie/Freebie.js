import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card';

const Freebie = (props) => {
  const freebies = props.freebies.map(freebie => {
    return (
      <Card key={freebie._id}>
        <Card.Img variant="top" src={freebie.photo} />
        <Card.Body>
          <Card.Title>{freebie.title} 
            <br />
            <small>{freebie.author.username}</small>
          </Card.Title>
          <Card.Text>{freebie.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{freebie.datePosted}</small>
        </Card.Footer>
      </Card>
    )
  })

  return (
    <CardColumns>
      {freebies}
    </CardColumns>
  )
}

export default Freebie;