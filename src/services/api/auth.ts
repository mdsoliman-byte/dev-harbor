import api from './config';

export const login = async (email: string, password: string) => {
  console.log("Login function called");
  try {
    console.log("Sending login request with:", { email, password });
    const response = await api.post('authentication/login/', { email, password });

    console.log("Login payload:", { email, password });

    // Log the full response for debugging
    console.log("Backend response:", response);
    console.log("Backend response data:", response.data);

    if (response.status !== 200) {
      throw new Error('Invalid credentials');
    }

    const { access_token, refresh_token, user } = response.data;
    const userType = user?.user_type;

    // Validate the response structure
    if (!access_token || !refresh_token || !user || !userType) {
      console.error("Invalid response format:", response.data);
      throw new Error('Invalid response format');
    }

    // Store tokens and user info in local storage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user_type', userType);

    return {
      token: access_token,
      refreshToken: refresh_token,
      userType: userType,
    };
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_type');
  console.log('Logout called from API service');
};

export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const getUserType = () => {
  return localStorage.getItem('user_type');
};

export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await api.post('authentication/refresh/', { refresh: refreshToken });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        return access;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};
