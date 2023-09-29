import ApiClientWithToken, {LoginClient} from './api';

export default {
  login(requestBody: any): Promise<any> {
    const url = '/auth/login/user';
    return LoginClient.post(url, {...requestBody});
  },
  getSelfInfo() {
    return ApiClientWithToken.get('/users');
  },
};
