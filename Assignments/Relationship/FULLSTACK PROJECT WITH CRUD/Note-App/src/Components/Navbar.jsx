import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContextProvider';
import { Button } from 'react-bootstrap';

function Header() {
  const { isAuth,setIsAuth } = useContext(AuthContext);
  function handleLogout(){
    localStorage.removeItem("token");
    setIsAuth(false);
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Multuser Note App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to='/'>Notes</Link>
            <Link to="/create">Create</Link>
            {isAuth ? <Button onClick={handleLogout}>Logout</Button> : <Link to="/login">Login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;