import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/salon/api', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    // const token = localStorage.getItem('token');
    const token = true;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.error('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;