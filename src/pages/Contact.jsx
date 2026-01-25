import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.sendMessage(formData);
      setMessage({
        type: 'success',
        text: 'Thank you for your message! We will get back to you shortly.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Failed to send message',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">Contact Us</h1>
          <p className="lead mb-0">Get in touch with our team - Available 24/7</p>
        </Container>
      </div>

      {/* Contact Info Cards */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <a
              href="tel:+918485862886"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card className="h-100 text-center" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
                  <Card.Title>Phone</Card.Title>
                  <Card.Text>
                    <strong>+91 8485862886</strong><br />
                    Available 24/7 for urgent support
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>

          <Col md={4} className="mb-4">
            <a
              href="https://wa.me/919921486611"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card className="h-100 text-center" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#25D366' }}>
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <Card.Title>WhatsApp</Card.Title>
                  <Card.Text>
                    <strong>+91 9921486611</strong><br />
                    Quick messaging support
                  </Card.Text>
                </Card.Body>
              </Card>

            </a>
          </Col>

          <Col md={4} className="mb-4">
            <a
              href="mailto:thirdeyeinfotech11@gmail.com"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card className="h-100 text-center" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
                  <Card.Title>Email</Card.Title>
                  <Card.Text>
                    <strong>thirdeyeinfotech11@gmail.com</strong><br />
                    We respond within 24 hours
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>

        </Row>

        {/* Contact Form */}
        <Row>
          <Col md={8} className="offset-md-2">
            <Card>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Send us a Message</h5>
              </Card.Header>
              <Card.Body>
                {message && (
                  <Alert
                    variant={message.type}
                    onClose={() => setMessage(null)}
                    dismissible
                  >
                    {message.text}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your inquiry or works(minimum 10 characters)"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Address Info */}
        <Row className="mt-5">
          <Col md={8} className="offset-md-2">
            <Card className="bg-light">
              <Card.Body>
                <h5>📍 Address</h5>
                <p className="mb-0">
                  <strong>Third Eye Infotech</strong><br />
                  Lasalgaon<br />
                  Nashik, 422306<br />
                  Maharashtra, India<br />
                  <br />
                  <strong>Business Hours:</strong><br />
                  Monday - Saturday: 9:00 AM - 4:00 PM<br />
                  Emergency Support: 24/7 Available
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
