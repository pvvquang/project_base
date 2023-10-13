import {TextStyle} from 'react-native';

// extension of font family
export const NotoSanFont = {
  '100': 'Thin',
  '200': 'ExtraLight',
  '300': 'Light',
  '400': 'Regular',
  normal: 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
  bold: 'Bold',
  '800': 'ExtraBold',
  '900': 'Black',
} as const;

// get fontFamily
export const getFontFamily = (
  _fontWeight: TextStyle['fontWeight'] = '400',
  _fontStyle?: TextStyle['fontStyle'],
) => {
  return `NotoSansKR-${NotoSanFont[_fontWeight]}${
    _fontStyle === 'italic' ? 'Italic' : ''
  }`;
};

const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  '1sm': 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 22,
  '3xl': 24,
  '4xl': 26,
  '5xl': 28,
  '6xl': 30,
  '7xl': 32,
  '8xl': 34,
} as const;

export const typography = {
  fontSizes,
};
