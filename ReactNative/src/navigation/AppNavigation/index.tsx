import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppScreen} from '../../constants/';
import TabNavigator from '../MainTabNavigation';

type AppStackParamList = {
  [AppScreen.MainTab]: {};
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={AppScreen.MainTab}>
      <Stack.Screen name={AppScreen.MainTab} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
