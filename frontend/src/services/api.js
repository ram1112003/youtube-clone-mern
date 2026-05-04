import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const UPLOADS_BASE_URL = process.env.REACT_APP_UPLOADS_BASE_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for video uploads
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData)
};

// Video API
export const videoAPI = {
  getAllVideos: (params = {}) => api.get('/videos', { params }),
  getVideoById: (id) => api.get(`/videos/${id}`),
  getUserVideos: (params = {}) => api.get('/videos/my-videos', { params }),
  uploadVideo: (formData, onUploadProgress) => 
    api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress
    }),
  updateVideo: (id, videoData) => api.put(`/videos/${id}`, videoData),
  deleteVideo: (id) => api.delete(`/videos/${id}`),
  getVideoStats: () => api.get('/videos/stats')
};

// Helper function to get full URL for uploaded files
export const getFileUrl = (relativePath) => {
  if (!relativePath) return '';
  return `${UPLOADS_BASE_URL}${relativePath}`;
};

export default api;
