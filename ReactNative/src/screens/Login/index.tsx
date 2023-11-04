import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import InputText from '@/components/atoms/inputs/InputText';
import ButtonBase from '@/components/atoms/Button';
import ViewCenter from '@/components/atoms/layouts/ViewCenter';
import {useDispatch} from 'react-redux';
import {uuidv4} from '@/utils';
import {setToken} from '@/store/reducers/auth';
import {saveTokenAndUserIdInAsyncStore} from '@/utils/auth';

const defaultValues = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState(defaultValues);

  const handleFieldChange = (value: string, keyName?: string) => {
    if (keyName) {
      setLoginInfo(prev => ({...prev, [keyName]: value}));
    }
  };

  const handleLogin = async () => {
    const data = {
      tokens: {
        access: {token: uuidv4(), expires: new Date()},
        refresh: {token: uuidv4(), expires: new Date()},
      },
      user: {_id: uuidv4()},
    };
    await saveTokenAndUserIdInAsyncStore(data);
    dispatch(setToken(data.tokens.access.token));
  };

  return (
    <ViewCenter style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <InputText
          label="Email"
          keyName="email"
          value={loginInfo.email}
          onChangeText={handleFieldChange}
          placeholder="Enter your email..."
          containerStyle={{flex: 1, width: '100%'}}
        />
        <InputText
          label="Password"
          keyName="password"
          value={loginInfo.password}
          onChangeText={handleFieldChange}
          placeholder="Enter your password..."
          secureTextEntry
        />
      </View>
      <ButtonBase title="Login" fullWidth onPress={handleLogin} />
    </ViewCenter>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    gap: 20,
    borderWidth: 1,
    backgroundColor: '#faa',
  },
  inputContainer: {
    width: '100%',
  },
});
