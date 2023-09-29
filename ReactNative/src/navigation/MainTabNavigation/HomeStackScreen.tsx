import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SCREENS} from '@/constants';
import AttendanceCheck from '@/screens/AttendanceCheck';
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
      <HomeStack.Screen
        name={SCREENS.ATTENDANCE_CHECK}
        component={AttendanceCheck}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
