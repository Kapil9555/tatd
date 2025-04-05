import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandler } from '../../baseQueryWithErrorHandler';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (phoneNumber) => ({
        url: 'driver/login/driver-login.php',
        method: 'POST',
        body: {
          mobile: phoneNumber,
          user_type: 'Driver',
          app_version: 2.37,
          app_type: 'android',
        },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ phone, otp }) => ({
        url: 'driver/login/verify-otp-login.php',
        method: 'POST',
        body: {
          mobile: phone,
          otp,
          user_type: 'Driver',
          app_version: 2.37,
          app_type: 'android',
        },
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
