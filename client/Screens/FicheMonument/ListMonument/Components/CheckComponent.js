import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import CheckIcon from 'react-native-vector-icons/Foundation';

const TestModal = () => {
  return (
    <View style={{position: 'absolute', top: 5, right: 15}}>
      <TouchableHighlight style={styles.playBtn} underlayColor={'#ccd0d5'}>
        <CheckIcon name={'check'} size={20} color={'#ffffff'} />
      </TouchableHighlight>
    </View>
  );
};

export default TestModal;

const styles = StyleSheet.create({
  playBtn: {
    width: 24,
    height: 24,
    borderRadius: 40,
    backgroundColor: '#E59138',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
    marginBottom: 5,
  },
});
