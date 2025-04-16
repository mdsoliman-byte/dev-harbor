import axios from 'axios';

const isLocalhost = window.location.origin.includes('localhost');
export const API_URL = isLocalhost
    ? 'http://localhost:8000/api/'
    : 'https://8000-idx-portfoliobackendgit-1744754619441.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        console.log("Outgoing request:", config);
        console.log("Outgoing request config:", config);
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
            const token = localStorage.getItem('access_token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
      console.log("Incoming response:", response);
      console.log("Incoming response data:", response.data);
      return response;
    },
    async (error) => {
        console.error("Response error:", error);
        console.error("Response error object:", error);
        const originalRequest = error.config;
        
        // If error is 401 Unauthorized and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                
                if (refreshToken) {
                    // Try to refresh the token
                    const response = await axios.post(`${API_URL}authentication/refresh/`, {
                        refresh: refreshToken
                    });
                    
                    const { access } = response.data;
                    
                    // Update token in local storage
                    localStorage.setItem('access_token', access);
                    
                    // Update auth header and retry request
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                
                // Force logout if refresh token is invalid
                localStorage.removeItem('access_token');
                return Promise.reject(error);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
