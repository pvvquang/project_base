import RadioCheckIcon from '@/assets/icons/RadioCheckIcon';
import RadioCheckOutlineIcon from '@/assets/icons/RadioCheckOutlineIcon';
import RadioUncheckIcon from '@/assets/icons/RadioUncheckIcon';
import themes from '@/themes';
import {CheckBox, CheckBoxProps} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from '../IconSvg';

export interface IRadioProps extends CheckBoxProps {}

const InputRadio = ({
  checked,
  onPress,
  center,
  title,
  disabled,
  checkedIcon,
  uncheckedIcon,
  checkedColor = themes.color.black,
  uncheckedColor = themes.color.gray[700],
  containerStyle,
}: IRadioProps) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      onPress={onPress}
      center={center}
      disabled={disabled}
      containerStyle={[styles.container, containerStyle]}
      textStyle={[styles.container, disabled && styles.container]}
      checkedIcon={
        checkedIcon ? (
          checkedIcon
        ) : (
          <Icon icon={RadioCheckIcon} size={24} color={checkedColor} />
        )
      }
      uncheckedIcon={
        uncheckedIcon ? (
          uncheckedIcon
        ) : (
          <Icon icon={RadioUncheckIcon} size={24} color={uncheckedColor} />
        )
      }
    />
  );
};

interface IRadioOutline extends IRadioProps {}

export const InputRadioOutLine = (props: IRadioOutline) => {
  const {
    checkedColor = themes.color.red[900],
    uncheckedColor = themes.color.black,
    ...rest
  } = props;
  return (
    <InputRadio
      {...rest}
      checkedIcon={
        <Icon icon={RadioCheckOutlineIcon} size={24} color={checkedColor} />
      }
      uncheckedIcon={
        <Icon icon={RadioCheckOutlineIcon} size={24} color={uncheckedColor} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});

export default InputRadio;
