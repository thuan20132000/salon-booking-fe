import axios from 'axios';


const LOCAL_API_URL = "http://192.168.2.241:8000/api";
const PROD_API_URL = "https://api.salon.com/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: LOCAL_API_URL, // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const token = localStorage.getItem('token');
    // let token = "";
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjM5NzEzLCJpYXQiOjE3MzE2Mzk0MTMsImp0aSI6IjRhNmJhOGQzNGZmMjRmMDlhYzA5NzMzOWQ0YjZmNTY1IiwidXNlcl9pZCI6M30.FzmxeXzRMSKV1PT5DPdWVNsKXPggnZC_1GyKccDhTyE"
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error.response.data);
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
      // window.location.href = '/auth/signin';
    }

    console.error('Response error:', error.response.data);
    
    return Promise.reject(error);
  }
);

export default axiosInstance;