import axios from 'axios';

// Use environment variable for API base URL, fall back to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Booking APIs
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings/create', data),
  getUserBookings: () => api.get('/bookings/my-bookings'),
  getAllBookings: () => api.get('/bookings/all-bookings'),
  updateBookingStatus: (bookingId, status) =>
    api.put(`/bookings/${bookingId}/status`, { status }),
};

// Contact APIs
export const contactAPI = {
  sendMessage: (data) => api.post('/contact/send', data),
  getAllMessages: () => api.get('/contact/all-messages'),
  updateMessageStatus: (messageId, status) =>
    api.put(`/contact/${messageId}/status`, { status }),
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
};

export default api;
