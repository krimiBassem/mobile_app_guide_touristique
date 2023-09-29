import * as React from 'react';
import {useState, useEffect} from 'react';

import {
  View,
  Image,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  Pressable,
  TouchableHighlight,
  Alert
} from 'react-native';
import PinSimple from '../../Components/Pin/SimplePin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg from 'react-native-svg';
import CheckGeo from './CheckGeo';
import EncryptedStorage from 'react-native-encrypted-storage';

//import { PERMISSION } from '../config/permission';

export default function Autorisation({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {});

  const switchPermission = async () => {
    const result = await EncryptedStorage.getItem('token');
    const displayAutorisation = await EncryptedStorage.getItem(
      'displayAutorisation',
    );
    if (displayAutorisation && !result) {
      navigation.navigate('SignIn');
      Alert.alert('Warning',`Cette application risque de s'arrêter en cas d'absence de couverture réseau ou de performance insuffisante du téléphone.`)

      // AsyncStorage.setItem('permisssion', 'true')
    } else {
      AsyncStorage.setItem('permisssion', 'true');
      navigation.navigate('ListCircuit');
      Alert.alert('Warning',`Cette application risque de s'arrêter en cas d'absence de couverture réseau ou de performance insuffisante du téléphone.`,)
    }

    // navigation.navigate('Circuit_GIZ');
  };

  function cancelPermission() {
    AsyncStorage.setItem('permisssion', 'false');
    setModalVisible(true);
      Alert.alert('Warning',`Cette application risque de s'arrêter en cas d'absence de couverture réseau ou de performance insuffisante du téléphone.`)

    // navigation.navigate('Gallery');
  }

  let [isPress, setIsPress] = useState(false);

  let touchProps = {
    activeOpacity: 1,
    underlayColor: 'white', // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => switchPermission(), // <-- "onPress" is apparently required
  };

  let textProps = {
    style: isPress ? styles.textPress : styles.textNormal,
  };
  let textNonProps = {
    activeOpacity: 1,
    underlayColor: 'red',
    style: isPress ? styles.btnPress : styles.btnNonPress,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.header}>
          <PinSimple width={84} height={126} />

          <Text style={styles.title}>
            Activer la géolocalisation de cet appareil
          </Text>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={() => switchPermission()}>
            <Text style={styles.textButton}>ACCEPTER</Text>
          </Pressable>
          <TouchableOpacity onPress={() => cancelPermission()}>
            <Text style={styles.buttonNon}> Pas maintenant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <CheckGeo
          navigation1={navigation}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    marginTop: 150,
    //marginLeft: 125,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 60,
    marginTop: 25,
    fontFamily: 'sans-serif-medium',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textPress: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textNormal: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    // marginTop: 50
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#e59138',
    marginTop: 25,
    width: 200,
    height: 60,
  },
  textButton: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonNon: {
    color: 'black',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'normal',
    marginTop: 25,
    //    paddingVertical: 12,
    //  paddingHorizontal: 32,
    //  borderRadius: 10,
    //   elevation: 3,
    //  backgroundColor: '#0C3F3F',
  },
  btnNonPress: {
    color: 'red',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  btnNormal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#e59138',
    marginTop: 25,
    width: 200,
    height: 60,
  },
  btnPress: {
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    //    backgroundColor: '#e59138',
    marginTop: 25,
    width: 200,
    height: 60,
  },
});
