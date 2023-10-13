import {ApiConstant} from '@/constants';
import {getTokenFromAsyncStore, handleRefreshToken} from '@/utils/auth';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {HttpStatusCode} from './type';

const defaultConfig = (headers: any) => ({
  baseURL: ApiConstant.BASE_URL,
  headers: {...headers},
  timeout: ApiConstant.TIMEOUT,
});

const loginConfigInterceptors = (axiosClient: AxiosInstance) => {
  axiosClient.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    (res: any) => Promise.reject(res.response?.data),
  );
  return axiosClient;
};

const configInterceptors = (axiosClient: AxiosInstance) => {
  axiosClient.interceptors.response.use(
    async (res: AxiosResponse) => res.data,
    async error => {
      const originalConfig = error.config;
      if (error.response) {
        if (
          error.response.status === HttpStatusCode.UNAUTHORIZED &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          try {
            await handleRefreshToken();
            return axiosClient(originalConfig);
          } catch (_error: any) {
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
  axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
      const {accessToken} = await getTokenFromAsyncStore();
      if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken;
      }
      return config;
    },
    (error: any) => Promise.reject(error),
  );
  return axiosClient;
};

const ApiClientWithToken = configInterceptors(
  axios.create(defaultConfig(ApiConstant.HEADER_DEFAULT)),
);

export const ApiClientFormFile = configInterceptors(
  axios.create(defaultConfig(ApiConstant.HEADER_DATA_FORM_FILE)),
);

export const LoginClient = loginConfigInterceptors(
  axios.create(defaultConfig(ApiConstant.HEADER_DEFAULT)),
);

export default ApiClientWithToken;
