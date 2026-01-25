import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('email');
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormData({ identifier: '', password: '' });
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = isAdmin
        ? { email: formData.identifier, password: formData.password }
        : { identifier: formData.identifier, password: formData.password, loginType: loginType };
      const response = isAdmin
        ? await authAPI.adminLogin(payload)
        : await authAPI.login(payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Login failed',
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
          <h1 className="mb-0">{isAdmin ? 'Admin Login' : 'User Login'}</h1>
          <p className="lead mb-0">Access your account</p>
        </Container>
      </div>

      {/* Form */}
      <Container className="py-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
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
              {!isAdmin && (
                <div className="mb-3 d-flex gap-2">
                  <Button
                    variant={loginType === 'email' ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => handleLoginTypeChange('email')}
                    className="flex-grow-1"
                  >
                    📧 Email
                  </Button>
                  <Button
                    variant={loginType === 'phone' ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => handleLoginTypeChange('phone')}
                    className="flex-grow-1"
                  >
                    📱 Phone
                  </Button>
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label>
                  {isAdmin ? 'Email' : loginType === 'email' ? 'Email Address' : 'Phone Number'}
                </Form.Label>
                <Form.Control
                  type={loginType === 'email' ? 'email' : 'tel'}
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  placeholder={
                    loginType === 'email'
                      ? 'Enter your email address'
                      : 'Enter your phone number'
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="border"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Button>
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            {!isAdmin && (
              <p className="mt-3 text-center">
                Don't have an account?{' '}
                <a href="/register" className="text-primary">
                  Register here
                </a>
              </p>
            )}

            <div className="text-center mt-3">
              <Button
                variant="link"
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  setFormData({ identifier: '', password: '' });
                  setMessage(null);
                }}
              >
                {isAdmin ? 'User Login' : 'Admin Login'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
