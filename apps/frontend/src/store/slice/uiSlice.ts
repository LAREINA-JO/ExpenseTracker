import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Option } from 'coderui';
import dayjs from 'dayjs';

type uiState = {
  homePage: {};
  accountsPage: {};
  categoriesPage: {};
  transactionsPage: {};
  globalState: {
    selectedAccount: Option;
    selectedStartDate: string;
    selectedEndDate: string;
  };
};

const initialState: uiState = {
  homePage: {},
  accountsPage: {},
  categoriesPage: {},
  transactionsPage: {},
  globalState: {
    selectedAccount: {
      label: 'All accounts',
      value: 'all',
    },
    selectedStartDate: new Date(2024, 0, 1).toISOString(),
    selectedEndDate: dayjs().endOf('day').toISOString(),
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalAccount: (state, { payload }: PayloadAction<Option>) => {
      state.globalState.selectedAccount = payload;
    },
    setGlobalStartDate: (state, { payload }: PayloadAction<string>) => {
      state.globalState.selectedStartDate = payload;
    },
    setGlobalEndDate: (state, { payload }: PayloadAction<string>) => {
      state.globalState.selectedEndDate = payload;
    },
  },
});

export const { setGlobalAccount, setGlobalStartDate, setGlobalEndDate } =
  uiSlice.actions;
export default uiSlice.reducer;
