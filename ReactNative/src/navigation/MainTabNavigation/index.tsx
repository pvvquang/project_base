import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MissionScreen from '@/screens/Mission';
import PointDetailScreen from '@/screens/PointDetail';
import StoreScreen from '@/screens/Store';
import SettingScreen from '@/screens/Setting';
import Icon from '@/components/atoms/IconSvg';
import HomeIcon from '@/assets/icons/HomeIcon';
import MissionIcon from '@/assets/icons/MissionIcon';
import NoteIcon from '@/assets/icons/NoteIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import BagIcon from '@/assets/icons/BagIcon';
import themes from '@/themes';
import {TAB_NAVIGATOR} from '@/constants';
import {StyleSheet} from 'react-native';
import HomeStackScreen from './HomeStackScreen';

type BottomTabStackParamList = {
  [TAB_NAVIGATOR.HOME_TAB]: {};
  [TAB_NAVIGATOR.MISSION_TAB]: {};
  [TAB_NAVIGATOR.POINT_TAB]: {};
  [TAB_NAVIGATOR.STORE_TAB]: {};
  [TAB_NAVIGATOR.SETTING_TAB]: {};
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

type TabBarIcon = {
  focused?: boolean;
  color?: string;
  size?: number;
  xmlIcon: string;
};

const TabNavigator = () => {
  const getTabBarIcon = useCallback(({color, xmlIcon}: TabBarIcon) => {
    return <Icon icon={xmlIcon} color={color} size={24} />;
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={TAB_NAVIGATOR.HOME_TAB}
      screenOptions={{
        tabBarInactiveTintColor: themes.color.gray['5B5'],
        tabBarActiveTintColor: themes.color.red[900],
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}>
      <Tab.Screen
        name={TAB_NAVIGATOR.HOME_TAB}
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => getTabBarIcon({color, xmlIcon: HomeIcon}),
        }}
      />
      <Tab.Screen
        name={TAB_NAVIGATOR.MISSION_TAB}
        component={MissionScreen}
        options={{
          tabBarLabel: 'Mission',
          tabBarIcon: ({color}) => getTabBarIcon({color, xmlIcon: MissionIcon}),
        }}
      />
      <Tab.Screen
        name={TAB_NAVIGATOR.POINT_TAB}
        component={PointDetailScreen}
        options={{
          tabBarLabel: 'Point',
          tabBarIcon: ({color}) => getTabBarIcon({color, xmlIcon: NoteIcon}),
        }}
      />
      <Tab.Screen
        name={TAB_NAVIGATOR.STORE_TAB}
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({color}) => getTabBarIcon({color, xmlIcon: BagIcon}),
        }}
      />
      <Tab.Screen
        name={TAB_NAVIGATOR.SETTING_TAB}
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => getTabBarIcon({color, xmlIcon: SettingIcon}),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingHorizontal: themes.spacing[2],
    paddingBottom: themes.spacing[2.5],
    height: 80,
    justifyContent: 'space-around',
  },
  tabBarItemStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: themes.spacing[3],
    paddingVertical: 8,
  },
  tabBarIconStyle: {},
  tabBarLabelStyle: {
    fontSize: themes.fontSizes['2xs'],
    lineHeight: themes.spacing[3],
    fontWeight: '500',
  },
});
