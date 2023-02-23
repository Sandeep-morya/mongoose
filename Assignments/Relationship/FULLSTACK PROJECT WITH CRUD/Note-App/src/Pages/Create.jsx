import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { AuthContext } from '../Components/AuthContextProvider';

function Create() {
  const { setIsAuth } = useContext(AuthContext)
  const [noteData, setNoteData] = useState({ title: '', body: '' })
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/notes", noteData, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setMessage(data.message + " redirecting to notes in 3s")
      setShow(true)
      setNoteData({ title: '', body: '' })
      console.log(data);
    } catch (error) {
      setMessage("username or Body is Invalid")
      setShow(true)
    }
  }
  return (
    <div>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title address</Form.Label>
          <Form.Control
            type="title"
            placeholder="Enter title"
            value={noteData.title}
            onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />
          <Form.Text className="text-muted">
            We'll never share your title with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="body"
            placeholder="Body"
            value={noteData.body}
            onChange={(e) => setNoteData({ ...noteData, body: e.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
        <Link to='/'><Button variant="primary">
          Show All Notes
        </Button></Link>
      </Form>
    </div>
  );
}

export default Create;