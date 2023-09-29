import React from 'react';
import RNDatePicker from 'react-native-date-picker';

export interface DatePickerProps
  extends React.ComponentProps<typeof RNDatePicker> {}

const DatePicker = ({date, onDateChange, ...rest}: DatePickerProps) => {
  return <RNDatePicker {...rest} date={date} onDateChange={onDateChange} />;
};

export default DatePicker;
