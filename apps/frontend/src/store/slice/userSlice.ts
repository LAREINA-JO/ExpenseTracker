import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SignInError, SignInResBody } from '@expense-tracker/schemas';
import { toast } from 'coderui';
import userApi from '../api/userApi';

export type UserState = Partial<SignInResBody> & {
  isAuthenticated: boolean;
  error?: SignInError;
};

const initialState: UserState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          toast.success(`Welcome back, ${payload.username}!`);
          state = {
            ...payload,
            isAuthenticated: true,
          };
          return state;
        },
      )
      .addMatcher(
        userApi.endpoints.signIn.matchRejected,
        (state, { payload }) => {
          state.isAuthenticated = false;
        },
      )
      .addMatcher(userApi.endpoints.signOut.matchFulfilled, (state) => {
        toast.success('Sign out successful!');
        return initialState;
      })
      .addMatcher(
        userApi.endpoints.refreshUser.matchFulfilled,
        (state, { payload }) => {
          state = {
            ...payload,
            isAuthenticated: true,
          };
          return state;
        },
      )
      .addMatcher(
        userApi.endpoints.refreshUser.matchRejected,
        (state, { payload }) => {
          state.isAuthenticated = false;
        },
      );
  },
});

export const { updateIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
