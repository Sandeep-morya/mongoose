import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';


const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [show, setShow] = useState(false);

    const [message, setMessage] = useState('');

const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8080/api/user/register", formData);
            setMessage(data.message+" redirecting to Login page")
            setShow(true)
            setTimeout(()=>{
                navigate("/login")
            },3000)
        } catch (error) {
            setMessage(error.response.data)
            setShow(true)
        }
    }
    return (
        <div>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your Good Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Form.Text className="text-muted">
                        Your Password is also , hidden and encrypted so dont worry
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Link to={'/login'}>
                    <Button variant="primary" type="submit">
                        Already have a Acount ? Login
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Register