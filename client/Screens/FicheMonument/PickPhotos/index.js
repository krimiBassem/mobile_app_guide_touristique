import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import baseURL from '../../../assests/baseUrl';

const index = ({userId}) => {
  const [imageToSend, setImageToSend] = useState(null);
  const [title, setTitle] = useState(null);

  // const stopTalking = () => {
  //   const stopVoiceOff = global?.stopVoiceOff;
  //   stopVoiceOff(false);
  // };

  const tackePhotoFromCamera = async () => {
    try {
      await ImagePicker.openCamera({
        width: 800,
        height: 800,
        cropping: true,
      }).then(async res => {
        console.log('pathhhhhhhhhhhhh', res.path);
        if (res.mime !== null && res.path !== null) {
          await axios({
            url: `${baseURL}/photo`,
            method: 'post',
            data: {
              title: res.mime,
              uri: res.path,
              UtilisateurId: userId,
            },
          })
            .then(
              ToastAndroid.show(
                'Votre photo a été enregistrée avec succès',
                ToastAndroid.LONG,
              ),
            )
            .catch(err => console.log('erreur!!!!!!!', err));
        }
      });
    } catch (err) {
      err => console.error(err);
    }
  };

  return (
    // <View>
    //   </View>
    <TouchableHighlight
      style={styles.photoBtn}
      underlayColor={'#ccd0d5'}
      onPress={tackePhotoFromCamera}>
      <EvilIcons name="camera" size={40} color={'#000000'} />
    </TouchableHighlight>
  );
};

export default index;

const styles = StyleSheet.create({
  photoBtn: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#ffffff',
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
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
