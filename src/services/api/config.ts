
import axios from 'axios';

const isLocalhost = window.location.origin.includes('localhost');
export const API_URL = isLocalhost
    ? 'http://localhost:8080/api/'
    : 'https://8000-idx-portfoliobackendgit-1744754619441.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://8000-idx-portfoliobackendgit-1744754619441.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev/api',
    },
    withCredentials: true,
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const publicEndpoints = [
            'auth/login/',
            'auth/refresh/',
            'home/data/', 
            'projects/project/', 
            'projects/projectCategories/', 
            'about/data/',
            'skills/data/',
            'blog/data/',
            'shop/data/',
            'contact/data/'
        ];

        const isPublic = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

        if (!isPublic) {
            // Get token from local storage
            const token = localStorage.getItem('adminToken');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 Unauthorized and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                
                if (refreshToken) {
                    // Try to refresh the token
                    const response = await axios.post(`${API_URL}auth/refresh/`, {
                        refresh_token: refreshToken
                    });
                    
                    const { access_token } = response.data;
                    
                    // Update token in local storage
                    localStorage.setItem('adminToken', access_token);
                    
                    // Update auth header and retry request
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                
                // Force logout if refresh token is invalid
                localStorage.removeItem('adminToken');
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
