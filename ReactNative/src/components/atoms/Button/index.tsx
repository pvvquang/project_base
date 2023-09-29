import {Button, ButtonProps} from '@rneui/themed';
import React, {useMemo} from 'react';
import {BTN_SIZE} from './constant';
import {btnDisabledStyle, btnMdStyle, btnSmStyle} from './style';
interface IProps extends ButtonProps {
  size?: keyof typeof BTN_SIZE;
  fullWidth?: boolean;
}

const ButtonBase = ({
  size = BTN_SIZE.md,
  iconContainerStyle,
  titleStyle,
  buttonStyle,
  containerStyle,
  fullWidth = false,
  ...rest
}: IProps) => {
  const _containerStyle = useMemo(() => {
    let _style = [btnMdStyle.container];
    if (size === BTN_SIZE.sm) {
      _style = [btnSmStyle.container];
    }

    if (fullWidth) {
      _style = [..._style, {alignSelf: 'auto'}];
    }
    return _style;
  }, [size, fullWidth]);

  const _buttonStyle = useMemo(() => {
    let state = [btnMdStyle.button];
    if (size === BTN_SIZE.sm) {
      state = [btnSmStyle.button];
    }

    return state;
  }, [size]);

  const _titleStyle = useMemo(() => {
    let state: typeof titleStyle = btnMdStyle.title;
    if (size === BTN_SIZE.sm) {
      state = btnSmStyle.title;
    }
    return state;
  }, [size]);

  return (
    <Button
      iconContainerStyle={iconContainerStyle}
      titleStyle={[_titleStyle, titleStyle]}
      buttonStyle={[_buttonStyle, buttonStyle]}
      containerStyle={[_containerStyle, containerStyle]}
      disabledStyle={btnDisabledStyle.container}
      disabledTitleStyle={btnDisabledStyle.title}
      {...rest}
    />
  );
};

export default ButtonBase;
