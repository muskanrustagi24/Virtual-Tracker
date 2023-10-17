import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../context/authContext';

const CustomNav = () => {
  const history = useHistory();
  const context = useContext(AuthContext);

  const handleLogout = () => {
    context.logout();
    history.push("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">SprintOn</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {context.user &&
            <>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/projects">Projects</Nav.Link>
                {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link> */}
              </Nav>
              <Form className="d-flex">
                <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
              </Form>
            </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNav;