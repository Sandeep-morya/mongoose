import axios from 'axios';
import React, { useState } from 'react'
import { Card, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Note = ({ id, index, title, body, handleUpdate ,handleDelete}) => {
  const [show, setShow] = useState(false);
  const [noteData, setNoteData] = useState({ title, body })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function toggleUpdate() {
    handleClose();
    handleUpdate(id,noteData)
  }

  return (
    <Card border="primary" style={{ width: '18rem' }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                autoFocus
                value={noteData.title}
                onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Note body</Form.Label>
              <Form.Control as="textarea" rows={3} value={noteData.body}
                onChange={(e) => setNoteData({ ...noteData, body: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card.Header style={{ display: "flex", "justifyContent": "space-between", "alignItems": "center" }}>
        <h4># {index + 1}</h4>
        <Badge bg="warning" text="dark" onClick={handleShow}>Update</Badge>
        <Badge bg="danger" onClick={() => handleDelete(id)}>Delete</Badge>
      </Card.Header>
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