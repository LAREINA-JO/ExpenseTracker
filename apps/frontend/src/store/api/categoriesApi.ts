import { createApi } from '@reduxjs/toolkit/query/react';
import axiosApiBaseQuery from './utils/axiosBaseQuery';
import type {
  GetCategoriesReqBody,
  GetCategoriesResBody,
  UpdateCategoriesReqBody,
  AddCategoryReqBody,
  Category,
} from '@expense-tracker/schemas';
import omit from '@/utils/common/omit';

export const categoriesApiQueryTags = {
  getCategories: (data: GetCategoriesReqBody | void) =>
    [{ type: 'getCategories', data }] as const,
} as const;

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: axiosApiBaseQuery({}),
  tagTypes: Object.keys(categoriesApiQueryTags),
  endpoints: (builder) => ({
    getCategories: builder.query<
      GetCategoriesResBody,
      GetCategoriesReqBody | void
    >({
      query: (data) => ({ url: '/categories', method: 'POST', data }),
      providesTags: (result, err, arg) =>
        categoriesApiQueryTags.getCategories(arg),
    }),
    updateCategory: builder.mutation<
      {},
      UpdateCategoriesReqBody & { id: number }
    >({
      query: (data) => ({
        url: `/categories/${data.id}`,
        method: 'PUT',
        data: omit(data, ['id']),
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
        const caches = categoriesApi.util.selectInvalidatedBy(getState(), [
          'getCategories',
        ]);

        const patchResults = caches.map(({ endpointName, originalArgs }) => {
          return dispatch(
            categoriesApi.util.updateQueryData(
              'getCategories',
              originalArgs,
              (draft) => {
                const category = draft.find(
                  (category) => category.id === arg.id,
                );
                if (category) {
                  category.name = arg.name!;
                }
              },
            ),
          );
        });

        queryFulfilled.catch(() => {
          patchResults.forEach((result) => result.undo());
        });
      },
    }),
    addCategory: builder.mutation<Category, AddCategoryReqBody>({
      query: (data) => ({
        url: '/categories/add',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['getCategories'],
    }),
    deleteCategory: builder.mutation<{}, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
        const caches = categoriesApi.util.selectInvalidatedBy(getState(), [
          'getCategories',
        ]);

        const patchResults = caches.map(({ endpointName, originalArgs }) => {
          return dispatch(
            categoriesApi.util.updateQueryData(
              'getCategories',
              originalArgs,
              (draft) => {
                return draft.filter((category) => category.id !== arg);
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
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;
