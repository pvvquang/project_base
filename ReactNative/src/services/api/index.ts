import {BaseQueryFn, createApi, retry} from '@reduxjs/toolkit/query/react';
import axiosInstance from './axiosInstance';
import {AxiosError, AxiosRequestConfig} from 'axios';

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
  async ({url, method, data, params, headers}) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {error};
    }
  };

const baseQueryWithRetry = retry(axiosBaseQuery(), {maxRetries: 3});

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  reducerPath: 'appApi',
  endpoints: () => ({}),
  tagTypes: [],
});
