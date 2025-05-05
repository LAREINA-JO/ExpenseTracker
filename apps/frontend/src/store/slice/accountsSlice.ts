import type { Account, SerializedType } from '@expense-tracker/schemas';
import { createSlice } from '@reduxjs/toolkit';
import accountsApi from '../api/accountsApi';

type AccountsState = {
  accounts: SerializedType<Account[]>;
};

const initialState: AccountsState = {
  accounts: [],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      accountsApi.endpoints.getAccounts.matchFulfilled,
      (state, { payload }) => {
        state.accounts = payload;
      },
    );
  },
});

export default accountsSlice.reducer;
