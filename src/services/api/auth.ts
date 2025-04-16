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

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('auth/login/', { email, password });

    // Log the full response for debugging
    console.log("Backend response:", response);

    if (response.status !== 200) {
      throw new Error('Invalid credentials');
    }

    const { access_token, refresh_token, user } = response.data;

    // Validate the response structure
    if (!access_token || !refresh_token || !user || !user.user_type) {
      console.error("Invalid response format:", response.data);
      throw new Error('Invalid response format');
    }

    return {
      token: access_token,
      refreshToken: refresh_token,
      userType: user.user_type,
    };
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  // This is now handled by Redux
  console.log('Logout called from API service');
};

// These functions are now handled by Redux and useAuth hook
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

// New function to attempt token refresh
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await api.post('auth/refresh/', { refresh_token: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};
