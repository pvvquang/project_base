import ButtonBase from '@/components/atoms/Button';
import ViewCenter from '@/components/atoms/layouts/ViewCenter';
import {useAppDispatch} from '@/hooks';
import {setToken} from '@/store/reducers/auth';
import React from 'react';
import {Text} from 'react-native';

const SettingScreen = () => {
  const dispatch = useAppDispatch();
  function logout() {
    dispatch(setToken(''));
  }
  return (
    <ViewCenter>
      <Text>SettingScreen</Text>
      <ButtonBase title="Logout" fullWidth onPress={logout} />
    </ViewCenter>
  );
};

export default SettingScreen;
