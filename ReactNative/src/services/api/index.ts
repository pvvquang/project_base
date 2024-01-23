import {BaseQueryFn, createApi, retry} from '@reduxjs/toolkit/query/react';
import axiosInstance from './axiosInstance';
import {AxiosError, AxiosRequestConfig} from 'axios';

interface YLRequestConfig extends Omit<AxiosRequestConfig, 'data'> {
  body?: AxiosRequestConfig['data'];
}

const axiosBaseQuery =
  (): BaseQueryFn<YLRequestConfig> => async axiosConfigs => {
    const {body: data, ...configs} = axiosConfigs;
    try {
      const result = await axiosInstance.request({
        ...configs,
        data,
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
