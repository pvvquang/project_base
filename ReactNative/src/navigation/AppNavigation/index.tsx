import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../constants/';
import TabNavigator from '../MainTabNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={SCREENS.MAIN_TAB}>
      <Stack.Screen name={SCREENS.MAIN_TAB} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
