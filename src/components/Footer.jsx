import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-3 text-center text-md-start">
            <h5>Third Eye Infotech</h5>
            <p className="text-justify">
              Providing professional CCTV installation, networking solutions,
              and IT support with 24/7 customer service. Your trusted partner
              for security and technology.
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-3">
           <h5 className="text-center">Quick Links</h5>

            <ul className="list-unstyled text-center">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/services" className="text-light text-decoration-none">Services</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col xs={12} md={4} className="mb-3 text-center text-md-start">
            <h5>Contact Info</h5>
            <p>
              📞 +91 9921486611<br />
              📞 +91 8485862886<br />
              💬 WhatsApp: +91 9921486611<br />
              📧 thirdeyeinfotech11@gmail.com<br />
              📍 Available 24/7
            </p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p>&copy; 2026 Third Eye Infotech. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
