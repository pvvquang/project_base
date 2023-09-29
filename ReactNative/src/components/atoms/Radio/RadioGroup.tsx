import React from 'react';
import InputRadio from './index';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import InputLabel from '../inputs/InputLabel';
import themes from '@/themes';
import {IOption} from '@/types/common';

type RadioGroup = React.ComponentProps<typeof InputLabel> & {
  value: IOption['id'];
  options: IOption[];
  keyName?: string;
  onChange?: (
    value: IOption['id'],
    keyName?: string,
    event?: GestureResponderEvent,
  ) => void;
  error?: boolean;
  errorMessage?: string;
  checked?: boolean;
};

const RadioGroup = ({
  label,
  requiredLabel,
  labelStyle,
  options,
  onChange,
  keyName,
  error,
  errorMessage,
  value,
}: RadioGroup) => {
  const handlePressItem = (e: GestureResponderEvent, item: IOption) => {
    onChange && onChange(item.id, keyName, e);
  };

  return (
    <View>
      <InputLabel
        label={label}
        requiredLabel={requiredLabel}
        labelStyle={labelStyle}
      />
      <View style={styles.groups}>
        {options.map((item, i) => (
          <InputRadio
            key={i}
            title={item.label}
            checked={item.id === value}
            onPress={e => handlePressItem(e, item)}
            containerStyle={styles.inputRadio}
          />
        ))}
      </View>
      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  groups: {
    flexDirection: 'row',
    gap: themes.spacing[8],
  },
  inputRadio: {
    alignSelf: 'flex-start',
  },
  errorMessage: {
    fontSize: themes.fontSizes.xs,
    color: themes.color.red.FF3,
  },
});

export default RadioGroup;
