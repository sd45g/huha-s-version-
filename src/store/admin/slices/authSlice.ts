// src/store/admin/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// واجهة المستخدم
interface User {
  id: number | string;
  name?: string; // الحقل اختياري
  email: string;
  password?: string; // الحقل اختياري
}

// واجهة حالة المصادقة
interface AuthState {
  user: User | null;
  showPassword: boolean;
  role: 'admin' | 'customer' | null;
}

const initialState: AuthState = {
  user: null,
  showPassword: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setRole: (state, action: PayloadAction<AuthState['role']>) => {
      state.role = action.payload;
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.showPassword = false;
      state.role = null;
    },
  },
});

export const { setUser, setRole, toggleShowPassword, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
