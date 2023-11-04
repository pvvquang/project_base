import THEMES from '@/theme';
import {getFontFamily} from '@/theme/typography';
import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

const disableStyles: StyleProp<TextStyle> = {
  // fontStyle: 'normal',
  // fontWeight: 'normal',
};

type TextProps = Text['props'];

interface TypographyProps extends TextProps {
  size?: keyof typeof THEMES.fontSizes;
  color?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  size = 'md',
  ...rest
}) => {
  const _style: StyleProp<TextStyle> = useMemo(() => {
    const {fontWeight = '400', fontStyle} = StyleSheet.flatten(style || {});
    const fontFamily = getFontFamily(fontWeight, fontStyle);
    const lineHeight =
      ((style as TextStyle)?.fontSize || THEMES.fontSizes[size]) + 4;

    return {
      fontSize: THEMES.fontSizes[size],
      fontFamily,
      lineHeight,
    };
  }, [size, style]);

  return (
    <Text {...rest} style={[_style, style, disableStyles]}>
      {children}
    </Text>
  );
};

export default Typography;
