import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';

const ViewCenter = ({children, style, ...rest}: ViewProps) => {
  return (
    <View style={[styles.rootContainer, style]} {...rest}>
      {children}
    </View>
  );
};

export default ViewCenter;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
