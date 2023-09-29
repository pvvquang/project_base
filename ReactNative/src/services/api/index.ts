import {ApiConstant} from '@/constants';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const defaultConfig = (headers: any) => ({
  baseURL: ApiConstant.BASE_URL,
  headers: {...headers},
  timeout: ApiConstant.TIMEOUT,
});

const loginConfigInterceptors = (axiosClient: any) => {
  axiosClient.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    (res: any) => Promise.reject(res.response?.data),
  );
  return axiosClient;
};

const configInterceptors = (axiosClient: any) => {
  axiosClient.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    (res: any) =>
      Promise.reject(
        res?.response?.data?.errors || {status: res?.response?.status},
      ),
  );
  axiosClient.interceptors.request.use(
    (config: AxiosRequestConfig = {}) => {
      const accessToken = '';
      // const accessToken = Cookies.get(ApiConstant.ACCESS_TOKEN);
      if (!accessToken) return config;
      return {
        ...config,
        headers: {
          ...(config.headers || {}),
          Authorization: 'Bearer ' + accessToken,
        },
      };
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
