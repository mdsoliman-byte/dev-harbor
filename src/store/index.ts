
import { configureStore } from '@reduxjs/toolkit';
// Import the reducer function directly from the slice file
import { reducer as authReducer } from './slices/authSlice';

// Create the store with the imported reducer
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
