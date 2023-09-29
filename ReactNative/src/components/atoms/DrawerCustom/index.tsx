import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const DrawerCustom = () => {
  return (
    <Modal
      isVisible={true}
      style={{margin: 0}}
      animationIn={'slideInRight'}
      animationOut={'fadeOutRight'}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {}}
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}>
          <Text />
        </TouchableWithoutFeedback>
        <View style={{flex: 4, backgroundColor: 'white'}}></View>
      </View>
    </Modal>
  );
};

export default DrawerCustom;
