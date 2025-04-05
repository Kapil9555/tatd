import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { BASE_URL } from '../constant';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithErrorHandler = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data, error } = result.error;

    let message = 'Something went wrong. Please try again.';

    if (status === 'FETCH_ERROR') {
      message = 'Network error. Please check your internet connection.';
    } else if (status === 400 || status === 401) {
      message = data?.message || 'Invalid request. Please check your input.';
    } else if (status === 403) {
      message = 'You are not authorized.';
    } else if (status === 500) {
      message = 'Server error. Please try again later.';
    }

    Alert.alert('Error', message);
  }

  return result;
};
