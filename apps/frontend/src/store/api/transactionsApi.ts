import { createApi } from '@reduxjs/toolkit/query/react';
import axiosApiBaseQuery from './utils/axiosBaseQuery';
import type {
  GetTransactionsReqBody,
  GetTransactionsResBody,
  UpdateTransactionReqBody,
  AddTransactionReqBody,
  Transaction,
} from '@expense-tracker/schemas';
import omit from '@/utils/common/omit';

export const transactionsApiQueryTags = {
  getTransactions: (data: GetTransactionsReqBody | void) =>
    [{ type: 'getTransactions', data }] as const,
} as const;

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: axiosApiBaseQuery({}),
  tagTypes: Object.keys(transactionsApiQueryTags),
  endpoints: (builder) => ({
    getTransactions: builder.query<
      GetTransactionsResBody,
      GetTransactionsReqBody | void
    >({
      query: (data) => ({ url: '/transactions', method: 'POST', data }),
      providesTags: (result, err, arg) =>
        transactionsApiQueryTags.getTransactions(arg),
    }),
    updateTransaction: builder.mutation<
      {},
      UpdateTransactionReqBody & { id: number }
    >({
      query: (data) => ({
        url: `/transactions/${data.id}`,
        method: 'PUT',
        data: omit(data, ['id']),
      }),
      invalidatesTags: ['getTransactions'],
    }),
    addTransaction: builder.mutation<Transaction, AddTransactionReqBody>({
      query: (data) => ({
        url: '/transactions/add',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['getTransactions'],
    }),
    deleteTransaction: builder.mutation<{}, number>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getTransactions'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;

export default transactionsApi;
