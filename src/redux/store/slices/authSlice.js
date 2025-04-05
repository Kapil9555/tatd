import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phoneNumber: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.phoneNumber = '';
    },
  },
});

export const { setPhoneNumber, login, logout } = authSlice.actions;
export default authSlice.reducer;
