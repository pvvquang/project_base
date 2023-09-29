import themes from '@/themes';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface ButtonStyle {
  container: StyleProp<ViewStyle>;
  button: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
}

export const btnMdStyle: ButtonStyle = {
  container: {
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: themes.spacing[4],
    borderRadius: themes.spacing[3],
    height: themes.spacing['14.5'],
  },
  title: {
    fontSize: themes.fontSizes.md,
    lineHeight: themes.spacing[5.5],
  },
};

export const btnSmStyle: ButtonStyle = {
  container: {
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: themes.spacing[3],
    borderRadius: themes.spacing[1],
    height: themes.spacing['6.5'],
  },
  title: {
    fontSize: themes.fontSizes.xs,
    lineHeight: themes.spacing[4],
    fontWeight: '700',
  },
};

interface ButtonDisabledStyle {
  title: StyleProp<TextStyle>;
  container: StyleProp<ViewStyle>;
}

export const btnDisabledStyle: ButtonDisabledStyle = {
  title: {
    color: '#fff',
  },
  container: {
    backgroundColor: themes.color.gray[700],
  },
};
