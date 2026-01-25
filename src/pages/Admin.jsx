import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Alert,
  Tabs,
  Tab,
  Badge,
  Modal,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminAPI, bookingAPI, contactAPI } from '../services/api';

const Admin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alert, setAlert] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('pending');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, messagesRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        bookingAPI.getAllBookings(),
        contactAPI.getAllMessages(),
      ]);
      setStats(statsRes.data.stats);
      setBookings(bookingsRes.data.bookings);
      setMessages(messagesRes.data.messages);
    } catch (error) {
      setAlert({ type: 'danger', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      await bookingAPI.updateBookingStatus(selectedBooking._id, newStatus);
      setAlert({ type: 'success', text: 'Booking status updated' });
      setShowStatusModal(false);
      loadData();
    } catch (error) {
      setAlert({ type: 'danger', text: 'Failed to update status' });
    }
  };

  const handleMessageStatusChange = async (messageId, status) => {
    try {
      await contactAPI.updateMessageStatus(
        messageId,
        status === 'unread' ? 'read' : 'unread'
      );
      loadData();
    } catch (error) {
      setAlert({ type: 'danger', text: 'Failed to update message status' });
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <Container className="py-5">
        <Alert variant="danger">Admin access required</Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">Admin Dashboard</h1>
          <p className="lead mb-0">Manage bookings and messages</p>
        </Container>
      </div>

      {/* Dashboard */}
      <Container className="py-4">
        {alert && (
          <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
            {alert.text}
          </Alert>
        )}

        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
          {/* Dashboard Tab */}
          <Tab eventKey="dashboard" title="Dashboard">
            {stats && (
              <Row className="mb-4">
                <Col md={3} className="mb-3">
                  <Card className="bg-primary text-white">
                    <Card.Body>
                      <Card.Title>Total Users</Card.Title>
                      <h2>{stats.totalUsers}</h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-3">
                  <Card className="bg-success text-white">
                    <Card.Body>
                      <Card.Title>Total Bookings</Card.Title>
                      <h2>{stats.totalBookings}</h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-3">
                  <Card className="bg-warning text-white">
                    <Card.Body>
                      <Card.Title>Pending Bookings</Card.Title>
                      <h2>{stats.pendingBookings}</h2>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-3">
                  <Card className="bg-info text-white">
                    <Card.Body>
                      <Card.Title>Total Messages</Card.Title>
                      <h2>{stats.totalMessages}</h2>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            <Row>
              <Col md={6}>
                <Card>
                  <Card.Header className="bg-primary text-white">
                    Recent Activity
                  </Card.Header>
                  <Card.Body>
                    <p>Unread Messages: {stats?.unreadMessages}</p>
                    <p>Pending Approvals: {stats?.pendingBookings}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Header className="bg-primary text-white">
                    Quick Actions
                  </Card.Header>
                  <Card.Body>
                    <Button
                      variant="primary"
                      className="me-2 mb-2"
                      onClick={() => setActiveTab('bookings')}
                    >
                      View Bookings
                    </Button>
                    <Button
                      variant="info"
                      className="mb-2"
                      onClick={() => setActiveTab('messages')}
                    >
                      View Messages
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Bookings Tab */}
          <Tab eventKey="bookings" title={`Bookings (${bookings.length})`}>
            {bookings.length > 0 ? (
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.name}</td>
                        <td>{booking.service}</td>
                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                        <td>{booking.time}</td>
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
                        <td>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setNewStatus(booking.status);
                              setShowStatusModal(true);
                            }}
                          >
                            Update Status
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Alert variant="info">No bookings yet</Alert>
            )}
          </Tab>

          {/* Messages Tab */}
          <Tab eventKey="messages" title={`Messages (${messages.length})`}>
            {messages.length > 0 ? (
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>{msg.message.substring(0, 50)}...</td>
                        <td>
                          <Badge bg={msg.status === 'unread' ? 'danger' : 'success'}>
                            {msg.status}
                          </Badge>
                        </td>
                        <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Button
                            size="sm"
                            variant={msg.status === 'unread' ? 'success' : 'secondary'}
                            onClick={() =>
                              handleMessageStatusChange(msg._id, msg.status)
                            }
                          >
                            Mark as {msg.status === 'unread' ? 'Read' : 'Unread'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Alert variant="info">No messages yet</Alert>
            )}
          </Tab>
        </Tabs>
      </Container>

      {/* Status Change Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <>
              <p>
                <strong>Booking:</strong> {selectedBooking.name} -{' '}
                {selectedBooking.service}
              </p>
              <Form.Group>
                <Form.Label>New Status</Form.Label>
                <Form.Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
