import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setExpanded(false); // close menu
    navigate('/');
  };

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      bg="dark"
      expand="lg"
      sticky="top"
      className="navbar-dark"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center"
          onClick={closeMenu}
        >
          <img
            src="/logo.jpg"
            alt="Third Eye Infotech Logo"
            height="40"
            className="me-2"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          Third Eye Infotech
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={closeMenu}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={closeMenu}>
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={closeMenu}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/booking" onClick={closeMenu}>
              Book Service
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={closeMenu}>
              Contact
            </Nav.Link>

            {token && (
              <>
                <Nav.Link as={Link} to="/my-appointments" onClick={closeMenu}>
                  Your Appointments
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" onClick={closeMenu}>
                  My Profile
                </Nav.Link>
              </>
            )}

            {user?.role === 'admin' && (
              <Nav.Link
                as={Link}
                to="/admin"
                className="fw-bold text-warning"
                onClick={closeMenu}
              >
                Admin
              </Nav.Link>
            )}

            {!token ? (
              <Nav.Link as={Link} to="/login" onClick={closeMenu}>
                Login
              </Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout} className="text-danger">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
