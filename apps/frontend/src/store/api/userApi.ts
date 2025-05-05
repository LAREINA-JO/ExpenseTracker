import { createApi } from '@reduxjs/toolkit/query/react';
import axiosApiBaseQuery from './utils/axiosBaseQuery';
import type {
  SignInReqBody,
  SignInResBody,
  SignOutReqBody,
} from '@expense-tracker/schemas';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosApiBaseQuery({}),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResBody, SignInReqBody>({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        data,
      }),
    }),
    signOut: builder.mutation<{}, SignOutReqBody>({
      query: (data) => ({
        url: '/auth/sign-out',
        method: 'POST',
        data,
      }),
    }),
    refreshUser: builder.mutation<SignInResBody, void>({
      query: () => ({
        url: '/auth/refresh-user',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignOutMutation } = userApi;
export default userApi;
