import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {Snackbar, Button} from '@react-native-material/core';
import contribution from './test.json';
// import ModalCircuitFinished from './ListMonument/Components/modalCircuitFinished';
/******************* IMPORT COMPONENTS *******************/
import TextToSpeak from './TextToSpeak';
import HeaderFicheMonument from './HeaderFicheMonument';
// import ContributionUser from './ContributionUser';
import PartageExperience from './PartageExperience/PartageExperience';
import IconChevron from 'react-native-vector-icons/Feather';
import ding from '../FicheMonument/MusicListen/adrev_for_a_3rd_party.mp3';
import EntypoIcon from 'react-native-vector-icons/Entypo';
/******************* ***************** *******************/

/******************* IMPORT PACKAGES *******************/
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
/******************* *************** *******************/
Sound.setCategory('Record');
/******************* BASE URL *******************/
import baseUrl from '../../assests/baseUrl';
import {data} from 'react-native-image-layout/__tests__/mocks/dataMock';
/******************* ******** *******************/

const FicheMonument = (
  {
    navigation,
    openFiche,
    firstNav,
    navigatePartage,
    UserId,
    navigateBack,
    closeModal,
  },
  props,
) => {
  // const {nomMonument} = route.params;
  // const {descriptionMonument} = route.params;

  // console.log(openFiche.Thematiques[0].MonumentThematique.MonumentId);
  // console.log(' order + Q', openFiche.orderMonument  , firstNav);
  // console.log('first nav props from openFiche', firstNav);
  // console.log('OPENFICHE ===> : ', openFiche.description_monument);
  // console.log('userId  ===> : ', UserId);
  // console.log('openFnavigation fiche', props.navigationFiche);
  // console.log('openFiche.MonumentId', openFiche.MonumentId);
  /********** State hook for storing data from monuments table **********/
  const [monumentId, setMonumentId] = useState('');
  const [nomMonument, setNomMonument] = useState('');
  const [show, setShow] = useState(true);
  console.log('show log', show);
  // const [nextPin, setNextPin] = useState(false);
  /**
   * @todo: State for images monument
   */
  /********** ************************************************ **********/
  const [images, setImages] = useState([]);
  const [imageGallery, setImageGallery] = useState([]);
  // const [contribution, setContribution] = useState([]);
  const fetchContribution = async () => {
    try {
      await axios
        .get(
          `https://apidourbya.herokuapp.com/api/v1/contributions/monument/${openFiche.MonumentId}`,
        )
        .then(res => {
          setContribution(res.data.data);
        });
    } catch (e) {
      console.log(e, 'Fetch contributions');
    }
  };

  const fetchMonument = async () => {
    try {
      let imageTable = [];
      await axios
        .get(
          `https://apidourbya.herokuapp.com/api/v1/contributions/monument/${openFiche.MonumentId}`,
        )
        .then(res => {
          setImageGallery(res.data.data.ImageMonuments);
          res.data.data.ImageMonuments.map(el =>
            imageTable.push(el.uri_image_monument),
          );
        });
      setImages(imageTable);
      // images.map(el => {
      //   imageTable.push(el.uri_image_monument);
      // });
      // console.log(imageTable);
    } catch (e) {
      console.log(e, 'Fetch monument');
    }
  };
  console.log('contributioooooooon', contribution[0].image_capture);
  useEffect(() => {
    fetchMonument();
    // fetchContribution();
  }, [openFiche.MonumentId]);

  const openUrl = async url => {
    if (url) {
      const isSuported = await Linking.canOpenURL(url);
      if (isSuported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`je ne sais pas comment ouvrir cette ${url}`);
      }
    } else {
      Alert.alert('Construction en cours');
    }
  };

  /********** Icon track audio **********/
  const items = [];
  for (let index = 0; index <= 5; index++) {
    items.push(
      <Image
        key={index}
        source={require('../../Components/Images/icones/track_audio.png')}
        style={{width: 35, height: 30, marginLeft: 5}}
      />,
    );
  }
  /********** **************** **********/

  /********** Fetching data from monuments table **********/
  // const fetchMonument = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}/monument/${stateIdMonument}`,
  //     );
  //     setNomMonument(response.data.data.nom_monument);
  //     setDescriptionMonument(response.data.data.description_monument);
  //   } catch (e) {
  //     console.log(e, 'problem api into searchbar');
  //   }
  // };

  /********** *********** VOIX OFF *********************** **********/
  const [audioVoixOff, setAudioVoixOff] = useState({});
  const [cant, setCant] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audiouri, setAudiouri] = useState(openFiche.enregistrement_audio);
  const stopVoiceOff = boolean => {
    audioVoixOff.pause();

    setPlaying(boolean);
  };
  // foo btn playpause
  global.stopVoiceOff = stopVoiceOff;

  const goWatchVideo = () => {
    navigatePartage('Video', {
      videoMonument: openFiche.uri_video,
      designation: openFiche.nom_monument,
      navigateBack: navigateBack,
    });
    stopVoiceOff(false);
  };
  useEffect(() => {
    // audio.setVolume(5);
    if (openFiche.enregistrement_audio) {
      const audio = new Sound(
        `${openFiche.enregistrement_audio}`,
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // if loaded successfully
          console.log('loaded successfully');
        },
      );
      setAudioVoixOff(audio);
    }
    // handleUri(firstUrl);
    // return () => {
    //   audioVoixOff.release();
    // };
  }, [openFiche.enregistrement_audio]);

  const MessageAlert = () => (
    <Snackbar
      message="Veuillez SVP réactiver le son depuis les paramètres du profile, Merci!"
      action={
        <Button
          variant="text"
          title="Fermer"
          color="#E59138"
          compact
          onPress={() => setShowAlertSound(false)}
        />
      }
      style={{width: Dimensions.get('window').width * 0.9, marginTop: 5}}
    />
  );
  const MessageAlertMultimedia = () => (
    <Snackbar
      message={`${messageAlertMultimedia}`}
      action={
        <Button
          variant="text"
          title="Fermer"
          color="#E59138"
          compact
          onPress={() => setShowAlertMultimedia(false)}
        />
      }
      style={{width: Dimensions.get('window').width * 0.9, marginTop: 5}}
    />
  );
  const [showAlertSound, setShowAlertSound] = useState(false);
  const [showAlertMultimedia, setShowAlertMultimedia] = useState(false);
  const [messageAlertMultimedia, setmessageAlertMultimedia] = useState('');
  const playPause = async () => {
    await AsyncStorage.getItem('sound').then(res => {
      if (res === 'false') {
        setCant(true);
        setShowAlertSound(true);
      } else {
        if (audioVoixOff.isPlaying()) {
          audioVoixOff.pause();
          setPlaying(false);
        } else {
          setPlaying(true);
          audioVoixOff.play(success => {
            console.log(' audioVoixOff changed :', audioVoixOff);
            if (success) {
              setPlaying(false);
              console.log('successfully finished playing');
            } else {
              setPlaying(false);
              console.log('playback failed due to audio decoding errors');
            }
          });
        }
      }
    });
  };
  /********** *********** VOIX OFF *********************** **********/
  const handleCircuitFinalized = async () => {
    try {
      await axios({
        url: `${baseUrl}/circuit`,
        method: 'post',
        data: {
          nom_circuit: openFiche.nomCircuit,
          UtilisateurId: UserId,
        },
      })
        .then(response => {
          console.log('Data was successfully sent!!', response);
        })
        .catch(err => console.log('erreur!!!!!!!', err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View>
        <HeaderFicheMonument
          images={images}
          imageGallery={imageGallery}
          navigatePartage={navigatePartage}
          nomMonument={openFiche.nom_monument}
        />
        <View style={{alignSelf: 'center', marginTop: 10}}>
          {openFiche ? (
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#474747',
                fontFamily: 'Segoe UI',
              }}>
              {openFiche.nom_monument}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#474747',
                fontFamily: 'Segoe UI',
              }}>
              Not found
            </Text>
          )}
        </View>

        <View>
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 30,
              marginLeft: 20,
              color: '#474747',
              fontFamily: 'SegoeUI',
            }}>
            Découvrez davantage le monument
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 25,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                openUrl(
                  'https://historiar.io/coming-soon/?fbclid=IwAR0xG1b8SP76nsRBPE2Y3WPc7nIiMdtuwiEgwUUp1Ms792XGwB6vlIyuxfI',
                )
              }
              underlayColor={'#fff'}>
              <Image
                source={require('../../Components/Images/icones/obj3d.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openUrl(openFiche.image_panoramique)}
              underlayColor={'#fff'}>
              <Image
                source={require('../../Components/Images/icones/visite360.png')}
                style={{width: 40, height: 40, marginLeft: 40, marginRight: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openFiche.nom_monument === 'Musée océanographique' ||
                openFiche.nom_monument === 'Mosquée Sidi Mostari'
                  ? setmessageAlertMultimedia(
                      "Actuellement cette video n'est pas encore disponible, alors vous pouvez participer via contribution ci-dessus, merci",
                    )
                  : goWatchVideo()
              }
              underlayColor={'#fff'}>
              <Image
                source={require('../../Components/Images/icones/video.png')}
                style={{width: 40, height: 45}}
              />
            </TouchableOpacity>
          </View>
          {showAlertMultimedia && <MessageAlertMultimedia />}
        </View>
      </View>
      <View>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontWeight: 'bold',
            color: '#474747',
            fontFamily: 'SegoeUI',
          }}>
          Ecoutez par ici
        </Text>
        <View
          style={{
            width: Dimensions.get('window').width * 0.85,
            alignSelf: 'center',
            // marginTop: 30,
            padding: 5,
            paddingLeft: 15,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 60,
            backgroundColor: '#ffffff',
            marginTop: 15,
          }}>
          {/* <TextToSpeak
            description={
              openFiche
                ? openFiche.description_monument
                : "Concernant ce monument, il n'y pas de description actuellement. Par contre vous pouvez partager votre contribution. Merci "
            }
          /> */}
          <TouchableOpacity onPress={playPause} underlayColor={'#ccd0d5'}>
            <EntypoIcon
              name={playing ? 'controller-stop' : 'controller-play'}
              size={40}
              color="#474747"
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginLeft: 15}}>{items}</View>
        </View>
        {/* {showAlertSound && <MessageAlert />} */}
        <View
          style={{
            width: Dimensions.get('window').width,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {openFiche ? (
            <Text
              numberOfLines={show ? 5 : undefined}
              style={{
                width: Dimensions.get('screen').width * 0.8,
                textAlign: 'justify',
                lineHeight: 30,
                marginLeft: 20,
                marginTop: 20,
                fontSize: 14,
                fontFamily: 'Segoe UI',
                fontWeight: '200',
                alignSelf: 'center',
                color: '#474747',
              }}>
              {openFiche.description_monument}
            </Text>
          ) : (
            <Text
              style={{
                textAlign: 'justify',
                color: '#474747',
                fontFamily: 'SegoeUI',
              }}>
              Not found
            </Text>
          )}
          <TouchableOpacity>
            {show ? (
              <Text
                onPress={() => {
                  setShow(!show);
                }}
                style={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 14,
                  alignSelf: 'flex-end',
                  marginEnd: 25,
                  fontFamily: 'SegoeUI',
                }}>
                Lire la suite
              </Text>
            ) : (
              <Text
                onPress={() => {
                  setShow(!show);
                }}
                style={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 14,
                  alignSelf: 'flex-end',
                  marginEnd: 25,
                  fontFamily: 'SegoeUI',
                }}>
                Moins
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 30,
          fontWeight: 'bold',
          color: '#474747',
          fontFamily: 'SegoeUI',
        }}>
        Partagez votre expérience
      </Text>

      {/* <ContributionUser MonumentId={openFiche.MonumentId} UserId={UserId} /> */}
      <PartageExperience />
      <Text
        onPress={() => {
          navigatePartage('Contribution', {
            navigateBack: navigateBack,
            MonumentId: openFiche.MonumentId,
            UserId: UserId,
            navigatePartage:navigatePartage,
          });
          stopVoiceOff(false);
        }}
        style={{
          color: '#E59138',
          textDecorationLine: 'underline',
          fontSize: 17,
          alignSelf: 'center',
          marginTop: 10,
          fontWeight: 'bold',
          textDecorationColor: '#E59138',
          textDecorationStyle: 'solid',
          fontFamily: 'SegoeUI',
        }}>
        Contribuez à l'enrichissement du contenu
      </Text>
      <View style={{paddingTop: 20}}>
       
      </View>
      {firstNav === 0 && openFiche.orderMonument === 10 && (
        <TouchableOpacity
          style={styles.buttonAutreCircuit}
          onPress={() => {
            handleCircuitFinalized();
            navigatePartage('ListAnimation', {
              nomCircuit: openFiche.nomCircuit,
            });
            closeModal();
          }}>
          <Text
            style={{
              color: '#E59138',
              fontWeight: 'bold',
              fontFamily: 'SegoeUI',
            }}>
            Autre Circuits
          </Text>
          <IconChevron name="chevrons-right" size={30} color="#E59138" />
        </TouchableOpacity>
      )}
      

    </ScrollView>
  );
};

export default FicheMonument;

const styles = StyleSheet.create({
  buttonAutreCircuit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'flex-end',
    // position: 'absolute',
    // right: 10,
    // bottom: 0,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#EFAE4D',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});