import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const UserProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize form with user data only once on mount
  useEffect(() => {
    if (user && !isInitialized) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsInitialized(true);
    }
  }, [isInitialized, user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user || !localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, allow only numeric input
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate passwords if changing password
      if (formData.newPassword || formData.confirmPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({
            type: 'danger',
            text: 'New passwords do not match',
          });
          setLoading(false);
          return;
        }
        if (!formData.currentPassword) {
          setMessage({
            type: 'danger',
            text: 'Current password is required to change password',
          });
          setLoading(false);
          return;
        }
      }

      // Prepare data for API
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      // Call API to update profile
      const response = await authAPI.updateProfile(updateData);

      // Check response status and success flag
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Update failed');
      }

      if (response.data.success) {
        // Update localStorage immediately with new user data
        const updatedUser = {
          ...user,
          ...response.data.user,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Update form state with the response data (not old state)
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        setMessage({
          type: 'success',
          text: 'Profile updated successfully',
        });

        setEditMode(false);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to update profile. Please try again.';
      setMessage({
        type: 'danger',
        text: errorMsg,
      });
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="text-center py-5">
        <p>Redirecting to login...</p>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">My Profile</h1>
          <p className="lead mb-0">Manage your account details</p>
        </Container>
      </div>

      {/* Profile Content */}
      <Container className="py-5">
        <Row>
          {/* Profile Info Card */}
          <Col lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '80px', height: '80px', fontSize: '32px' }}
                >
                  👤
                </div>
                <h5>{user.name || 'User'}</h5>
                <p className="text-muted mb-3">{user.email}</p>
                <Badge bg="success" className="me-2">
                  {user.role === 'admin' ? 'Admin' : 'Regular User'}
                </Badge>
                <hr />
                <small className="text-muted">
                  User ID: {user.id}
                </small>
              </Card.Body>
            </Card>
          </Col>

          {/* Edit Form */}
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  {editMode ? 'Edit Profile' : 'Profile Information'}
                </h5>
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

                {!editMode ? (
                  <div>
                    <div className="mb-3">
                      <label className="fw-bold text-muted">Full Name</label>
                      <p className="text-dark">{formData.name}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold text-muted">Email</label>
                      <p className="text-dark">{formData.email}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold text-muted">Phone</label>
                      <p className="text-dark">{formData.phone || 'Not provided'}</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleUpdateProfile}>
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
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number (digits only)"
                        inputMode="numeric"
                      />
                      <small className="text-muted d-block mt-1">
                        Only numeric characters are allowed
                      </small>
                    </Form.Group>

                    <hr />

                    <h6 className="fw-bold mb-3">Change Password (Optional)</h6>

                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          // Reset to current user data
                          if (user) {
                            setFormData({
                              name: user.name || '',
                              email: user.email || '',
                              phone: user.phone || '',
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                          }
                          setEditMode(false);
                          setMessage(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mt-5">
          <Col md={6}>
            <Card className="bg-light border-0">
              <Card.Body>
                <h6 className="fw-bold mb-3">📅 Your Bookings</h6>
                <p className="text-muted mb-3">
                  View and manage your service bookings
                </p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate('/my-appointments')}
                >
                  View Appointments
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="bg-light border-0">
              <Card.Body>
                <h6 className="fw-bold mb-3">🔒 Security</h6>
                <p className="text-muted mb-3">
                  Change your password to keep your account secure
                </p>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => {
                    setEditMode(true);
                    window.scrollTo(0, 300);
                  }}
                >
                  Change Password
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Badge component for role display
function Badge({ bg, className, children }) {
  return (
    <span className={`badge bg-${bg} ${className || ''}`}>
      {children}
    </span>
  );
}

export default UserProfile;
