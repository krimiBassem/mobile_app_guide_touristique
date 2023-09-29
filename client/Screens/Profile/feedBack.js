import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  Pressable,
  Image,
  ToastAndroid,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import React from 'react';
import {useState, useRef, useCallback} from 'react';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../assests/baseUrl';
import IconChevron from 'react-native-vector-icons/Feather';
import EncryptedStorage from 'react-native-encrypted-storage';
//Import components

const FeedBack = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [sucessFeed, setSucessFeed] = useState(false);
  const [emojie, setEmojie] = useState(null);
  const [image, setImage] = useState('');
  const [emo1, setEmo1] = useState(false);
  const [emo2, setEmo2] = useState(false);
  const [emo3, setEmo3] = useState(false);
  const [emo4, setEmo4] = useState(false);
  const [emo5, setEmo5] = useState(false);
  const [c, setC] = useState(false);
  const [lang, setLang] = useState('');

  const {t, i18n} = useTranslation();

  const emptyChamp = () => {
    setImage(false);
    setSucessFeed(true);
    setMessage('');
  };
  const postFeedback = async () => {
    const id = await EncryptedStorage.getItem('id');

    console.log('this is imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', id);
    if (message != '') {
      try {
        await axios
          .post(`${BASE_URL}/feedback`, {
            message: message,
            emojie_reaction: emojie,
            photoOrVideo: image,
            UtilisateurId: id,
          })
          .then(() => {
            emptyChamp();
            ToastAndroid.show(
              'Votre feedback est envoyé avec succès',
              ToastAndroid.LONG,
            );
            navigation.navigate('ListCircuit');
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.show(
        "Veuillez ajouter votre message, avant d'envoyer l'avis!! Merci",
        ToastAndroid.LONG,
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
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        {/* <Text style={styles.panelTitle}>CHOISIR</Text> */}
        <Text style={[styles.panelSubtitle, {fontFamily: 'SegoeUI'}]}>
          Choisir une photo pour ton avis
        </Text>
      </View>
      <Pressable style={styles.panelButton} onPress={changeImageFromCamera}>
        <Text style={[styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          Ouvrir l'appareil photo
        </Text>
      </Pressable>
      <Pressable style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={[styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          Importer a partir de la galerie
        </Text>
      </Pressable>
      <Pressable
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={[styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          Annuler
        </Text>
      </Pressable>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = useRef();
  const fall = new Animated.Value(1);

  const addEmojieReact1 = () => {
    setEmojie(5);
    setEmo1(!emo1);
    setEmo2(false);
    setEmo3(false);
    setEmo4(false);
    setEmo5(false);
  };
  const addEmojieReact2 = () => {
    setEmojie(4);
    setEmo1(false);
    setEmo2(!emo2);
    setEmo3(false);
    setEmo4(false);
    setEmo5(false);
  };
  const addEmojieReact3 = () => {
    setEmojie(3);
    setEmo1(false);
    setEmo2(false);
    setEmo3(!emo3);
    setEmo4(false);
    setEmo5(false);
  };
  const addEmojieReact4 = () => {
    setEmojie(2);
    setEmo1(false);
    setEmo2(false);
    setEmo3(false);
    setEmo4(!emo4);
    setEmo5(false);
  };
  const addEmojieReact5 = () => {
    console.log(5);
    setEmojie(1);
    setEmo1(false);
    setEmo2(false);
    setEmo3(false);
    setEmo4(false);
    setEmo5(!emo5);
  };

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLang(res);
    });
    AsyncStorage.getItem('sound').then(res => {
      console.log(res);
      if (res === 'false') {
        setC(true);
      } else {
        setC(false);
      }
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View>
        <Pressable
          style={{marginStart: 20, marginTop: 20}}
          android_disableSound={c}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Components/icons/back.png')}
            style={{width: 24, height: 24}}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#474747',
            fontFamily: 'SegoeUI',
            alignSelf: 'center',
          }}>
          {t('satisfaction ?')}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 60,
          marginTop: 50,
          alignSelf: 'center',
        }}>
        <Pressable android_disableSound={c} onPress={addEmojieReact1}>
          {!emo1 ? (
            <Image
              style={{width: 40, height: 40, paddingRight: 10, marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/blackSmiley1.png')}
            />
          ) : (
            <Image
              style={{width: 40, height: 40, marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/smiley1.png')}
            />
          )}
        </Pressable>
        <Pressable android_disableSound={c} onPress={addEmojieReact2}>
          {!emo2 ? (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/blackSmiley2.png')}
            />
          ) : (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/smiley2.png')}
            />
          )}
        </Pressable>
        <Pressable android_disableSound={c} onPress={addEmojieReact3}>
          {!emo3 ? (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/blackSmiley3.png')}
            />
          ) : (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/smiley3.png')}
            />
          )}
        </Pressable>
        <Pressable android_disableSound={c} onPress={addEmojieReact4}>
          {!emo4 ? (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/blackSmiley4.png')}
            />
          ) : (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/smiley4.png')}
            />
          )}
        </Pressable>
        <Pressable android_disableSound={c} onPress={addEmojieReact5}>
          {!emo5 ? (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/blackSmiley5.png')}
            />
          ) : (
            <Image
              style={{marginRight: 7}}
              source={require('../../Components/Images/feedbackSmile/smiley5.png')}
            />
          )}
        </Pressable>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={value => setMessage(value)}
          value={message}
          multiline
          placeholder={t('likeMost')}
          placeholderTextColor="#474747"
        />
      </View>
      {/* {sucessFeed ? <Text>{t('succesMessage')}</Text> : null} */}
      {image ? (
        <Pressable
          style={styles.buttonAjou}
          android_disableSound={c}
          onPress={() => bs.current.snapTo(0)}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 2,
              marginStart: 10,
              // marginRight: 10,
            }}
            source={{uri: image}}
          />
          <Text
            style={{
              fontSize: 16,
              color: '#096A6B',
              fontFamily: 'SegoeUI',
              marginLeft: 10,
            }}>
            {t('photoSelection')}
          </Text>
          <Text
            onPress={() => setImage('')}
            style={{
              position: 'absolute',
              right: 20,
              fontSize: 14,
              fontFamily: 'SegoeUI',
              textDecorationLine: 'underline',
            }}>
            supprimer
          </Text>
        </Pressable>
      ) : (
        <View>
          <Pressable
            android_disableSound={c}
            onPress={() => bs.current.snapTo(0)}
            style={styles.buttonAjou}>
            <AntDesign
              style={{marginStart: 20, marginRight: 10}}
              name="picture"
              size={20}
              color="#504E4E"
            />
            <Text
              style={{
                fontSize: 16,
                color: '#474747',
                fontFamily: 'SegoeUI',
              }}>
              {t('sendPic')}
            </Text>
          </Pressable>
        </View>
      )}
      <Pressable
        style={[
          styles.panelButton,
          {
            width: Dimensions.get('screen').width * 0.8,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 10,
          },
        ]}
        onPress={() => {
          postFeedback();
        }}>
        <Text style={[styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          {t('send')}
        </Text>
      </Pressable>

      {/* <TouchableOpacity
        style={styles.buttonAutreCircuit}
        onPress={() => handlePress()}>
        <Text
          style={{color: '#E59138', fontWeight: 'bold', fontFamily: 'SegoeUI'}}>
          Questionnaire
        </Text>
        <IconChevron name="chevrons-right" size={30} color="#E59138" />
      </TouchableOpacity> */}
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}></Animated.View>
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 80,
    alignSelf: 'center',
    marginTop: 10,
    height: 160,
    paddingBottom: 50,
  },
  input: {
    height: 190,
    margin: 12,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 140,
  },
  buttonAjou: {
    width: Dimensions.get('window').width * 0.8,
    height: 51,
    borderColor: '#9E9E9E',
    borderWidth: 0.9,
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    height: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#E59138',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E59138',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  buttonAutreCircuit: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
});
