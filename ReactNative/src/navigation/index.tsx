import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import {useAppDispatch, useTypedSelector} from '@/store/store';
import SplashScreen from 'react-native-splash-screen';
import {setToken} from '@/store/reducers/auth';
import {checkTokenExpire} from '@/utils/auth';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

function Navigation() {
  const dispatch = useAppDispatch();
  const token = useTypedSelector((state: any) => state.auth.token);

  useEffect(() => {
    (async () => {
      const accessToken = await checkTokenExpire();
      dispatch(setToken(accessToken));
      setTimeout(() => {
        SplashScreen?.hide();
      }, 100);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppNavigation /> : <AuthNavigation />}
      <Toast />
    </NavigationContainer>
  );
}

export default Navigation;
