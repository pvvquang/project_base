import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '@/constants';
import Register from '@/screens/Register';
import Login from '@/screens/Login';

const AuthStack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={SCREENS.LOGIN}>
      <AuthStack.Screen name={SCREENS.LOGIN} component={Login} />
      <AuthStack.Screen name={SCREENS.REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
}
