
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login as loginAPI } from '@/services/api';
import { decodeJWT } from '@/utils/authUtils';

// Types
export interface User {
  id?: string;
  email: string;
  user_type?: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('userToken') || localStorage.getItem('adminToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAdmin: !!localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('userToken') || !!localStorage.getItem('adminToken'),
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear all auth data
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('userToken');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('adminUser');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateAuthState: (state) => {
      const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      state.token = token;
      state.isAuthenticated = !!token;
      state.isAdmin = !!localStorage.getItem('adminToken');
      
      // Try to extract user info from token
      if (token) {
        const userInfo = localStorage.getItem('userInfo') || localStorage.getItem('adminUser');
        if (userInfo) {
          try {
            state.user = JSON.parse(userInfo);
          } catch (e) {
            console.error('Error parsing user info:', e);
          }
        } else {
          // If no user info in localStorage, try to extract from token
          const decodedToken = decodeJWT(token);
          if (decodedToken && decodedToken.email) {
            state.user = { email: decodedToken.email };
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        
        const { access_token, refresh_token, user } = action.payload;
        
        if (user && user.user_type === 'admin') {
          state.isAdmin = true;
          localStorage.setItem('adminToken', access_token);
          localStorage.setItem('adminUser', JSON.stringify(user));
        } else {
          state.isAdmin = false;
          localStorage.setItem('userToken', access_token);
          localStorage.setItem('userInfo', JSON.stringify(user));
        }
        
        localStorage.setItem('refreshToken', refresh_token);
        
        state.user = user;
        state.token = access_token;
        state.refreshToken = refresh_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Login failed';
      });
  },
});

// Export actions
export const { logout, clearError, updateAuthState } = authSlice.actions;

// Export the reducer
const authReducer = authSlice.reducer;
export default authReducer;
