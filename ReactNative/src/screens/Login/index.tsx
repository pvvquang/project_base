import {View, StyleSheet, Platform} from 'react-native';
import React, {useState} from 'react';
import InputText from '@/components/atoms/inputs/InputText';
import ButtonBase from '@/components/atoms/Button';
import ViewCenter from '@/components/atoms/layouts/ViewCenter';
import {useDispatch} from 'react-redux';
import {uuidv4} from '@/utils';
import {setToken} from '@/store/reducers/auth';
import {saveTokenAndUserIdInAsyncStore} from '@/utils/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import themes from '@/themes';

GoogleSignin.configure({
  webClientId:
    '335435382411-g3j99gmal7h7mtv0h8re8mnt0i3g40sk.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // iosClientId: , // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

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

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  }

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }

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
      <ButtonBase
        fullWidth
        type="outline"
        title="Google Sign-In"
        onPress={onGoogleButtonPress}
      />
      {Platform.OS === 'ios' && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{width: '100%', height: themes.spacing['14.5']}}
          onPress={() => onAppleButtonPress()}
        />
      )}
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
