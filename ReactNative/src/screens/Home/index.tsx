import {Text} from 'react-native';
import React from 'react';
import ViewCenter from '@/components/atoms/layouts/ViewCenter';
import ButtonBase from '@/components/atoms/Button';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  return (
    <ViewCenter>
      <Text>HomeScreen</Text>
      <ButtonBase
        title="Show Toast"
        onPress={() =>
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋',
          })
        }
      />
    </ViewCenter>
  );
};

export default HomeScreen;
