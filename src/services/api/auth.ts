
import api from './config';

export const fetchLoginStatus = async () => {
    try {
        const response = await api.get("auth/login/");
        return response.data;
    } catch (error) {
        console.error("Error checking login status:", error);
        throw error;
    }
};

export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await api.post('auth/login/', credentials);
        console.log('Login response:', response.data);

        const { access_token, refresh_token, user } = response.data;

        if (access_token) {
            localStorage.setItem('refreshToken', refresh_token);

            if (user && user.user_type === 'admin') {
                localStorage.setItem('adminToken', access_token);
                localStorage.setItem('adminUser', JSON.stringify(user || { email: credentials.email }));
            } else {
                localStorage.setItem('userToken', access_token);
                localStorage.setItem('userInfo', JSON.stringify(user || { email: credentials.email }));
            }
            return response.data;
        } else {
            console.error('Access token missing in login response:', response.data);
            throw new Error('Authentication failed: Access token missing');
        }
    } catch (error: any) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};

export const logout = () => {
    const isAdmin = !!localStorage.getItem('adminToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userInfo');
    window.location.href = isAdmin ? '/auth/login' : '/login';
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
