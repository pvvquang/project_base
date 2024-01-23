import {api} from '../api';
import {ILoginRequestBody, ILoginResponse} from './auth.type';

export const authService = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<ILoginResponse, ILoginRequestBody>({
      query(requestBody) {
        return {
          url: '/auth/login/user',
          method: 'POST',
          data: requestBody,
        };
      },
    }),
    getUserInfo: build.query<any, void>({
      query: () => ({url: '/users'}),
    }),
  }),
});

export const {useGetUserInfoQuery, useLoginMutation: useLogin} = authService;
