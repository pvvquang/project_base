export const SCREENS = {
  HOME: 'HOME',
  AUTH: 'AUTH',
  MAIN_TAB: 'MAIN_TAB',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;

export enum AppScreen {
  Home = 'HOME',
  Auth = 'AUTH',
  MainTab = 'MAIN_TAB',
  Login = 'LOGIN',
  Register = 'REGISTER',
  ForgotPassword = 'FORGOT_PASSWORD',
}

export const TAB_NAVIGATOR = {
  HOME_TAB: 'HOME_TAB',
  MISSION_TAB: 'MISSION_TAB',
  POINT_TAB: 'POINT_TAB',
  STORE_TAB: 'STORE_TAB',
  SETTING_TAB: 'SETTING_TAB',
} as const;

export enum TabScreen {
  Home = 'HOME_TAB',
  Mission = 'MISSION_TAB',
  Point = 'POINT_TAB',
  Store = 'STORE_TAB',
  Setting = 'SETTING_TAB',
}
