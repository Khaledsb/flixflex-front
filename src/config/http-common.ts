import axios from 'axios';
import GeneralSettings from '@/config/general';

// Create the Axios instance
const apiClient = axios.create({
  baseURL: GeneralSettings.baseURL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 60000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // If the token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;