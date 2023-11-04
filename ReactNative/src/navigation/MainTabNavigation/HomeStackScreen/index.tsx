
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SCREENS} from '@/constants';
import HomeScreen from '@/screens/Home';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={SCREENS.HOME}>
      <HomeStack.Screen name={SCREENS.HOME} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
