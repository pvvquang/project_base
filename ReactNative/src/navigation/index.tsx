import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '@/hooks';
import SplashScreen from 'react-native-splash-screen';
import {loginRequest} from '@/store/reducers/auth';

function Navigation() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: any) => state.auth.token);

  useEffect(() => {
    (async () => {
      const tokenExpiration = await AsyncStorage.getItem('tokenExpiration');
      const tokenStore = await AsyncStorage.getItem('token');
      const expirationDate = new Date(tokenExpiration as string);
      const currentDate = new Date();
      if (!tokenStore || !tokenExpiration) {
        dispatch(loginRequest(''));
      } else if (currentDate > expirationDate) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tokenExpiration');
        await AsyncStorage.removeItem('userId');
        dispatch(loginRequest(''));
      } else {
        dispatch(loginRequest(tokenStore as string));
      }
      setTimeout(() => {
        SplashScreen?.hide();
      }, 100);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default Navigation;
