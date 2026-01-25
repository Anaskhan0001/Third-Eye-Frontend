import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">About Third Eye Infotech</h1>
          <p className="lead mb-0">Your trusted partner in security and IT solutions</p>
        </Container>
      </div>

      {/* Company Overview */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <h2>Who We Are</h2>
            <p>
              Third Eye Infotech is a leading provider of comprehensive security and IT solutions.
              With over 4 years of industry experience, we've established ourselves as a trusted
              partner for businesses seeking professional CCTV installation, networking, and
              IT infrastructure services.
            </p>
            <p>
              Our mission is to provide world-class security and IT solutions that empower
              businesses to operate safely and efficiently. We believe in leveraging technology
              to create secure, connected environments.
            </p>
            <p>
              Our team comprises 50+ certified technicians and specialists dedicated to delivering
              excellence in every project. We pride ourselves on our attention to detail, technical
              expertise, and commitment to customer satisfaction.
            </p>
          </Col>
          <Col md={6}>
            <div style={{ fontSize: '5rem', textAlign: 'center', color: '#0d6efd' }}>
              🔒
            </div>
          </Col>
        </Row>
      </Container>

      {/* Statistics */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Our Track Record</h2>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center border-0 bg-white">
                <Card.Body>
                  <h3 className="text-primary" style={{ fontSize: '2.5rem' }}>4+</h3>
                  <Card.Title>Years Industry Experience</Card.Title>
                  <Card.Text className="text-muted">
                    Established expertise and proven track record
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center border-0 bg-white">
                <Card.Body>
                  <h3 className="text-success" style={{ fontSize: '2.5rem' }}>800+</h3>
                  <Card.Title>Happy Clients</Card.Title>
                  <Card.Text className="text-muted">
                    Satisfied customers across various industries
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center border-0 bg-white">
                <Card.Body>
                  <h3 className="text-warning" style={{ fontSize: '2.5rem' }}>50+</h3>
                  <Card.Title>Certified Experts</Card.Title>
                  <Card.Text className="text-muted">
                    Professional technicians with industry certifications
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center border-0 bg-white">
                <Card.Body>
                  <h3 className="text-info" style={{ fontSize: '2.5rem' }}>24/7</h3>
                  <Card.Title>Customer Support</Card.Title>
                  <Card.Text className="text-muted">
                    Always available for your needs and emergencies
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Why Choose Us */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose Third Eye Infotech?</h2>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <Card.Title>Expert Team</Card.Title>
                <Card.Text>
                  Our team consists of certified professionals with extensive experience
                  in CCTV, networking, and IT solutions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <Card.Title>Latest Technology</Card.Title>
                <Card.Text>
                  We use the latest and most reliable equipment from leading brands
                  to ensure optimal performance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <Card.Title>24/7 Support</Card.Title>
                <Card.Text>
                  Round-the-clock customer support ensures your systems are always running
                  smoothly with quick response times.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <Card.Title>Customized Solutions</Card.Title>
                <Card.Text>
                  We tailor our services to meet your specific needs and budget requirements
                  for maximum value.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Values Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Our Core Values</h2>
          <Row>
            <Col md={4} className="mb-4">
              <h5>🎯 Quality</h5>
              <p>
                We are committed to delivering the highest quality services with attention
                to detail in every project.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <h5>🤝 Integrity</h5>
              <p>
                We build lasting relationships with our clients through transparency,
                honesty, and professional conduct.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <h5>⚡ Excellence</h5>
              <p>
                We strive for excellence in every aspect of our work, continuously improving
                our services and processes.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact CTA */}
      <Container className="py-5 text-center">
        <h2 className="mb-4">Ready to Partner with Us?</h2>
        <p className="lead mb-4">
          Let's discuss how Third Eye Infotech can help secure and optimize your business.
        </p>
        <a href="/contact" className="btn btn-primary btn-lg me-2">
          Get in Touch
        </a>
        <a href="/booking" className="btn btn-outline-primary btn-lg">
          Book a Service
        </a>
      </Container>
    </div>
  );
};

export default About;
