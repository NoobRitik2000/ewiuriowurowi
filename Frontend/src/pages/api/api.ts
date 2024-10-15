// frontend/utils/api.ts
import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register API call
export const register = async (data: { name: string; email: string; password: string; role: string }) => {
  return api.post('/signup', data); // Corrected endpoint
};

// Login API call
export const login = async (data: { email: string; password: string }) => {
  return api.post('/login', data); // Corrected endpoint
};

// Admin Login API call
export const adminLogin = async (data: { email: string; password: string }) => {
  return api.post('/admin/login', data); // Ensure this matches your backend
};

// Fetch Books API call (Assuming GET request to fetch books)
// Fetch Books with search query API call
export const fetchBooks = async (query: string) => {
  return api.get(`/books?query=${encodeURIComponent(query)}`);
};

// Borrow Book API call
export const borrowBook = async (bookId: number) => {
  return api.post('/loans/borrow', { bookId}); // Corrected endpoint
};
// Return Book API call
export const returnBook = async (loan_id: number,book_id:number) => {
  return api.post('/loans/return', {
    loan_id,    
    book_id,  
  });
};

// Example of a protected API call (e.g., fetching user data)
export const getUserData = async () => {
  const token = localStorage.getItem('token');
  return api.get('/user', { // Removed redundant '/api'
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addLibrarian = async (data: { name: string; email: string; password: string; role?: string }) => {
  return api.post('/librarians', data); // API call to add a librarian
};