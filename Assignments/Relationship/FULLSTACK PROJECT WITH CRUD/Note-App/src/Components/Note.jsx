import React from 'react'
import Card from 'react-bootstrap/Card';

const Note = ({index,title,body}) => {
  return (
    <Card border="primary" style={{ width: '18rem' }}>
      <Card.Header>{index+1}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {body}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Note