import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
