import React from 'react';
import {ColorValue} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface IProps {
  color?: ColorValue;
  icon: string;
  size?: number;
  onPress?: () => void;
}

const Icon = ({color, icon, size = 20, onPress}: IProps) => {
  return (
    <SvgXml
      onPress={onPress}
      xml={icon}
      width={size}
      height={size}
      color={color}
    />
  );
};

export default Icon;
