import {ApiConstant} from '@/constants';
import {getTokenFromAsyncStore, handleRefreshToken} from '@/utils/auth';
import axios, {HttpStatusCode} from 'axios';

const axiosInstance = axios.create({
  baseURL: ApiConstant.BASE_URL,
  headers: ApiConstant.HEADER_DEFAULT,
  timeout: ApiConstant.TIMEOUT,
});

axiosInstance.interceptors.request.use(
  async config => {
    const {accessToken} = await getTokenFromAsyncStore();
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response.data,
  async error => {
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response.status === HttpStatusCode.Unauthorized &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          await handleRefreshToken();
          return axiosInstance(originalConfig);
        } catch (_error: any) {
          // logout here
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      } else {
        return Promise.reject(error?.response?.data);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
