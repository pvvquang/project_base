import React, {FC, useState} from 'react';
import {Input as RNInput, InputProps} from '@rneui/themed';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import themes from '@/themes';
import InputLabel from './InputLabel';
import Icon from '@/components/atoms/IconSvg';
import Eye from '@/assets/icons/Eye';
import EyeOff from '@/assets/icons/EyeOff';
interface InputTextProps extends InputProps {
  requiredLabel?: boolean;
  password?: boolean;
  underline?: boolean;
  error?: boolean;
  keyName?: string;
  value?: string;
  onChangeText?: (value: string, keyName?: string) => void;
  marginBot?: number;
}
const InputText: FC<InputTextProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  requiredLabel,
  password,
  underline,
  errorMessage,
  error = false,
  labelStyle,
  keyName = '',
  marginBot = 4,
  ...rest
}) => {
  const [hidePass, setHidePass] = useState(false);
  const handlePassword = () => {
    setHidePass(!hidePass);
  };

  const handleChangeText = (_value: string) => {
    onChangeText && onChangeText(_value, keyName);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, {marginBottom: marginBot}]}>
        <InputLabel
          label={label}
          labelStyle={labelStyle}
          requiredLabel={requiredLabel}
        />

        <RNInput
          {...rest}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={password && !hidePass}
          errorMessage={error ? errorMessage : ''}
          rightIcon={
            password && (
              <Icon
                icon={hidePass ? EyeOff : Eye}
                color={hidePass ? themes.color.black : '#E0E0E0'}
                onPress={handlePassword}
              />
            )
          }
          errorStyle={styles.errorMess}
          inputContainerStyle={[
            styles.input,
            !underline && styles.inputUnderline,
          ]}
          containerStyle={styles.containerInput}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 50,
    fontSize: themes.fontSizes.md,
    textDecorationLine: 'none',
    paddingHorizontal: 0,
    borderColor: themes.color.gray[500],
    placeholderTextColor: themes.color.gray[500],
    borderRadius: themes.spacing[2],
  },
  containerInput: {
    paddingHorizontal: 0,
    height: 54,
  },
  inputUnderline: {
    borderColor: themes.color.white,
    backgroundColor: themes.color.white,
    paddingHorizontal: themes.spacing[3],
  },
  errorMess: {
    fontSize: themes.fontSizes.xs,
    marginHorizontal: 0,
  },
});
export default InputText;
