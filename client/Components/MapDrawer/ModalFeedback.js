import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useEffect} from 'react';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import BASE_URL from '../../assests/baseUrl';
import axios from 'axios';
import {Snackbar, Button} from '@react-native-material/core';

const RenderContent = ({UserId, setShowModal}) => {
  const [message, setMessage] = useState('');
  const [sucessFeed, setSucessFeed] = useState(false);
  const [emojie, setEmojie] = useState(null);
  const [image, setImage] = useState('');
  const [emo1, setEmo1] = useState(false);
  const [emo2, setEmo2] = useState(false);
  const [emo3, setEmo3] = useState(false);
  const [emo4, setEmo4] = useState(false);
  const [emo5, setEmo5] = useState(false);
  const [messageAlert, setmessageAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  console.log('starss', emojie);
  const emptyChamp = () => {
    setImage(false);
    setSucessFeed(true);
    setMessage('');
  };

  const MessageAlert = () => (
    <Snackbar
      message={`${messageAlert}`}
      action={
        <Button
          variant="text"
          title="Fermer"
          color="#E59138"
          compact
          onPress={() => {
            setShowAlert(false);
            if (messageAlert === 'Votre feedback est envoyé avec succès') {
              setShowModal(false);
            }
          }}
        />
      }
      style={{position: 'absolute', start: 16, end: 16, bottom: 16}}
    />
  );

  const postFeedback = async () => {
    if (message != '') {
      try {
        await axios
          .post(`${BASE_URL}/feedback`, {
            message: message,
            emojie_reaction: emojie,
            photoOrVideo: image,
            UtilisateurId: UserId,
          })
          .then(() => {
            emptyChamp();
            setShowAlert(true);
            setmessageAlert('Votre feedback est envoyé avec succès');
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowAlert(true);
      setmessageAlert(
        "Veuillez ajouter votre message, avant d'envoyer l'avis!! Merci",
      );
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      const uri = image.path;
      const name = image.modificationDate;
      const type = image.mime;
      const source = {
        uri,
        name,
        type,
      };
      await handleUpload(source);
    } catch (err) {
      err => console.error(err);
    }
  };

  const changeImageFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      const uri = image.path;
      const name = image.modificationDate;
      const type = image.mime;
      const source = {
        uri,
        name,
        type,
      };

      await handleUpload(source);
    } catch (err) {
      err => console.error(err);
    }
  };

  const handleUpload = async photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'dourbina');
    data.append('cloud_name', 'dqoutfci8');
    await fetch('https://api.cloudinary.com/v1_1/dqoutfci8/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(async data => {
        setImage(data.url);
        bs.current.snapTo(1);
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };

  const addEmojieReact1 = () => {
    setEmojie(1);
    setEmo1(true);
    setEmo2(false);
    setEmo3(false);
    setEmo4(false);
    setEmo5(false);
  };
  const addEmojieReact2 = () => {
    setEmojie(2);
    setEmo1(true);
    setEmo2(true);
    setEmo3(false);
    setEmo4(false);
    setEmo5(false);
  };
  const addEmojieReact3 = () => {
    setEmojie(3);
    setEmo1(true);
    setEmo2(true);
    setEmo3(true);
    setEmo4(false);
    setEmo5(false);
  };
  const addEmojieReact4 = () => {
    setEmojie(4);
    setEmo1(true);
    setEmo2(true);
    setEmo3(true);
    setEmo4(true);
    setEmo5(false);
  };
  const addEmojieReact5 = () => {
    setEmojie(5);
    setEmo1(true);
    setEmo2(true);
    setEmo3(true);
    setEmo4(true);
    setEmo5(true);
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(false);
          }}
          style={{position: 'absolute', top: 10, right: 8}}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#E59138',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>X</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          <Text style={{fontFamily: 'SegoeUI', fontSize: 18, color: '#474747'}}>
            {'partagez votre feedback'.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI',
              fontSize: 18,
              color: '#474747',
              marginTop: 15,
            }}>
            A quel point êtes-vous satisfait ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 20,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Pressable onPress={addEmojieReact1}>
              {!emo1 ? (
                <Entypo
                  style={{
                    width: 40,
                    height: 40,
                    paddingRight: 10,
                    marginRight: 7,
                  }}
                  name="star-outlined"
                  size={30}
                  color="black"
                />
              ) : (
                <Entypo
                  style={{
                    width: 40,
                    height: 40,
                    paddingRight: 10,
                    marginRight: 7,
                  }}
                  name="star"
                  size={30}
                  color="#ECC733"
                />
              )}
            </Pressable>
            <Pressable onPress={addEmojieReact2}>
              {!emo2 ? (
                <Entypo
                  style={{marginRight: 7}}
                  name="star-outlined"
                  size={30}
                  color="black"
                />
              ) : (
                <Entypo
                  style={{marginRight: 7}}
                  name="star"
                  size={30}
                  color="#ECC733"
                />
              )}
            </Pressable>
            <Pressable onPress={addEmojieReact3}>
              {!emo3 ? (
                <Entypo
                  style={{marginRight: 7}}
                  name="star-outlined"
                  size={30}
                  color="black"
                />
              ) : (
                <Entypo
                  style={{marginRight: 7}}
                  name="star"
                  size={30}
                  color="#ECC733"
                />
              )}
            </Pressable>
            <Pressable onPress={addEmojieReact4}>
              {!emo4 ? (
                <Entypo
                  style={{marginRight: 7}}
                  name="star-outlined"
                  size={30}
                  color="black"
                />
              ) : (
                <Entypo
                  style={{marginRight: 7}}
                  name="star"
                  size={30}
                  color="#ECC733"
                />
              )}
            </Pressable>
            <Pressable onPress={addEmojieReact5}>
              {!emo5 ? (
                <Entypo
                  style={{marginRight: 7}}
                  name="star-outlined"
                  size={30}
                  color="black"
                />
              ) : (
                <Entypo
                  style={{marginRight: 7}}
                  name="star"
                  size={30}
                  color="#ECC733"
                />
              )}
            </Pressable>
          </View>
          <View style={{marginTop: 25}}>
            <TextInput
              style={styles.input}
              onChangeText={value => setMessage(value)}
              value={message}
              multiline
              placeholder={"Q'est ce que vous aimez le plus ?"}
              placeholderTextColor="#474747"
              numberOfLines={5}
            />
            <View
              style={{
                position: 'absolute',
                top: -30,
                right: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={changeImageFromCamera}>
                <Image source={require('../iconsContribution/camera.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={choosePhotoFromLibrary}
                style={{marginLeft: 10}}>
                <Image source={require('../iconsContribution/gallery.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // marginRight: 10,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={postFeedback}
              style={{
                // marginTop: 10,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // marginBottom: 20,
                width: 100,
                borderRadius: 5,
                backgroundColor: '#E8E8E8',
                // marginRight: 15,
              }}>
              <Text
                style={{fontSize: 16, color: '#705F5F', fontFamily: 'SegoeUI'}}>
                Envoyer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Pressable
          style={styles.panelButton}
          onPress={() => {
            setShowModal(false);
          }}>
          <Text style={styles.textStyle}>{'passer'.toUpperCase()}</Text>
        </Pressable> */}
      </View>
      {showAlert && <MessageAlert />}
    </View>
  );
};

export default RenderContent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(184,184,184,0.63)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.9,
  },
  modalText: {
    marginBottom: 15,
    color: '#e59138',
    textDecorationLine: 'underline',
    textDecorationColor: '#E59138',
    textDecorationStyle: 'solid',
    fontSize: 16,
    fontFamily: 'SegoeUI',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#E59138',
    alignItems: 'center',
    marginVertical: 2,
    width: Dimensions.get('screen').width * 0.4,
    alignSelf: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    textDecorationColor: '#ffffff',
    textDecorationStyle: 'solid',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  input: {
    height: 'auto',
    // margin: 12,
    borderWidth: 1,
    borderColor: '#E59138',
    // padding: 10,
    borderRadius: 5,
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    // paddingBottom: 100,
  },
});
