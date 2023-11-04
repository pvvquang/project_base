import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

interface IProps
  extends React.ComponentProps<typeof TouchableWithoutFeedback> {}

const DismissKeyboard = ({children}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
