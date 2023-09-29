import {lightColors, createTheme} from '@rneui/themed';
import {Platform} from 'react-native';
import {colors} from './color';

export const config = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
    primary: colors.red[900],
  },
});
