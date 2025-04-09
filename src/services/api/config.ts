
import axios from 'axios';

export const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const publicEndpoints = ['home/data/', 'projects/project/', 'projects/projectCategories/'];

        const isPublic = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

        if (!isPublic) {
            const adminToken = localStorage.getItem('adminToken');
            const userToken = localStorage.getItem('userToken');
            const token = adminToken || userToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
