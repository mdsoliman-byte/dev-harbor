
import { configureStore } from '@reduxjs/toolkit';
// Import the reducer function using a named import
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid serialization errors with error objects
        ignoredActions: ['auth/loginFailure', 'auth/registerFailure'],
      },
    }),
});

// Export types after store configuration
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
