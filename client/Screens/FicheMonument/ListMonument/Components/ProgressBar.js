import {Dimensions, StyleSheet, Text, View,Modal } from 'react-native';
import ModalCircuitFinished from './ModalCircuitFinished';
import React, {useRef, useEffect,useState} from 'react';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ModalCircuitFinished from '../../!Screens/FicheMonument/ListMonument/Components/ModalCircuitFinished';

const ProgressBar = ({order}) => {
  console.log('order from Progress bar', order);
  const [modalVisible1, setModalVisible1] = useState(false);

  useEffect(() => {
    console.log(order);
    if (order===1) {
      setModalVisible1(true)
    }
    if (order === 8) {
      AsyncStorage.setItem('@forProgress', 'doneffff').then(res =>
        console.log('response from progressbar', res),
      );
    }
  }, []);

  return (
    <View style={{height:30}}>
            <Text style={{paddingLeft:12,top:3}}>{order}/9</Text>

    <View style={styles.progressBar}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: '#E59138', width: `${order * 10}%`},
        ]}
      />
    </View>
    <Modal  animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(false);
        }}>
            <ModalCircuitFinished
             setModalVisible1={setModalVisible1}
             modalVisible1={modalVisible1}
            />
      </Modal>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 5,
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#ffffff',
    borderColor: '#E59138',
    borderWidth: 1,
    borderRadius: 5,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
  },
});
