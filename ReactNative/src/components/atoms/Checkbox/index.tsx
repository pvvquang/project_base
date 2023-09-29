import themes from '@/themes';
import {CheckBoxProps} from '@rneui/base';
import {CheckBox} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';

interface IInputCheckbox extends CheckBoxProps {}

const InputCheckbox = ({
  checked,
  onPress,
  center,
  title,
  disabled,
  checkedColor = themes.color.red[900],
  uncheckedColor = themes.color.gray.C5C,
  size = 24,
  checkedIcon = 'checkbox-marked',
  uncheckedIcon = 'checkbox-blank-outline',
  containerStyle,
  textStyle,
}: IInputCheckbox) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      onPress={onPress}
      center={center}
      disabled={disabled}
      containerStyle={[styles.container, containerStyle]}
      iconType="material-community"
      checkedIcon={checkedIcon}
      uncheckedIcon={uncheckedIcon}
      checkedColor={checkedColor}
      uncheckedColor={uncheckedColor}
      size={size}
      textStyle={textStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    marginLeft: 0,
    padding: 0,
  },
});
export default InputCheckbox;
