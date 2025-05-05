import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError, Method } from 'axios';
import type { APIError } from '@expense-tracker/schemas';
import axiosApi from '@/utils/Axios';

type AxiosApiBaseQueryConfig = {
  baseUrl?: string;
};

const axiosApiBaseQuery =
  ({
    baseUrl = '',
  }: AxiosApiBaseQueryConfig): BaseQueryFn<
    {
      url: string;
      method?: Method;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
      onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, onUploadProgress }) => {
    try {
      const result = await axiosApi({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        onUploadProgress,
      });
      return { data: result.data }; // must return this format {data: something}
    } catch (axiosError) {
      const err = axiosError as AxiosError<APIError<unknown>>;
      return {
        error: {
          errCode: err.response?.data?.errCode,
          error: err.response?.data.error,
        },
      }; // // must return this format {error: something}
    }
  };

export default axiosApiBaseQuery;
