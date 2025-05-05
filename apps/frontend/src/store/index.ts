import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import uiReducer from './slice/uiSlice';
import accountsReducer from './slice/accountsSlice';
import accountsApi from './api/accountsApi';
import categoriesApi from './api/categoriesApi';
import userApi from './api/userApi';
import transactionsApi from './api/transactionsApi';

const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
  ui: uiReducer,
  [userApi.reducerPath]: userApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountsApi.middleware,
      categoriesApi.middleware,
      userApi.middleware,
      transactionsApi.middleware,
    ),
  devTools: import.meta.env.MODE === 'development',
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
