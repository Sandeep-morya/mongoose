import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { AuthContext } from '../Components/AuthContextProvider';

function Login() {
    const {setIsAuth} = useContext(AuthContext)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [show, setShow] = useState(false);

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://wild-red-spider-shoe.cyclic.app/api/user/login", formData);
            setMessage(data.message + " redirecting to notes in 3s")
            localStorage.setItem("token", data.token)
            setShow(true)
            setFormData({ email: '', password: '' })
            setTimeout(() => {
                setIsAuth(true)
                navigate("/")
            }, 1000)

        } catch (error) {
            setMessage("username or Password is Invalid")
            setShow(true)
        }
    }
    return (
        <div>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide >
                <Toast.Body>{message}</Toast.Body>
            </Toast>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
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
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Link to='/register'><Button variant="primary">
                    Create a new Account
                </Button></Link>
            </Form>
        </div>
    );
}

export default Login;