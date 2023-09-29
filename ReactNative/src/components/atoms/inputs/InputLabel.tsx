import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import themes from '@/themes';
import {InputProps} from '@rneui/base';

type IProps = Pick<InputProps, 'label' | 'labelStyle'> & {
  requiredLabel?: boolean;
};

const InputLabel = ({label, labelStyle, requiredLabel}: IProps) => {
  return !!label ? (
    <View style={styles.label}>
      <Text style={[styles.labelUnderline, labelStyle]}>{label}</Text>
      {requiredLabel ? <Text style={styles.required}>*필수</Text> : <></>}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    gap: themes.spacing[1],
    color: themes.color.gray[700],
    fontSize: themes.fontSizes.xs,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: themes.spacing[2],
    alignItems: 'center',
  },
  required: {
    color: themes.color.red[900],
    fontWeight: 'bold',
    fontSize: themes.fontSizes['2xs'],
  },
  labelUnderline: {
    color: themes.color.black,
  },
});

export default InputLabel;
