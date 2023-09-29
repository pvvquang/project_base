import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {View, StyleSheet} from 'react-native';
import themes from '@/themes';

interface InputSwitchProps {
  value: boolean;
  label?: string;
  disabled?: boolean;
  isBorder?: boolean;
  onChange: () => void;
}

const InputSwitch: React.FC<InputSwitchProps> = ({
  onChange,
  value,
  label,
  disabled,
  isBorder,
}) => {
  return (
    <View style={styles.view}>
      <ToggleSwitch
        isOn={value}
        onColor={themes.color.white}
        offColor={themes.color.white}
        thumbOnStyle={{backgroundColor: themes.color.red[900]}}
        thumbOffStyle={{backgroundColor: themes.color.gray[700]}}
        label={label}
        labelStyle={styles.label}
        size="small"
        onToggle={onChange}
        disabled={disabled}
        trackOnStyle={isBorder && styles.border}
        trackOffStyle={isBorder && styles.border}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    width: 40,
    height: 20,
  },
  label: {
    color: themes.color.black,
    fontWeight: '900',
  },
  border: {
    borderColor: themes.color.gray[700],
    borderWidth: 1,
  },
});

export default InputSwitch;
