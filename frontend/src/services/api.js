import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
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

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login page
    }
    return Promise.reject(error);
  }
);

const bookAPI = {
  // Get all books
  getBooks: (params = {}) => api.get('/books', { params }),
  
  // Get a single book
  getBook: (id) => api.get(`/books/${id}`),
  
  // Create a new book
  createBook: (bookData) => api.post('/books', bookData),
  
  // Update a book
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  
  // Update reading progress
  updateProgress: (id, currentPage) => 
    api.patch(`/books/${id}/progress`, { currentPage }),
  
  // Add a note to a book
  addNote: (id, content) => 
    api.post(`/books/${id}/notes`, { content }),
  
  // Delete a book
  deleteBook: (id) => api.delete(`/books/${id}`),
  
  // Get reading statistics
  getStats: () => api.get('/books/stats/summary'),
};

export default bookAPI;