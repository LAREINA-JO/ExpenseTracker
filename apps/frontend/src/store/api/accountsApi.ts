import { createApi } from '@reduxjs/toolkit/query/react';
import axiosApiBaseQuery from './utils/axiosBaseQuery';
import type {
  GetAccountsReqBody,
  GetAccountsResBody,
  UpdateAccountsReqBody,
  AddAccountReqBody,
  Account,
} from '@expense-tracker/schemas';
import omit from '@/utils/common/omit';

export const accountsApiQueryTags = {
  getAccounts: (data: GetAccountsReqBody | void) =>
    [{ type: 'getAccounts', data }] as const,
} as const;

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: axiosApiBaseQuery({}),
  tagTypes: Object.keys(accountsApiQueryTags),
  endpoints: (builder) => ({
    getAccounts: builder.query<GetAccountsResBody, GetAccountsReqBody | void>({
      query: (data) => ({ url: '/accounts', method: 'POST', data }),
      providesTags: (result, err, arg) => accountsApiQueryTags.getAccounts(arg),
    }),
    updateAccount: builder.mutation<{}, UpdateAccountsReqBody & { id: number }>(
      {
        query: (data) => ({
          url: `/accounts/${data.id}`,
          method: 'PUT',
          data: omit(data, ['id']),
        }),
        onQueryStarted: (arg, { dispatch, queryFulfilled, getState }) => {
          const caches = accountsApi.util.selectInvalidatedBy(getState(), [
            'getAccounts',
          ]);

          const patchResults = caches.map(
            ({ endpointName, originalArgs, queryCacheKey }) => {
              return dispatch(
                accountsApi.util.updateQueryData(
                  'getAccounts',
                  originalArgs,
                  (draft) => {
                    const account = draft.find(
                      (account) => account.id === arg.id,
                    );
                    if (account) {
                      account.name = arg.name!;
                      account.cardNumber = arg.cardNumber!;
                    }
                  },
                ),
              );
            },
          );
          queryFulfilled.catch(() => {
            patchResults.forEach((result) => result.undo());
          });
        },
      },
    ),
    addAccount: builder.mutation<Account, AddAccountReqBody>({
      query: (data) => ({
        url: '/accounts/add',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['getAccounts'],
    }),
    deleteAccount: builder.mutation<{}, number>({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
        const caches = accountsApi.util.selectInvalidatedBy(getState(), [
          'getAccounts',
        ]);

        const patchResults = caches.map(({ endpointName, originalArgs }) => {
          return dispatch(
            accountsApi.util.updateQueryData(
              'getAccounts',
              originalArgs,
              (draft) => {
                return draft.filter((account) => account.id !== arg);
              },
            ),
          );
        });

        queryFulfilled.catch(() => {
          patchResults.forEach((result) => result.undo());
        });
      },
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useUpdateAccountMutation,
  useAddAccountMutation,
  useDeleteAccountMutation,
} = accountsApi;
export default accountsApi;
