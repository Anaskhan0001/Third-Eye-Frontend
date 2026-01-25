import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';

const MyAppointments = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Failed to load appointments',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please <a href="/login">login</a> to view your appointments
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">Your Appointments</h1>
          <p className="lead mb-0">View and manage your service bookings</p>
        </Container>
      </div>

      {/* Appointments */}
      <Container className="py-5">
        {message && (
          <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
            {message.text}
          </Alert>
        )}

        {loading ? (
          <Alert variant="info">Loading appointments...</Alert>
        ) : bookings.length > 0 ? (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-light">
                <tr>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.service}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.time}</td>
                    <td>{booking.message || 'N/A'}</td>
                    <td>
                      <Badge
                        bg={
                          booking.status === 'approved'
                            ? 'success'
                            : booking.status === 'rejected'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Alert variant="info">
            No appointments yet.{' '}
            <a href="/booking">
              Book a service now
            </a>
          </Alert>
        )}

        <div className="mt-4">
          <Button variant="primary" onClick={() => navigate('/booking')}>
            Book Another Service
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MyAppointments;
