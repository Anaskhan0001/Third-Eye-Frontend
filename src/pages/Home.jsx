import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="hero-section text-white py-5"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative'
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <Row className="align-items-center position-relative">
            <Col md={6} className="mb-4 mb-md-0">
              <h1 className="display-4 fw-bold">Professional CCTV & IT Solutions</h1>
              <p className="lead">
                Expert installation, networking, and 24/7 support for all your security
                and IT infrastructure needs. Trusted by 800+ clients with 4+ years of experience.
              </p>
              <Button
                size="lg"
                variant="light"
                onClick={() => navigate('/booking')}
                className="me-2"
              >
                Book Service
              </Button>
              <Button
                size="lg"
                variant="outline-light"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </Col>
            <Col md={6} className="d-none d-md-block">
              <div style={{ fontSize: '5rem', textAlign: 'center' }}>🔒</div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Key Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose Third Eye Infotech?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📹</div>
                <Card.Title>Professional Installation</Card.Title>
                <Card.Text>
                  Expert CCTV camera installation with latest technology and best practices.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
                <Card.Title>Networking & IT Solutions</Card.Title>
                <Card.Text>
                  Robust networking infrastructure and IT systems for seamless operations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <Card.Title>24/7 Support</Card.Title>
                <Card.Text>
                  Round-the-clock customer support and maintenance services available anytime.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Services Preview */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Our Services</h2>
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📹</div>
                  <Card.Title>CCTV Systems</Card.Title>
                  <Card.Text className="text-muted">
                    Professional camera installation and setup
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
                  <Card.Title>Networking</Card.Title>
                  <Card.Text className="text-muted">
                    LAN, WAN, and enterprise networking solutions
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📡</div>
                  <Card.Title>Wi-Fi Solutions</Card.Title>
                  <Card.Text className="text-muted">
                    High-speed wireless connectivity setup
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🖥️</div>
                  <Card.Title>IT Systems</Card.Title>
                  <Card.Text className="text-muted">
                    Servers and infrastructure management
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/services')}
              >
                View All Services
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Secure Your Business?</h2>
          <p className="lead mb-4">
            Contact us today for professional consultation and installation services.
          </p>
          <Button
            size="lg"
            variant="light"
            onClick={() => navigate('/booking')}
            className="me-2"
          >
            Book Service Now
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            onClick={() => navigate('/contact')}
          >
            Get in Touch
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
