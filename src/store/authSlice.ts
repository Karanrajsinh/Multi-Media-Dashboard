import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      
      // Demo credentials check
      if (email === 'demo@example.com' && password === 'demo123') {
        state.isAuthenticated = true;
        state.user = {
          email,
          name: 'David', // Using the name from the example
        };
        state.error = null;
        
        // Save auth state to localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        state.error = 'Invalid email or password';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      
      // Clear auth state from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    },
    checkAuth: (state) => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const user = localStorage.getItem('user');
      
      if (isAuthenticated && user) {
        state.isAuthenticated = true;
        state.user = JSON.parse(user);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, checkAuth, clearError } = authSlice.actions;
export default authSlice.reducer;