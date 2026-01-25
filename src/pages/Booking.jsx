import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookingAPI } from '../services/api';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const serviceFromState = location.state?.service;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    service: serviceFromState || 'CCTV Camera Systems',
    date: '',
    time: '',
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
      await bookingAPI.createBooking(formData);
      setMessage({
        type: 'success',
        text: 'Booking created successfully! We will contact you soon.',
      });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Failed to create booking',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please <a href="/login">login</a> to book a service
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">Book a Service</h1>
          <p className="lead mb-0">Schedule your CCTV, networking, or IT service appointment</p>
        </Container>
      </div>

      {/* Form */}
      <Container className="py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your phone number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Service Type</Form.Label>
                <Form.Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="CCTV Camera Systems">CCTV Camera Systems</option>
                  <option value="Networking Solutions">Networking Solutions</option>
                  <option value="Wi-Fi Solutions">Wi-Fi Solutions</option>
                  <option value="IT Systems & Servers">IT Systems & Servers</option>
                  <option value="Biometric Systems">Biometric Systems</option>
                  <option value="Security Systems">Security Systems</option>
                  <option value="Installation Services">Installation Services</option>
                  <option value="Support & Maintenance">Support & Maintenance</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preferred Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preferred Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location / Address</Form.Label>
                <Form.Control
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your location and any special requirements"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Booking;
