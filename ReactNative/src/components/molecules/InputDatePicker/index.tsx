import {TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import ModalDatePicker from '@/components/atoms/DatePicker';
import InputText from '@/components/atoms/inputs/InputText';
import moment from 'moment';

type InputDatePicker = React.ComponentProps<typeof InputText> & {
  dateFormat?: string;
  keyName?: string;
  onDateChange?: () => void;
  date: Date | null;
  onSelectDate?: (date: Date, keyName?: string) => void;
  maximumDate?: Date;
  minimumDate?: Date;
};

const InputDatePicker = ({
  label,
  requiredLabel,
  labelStyle,
  date,
  onDateChange,
  leftIcon,
  dateFormat = 'YYYY/MM/DD',
  onSelectDate,
  keyName = '',
  maximumDate,
  minimumDate,
  error,
  errorMessage,
}: InputDatePicker) => {
  const [dateLocal, setDateLocal] = useState<Date | null>(date);
  const [openModal, setOpenModal] = useState(false);

  const dateString = useMemo(() => {
    return dateLocal ? moment(dateLocal).format(dateFormat) : '';
  }, [dateLocal, dateFormat]);

  const handleConfirm = (_date: Date) => {
    setOpenModal(false);
    setDateLocal(_date);
    onSelectDate && onSelectDate(_date, keyName);
  };

  const openModalDatePicker = () => {
    setOpenModal(true);
  };

  const handleCancelDatePicker = () => {
    setOpenModal(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openModalDatePicker}>
        <InputText
          label={label}
          requiredLabel={requiredLabel}
          labelStyle={labelStyle}
          placeholder={dateFormat}
          leftIcon={leftIcon}
          editable={false}
          value={dateString}
          error={error}
          errorMessage={errorMessage}
        />
      </TouchableOpacity>
      {openModal && (
        <ModalDatePicker
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          modal
          open={openModal}
          mode="date"
          date={dateLocal || new Date()}
          onDateChange={onDateChange}
          onCancel={handleCancelDatePicker}
          onConfirm={handleConfirm}
        />
      )}
    </View>
  );
};

export default InputDatePicker;
