
import axios from 'axios';
import { store } from '@/store';

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
            // Get token from Redux store
            const state = store.getState();
            const token = state.auth.token;

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
                const state = store.getState();
                const refreshToken = state.auth.refreshToken;
                
                if (refreshToken) {
                    // Try to refresh the token
                    const response = await axios.post(`${API_URL}auth/refresh/`, {
                        refresh_token: refreshToken
                    });
                    
                    const { access_token } = response.data;
                    
                    // Update token in local storage
                    if (state.auth.isAdmin) {
                        localStorage.setItem('adminToken', access_token);
                    } else {
                        localStorage.setItem('userToken', access_token);
                    }
                    
                    // Update auth header and retry request
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                
                // Force logout if refresh token is invalid
                store.dispatch({ type: 'auth/logout' });
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
