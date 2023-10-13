import {ApiConstant} from '@/constants';
import {ILoginDataResponse} from '@/types/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokenInAsyncStore = async (
  tokens: ILoginDataResponse['tokens'],
) => {
  await AsyncStorage.setItem(ApiConstant.ACCESS_TOKEN, tokens.access.token);
  await AsyncStorage.setItem(ApiConstant.REFRESH_TOKEN, tokens.refresh.token);
};

export const saveTokenAndUserIdInAsyncStore = async (
  data: ILoginDataResponse,
) => {
  await saveTokenInAsyncStore(data.tokens);
  await AsyncStorage.setItem(ApiConstant.USER_ID, data.user._id);

  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1);
  await AsyncStorage.setItem(
    ApiConstant.TOKEN_EXPIRATION,
    expirationDate.toISOString(),
  );
};

export const checkTokenExpire = async () => {
  const tokenExpiration = await AsyncStorage.getItem(
    ApiConstant.TOKEN_EXPIRATION,
  );
  const tokenStore = await AsyncStorage.getItem(ApiConstant.ACCESS_TOKEN);
  const expirationDate = new Date(tokenExpiration as string);
  const currentDate = new Date();
  if (!tokenStore || !tokenExpiration) {
    return '';
  } else if (currentDate > expirationDate) {
    await AsyncStorage.removeItem(ApiConstant.ACCESS_TOKEN);
    await AsyncStorage.removeItem(ApiConstant.REFRESH_TOKEN);
    await AsyncStorage.removeItem(ApiConstant.TOKEN_EXPIRATION);
    await AsyncStorage.removeItem(ApiConstant.USER_ID);
    return '';
  } else {
    return tokenStore;
  }
};

export const getTokenFromAsyncStore = async () => {
  const accessToken = await AsyncStorage.getItem(ApiConstant.ACCESS_TOKEN);
  const refreshToken = await AsyncStorage.getItem(ApiConstant.REFRESH_TOKEN);
  return {accessToken, refreshToken};
};

export const handleRefreshToken = async () => {
  // const {refreshToken: oldRefreshToken} = await getTokenFromAsyncStore();
  // const response = await authService.refreshToken({
  //   refreshToken: oldRefreshToken as string,
  // });
  // await saveTokenInAsyncStore(response.data);
};
