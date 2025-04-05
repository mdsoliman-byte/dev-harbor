import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const fetchHeroData = async () => {
    try {
        const response = await api.get('home/data/');
        console.log('Hero data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return {
            id: 0,
            title: "Default Title",
            heading: "Default Heading",
            shortbio: "Default short bio.",
            skills: ["Default Skill 1", "Default Skill 2"],
            available_for_freelance: false,
            profile_image: "/default-profile.png",
        };
    }
};

export const fetchProjectData = async () => {
    try {
        const response = await api.get('projects/project/');
        console.log('Project data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching project data:', error);
        return [
            {
            id: 0,
            title: "Default Project",
            description: "This is a default project description.",
            technologies: ["Default Tech 1", "Default Tech 2"],
            github_url: null,
            live_demo_url: null,
            key_features: "Default key features.",
            image: "/default-project-image.png",
            created_at: new Date().toISOString(),
            },
        ];
    }
};

export const fetchProjectCategories = async () => {
    try {
        const response = await api.get('projects/projectCategories/');
        console.log('Project categories:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching project categories:', error);
        return [];
    }
};

export const fetchLoginStatus = async () => {
    try {
        const response = await api.get("auth/login/");
        return response.data;
    } catch (error) {
        console.error("Error checking login status:", error);
        throw error;
    }
};

// Admin authentication functions
export const adminLogin = async (credentials) => {
    try {
        const response = await api.post('auth/login/', credentials);
        console.log('Login response:', response.data);
        if (response.data.token) {
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminUser', JSON.stringify(response.data.user || { email: credentials.email }));
            return response.data;
        }
        throw new Error('Authentication failed');
    } catch (error) {
        console.error('Admin login failed:', error);
        throw error;
    }
};

export const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    // Force redirect to login page
    window.location.href = '/admin/login';
};

export const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    console.log('Admin token found:', !!token);
    return !!token;
};

export const getAdminToken = () => {
    return localStorage.getItem('adminToken');
};

export const getAdminUser = () => {
    const userJson = localStorage.getItem('adminUser');
    if (!userJson) return null;
    try {
        return JSON.parse(userJson);
    } catch (e) {
        console.error('Error parsing admin user:', e);
        return null;
    }
};

export default api;
