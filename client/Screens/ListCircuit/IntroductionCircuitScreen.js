import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBar from '../../Components/SearchBar';
import TextToSpeak from '../FicheMonument/TextToSpeak';
import EncryptedStorage from 'react-native-encrypted-storage';
import HeaderIntroduction from './HeaderIntroduction';
import VideoPlayer from 'react-native-video-player';
import MapViewCyclable from '../CircuitVelo/CircuitVelo';
import MapViewPedestre from '../CircuitPedestre/CircuitPedestre';
import PlayAudio from './PlayaAudio';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../../assests/baseUrl';

const cyclableImg = require('../../Components/Images/cyclable.png');
const pedestreImg = require('../../Components/Images/pedestre.png');
const fullCyclableImg = require('../../Components/Images/fullCyclable.png');
const fullPedestreImg = require('../../Components/Images/fullPedestre.png');

const IntroductionCircuit = ({route, navigation}) => {
  const [suite, setSuite] = useState(true);
  const {thematique, description, id_thematique, toutL_ObjetCircuit} =
    route.params;

  const [circuitGiz, setCircuitGIZ] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   setDisplayBtn(false);
  // }, []);

  global.thematique = thematique;

  const x = true;
  const checkAuth = async () => {
    const geo = await AsyncStorage.getItem('permisssion');
    const result = await EncryptedStorage.getItem('token');
    const stopReadingText = global.stopReadingText;
    // // console.log('this is geolocalisation', geo);
    stopReadingText();

    // saveToStorage();
    if (result) {
      if (geo === 'false') {
        await EncryptedStorage.setItem('displayAutorisation', 'true');

        navigation.navigate('Autorisation');
        if (thematique === 'Circuit Cyclable') {
          await EncryptedStorage.setItem('choix', 'Circuit Cyclable');
        } else {
          await EncryptedStorage.setItem('choix', 'Circuit Pedestre');
        }
      } else {
        if (result) {
          if (thematique === 'Circuit Cyclable') {
            navigation.navigate('Cyclable', {navigation4: navigation});
          } else {
            navigation.navigate('Pedestre', {navigation4: navigation});
          }
        } else {
          if (thematique === 'Circuit Cyclable') {
            await EncryptedStorage.setItem('choix', 'Circuit Cyclable');
            navigation.navigate('SignIn');
          } else {
            await EncryptedStorage.setItem('choix', 'Circuit Pedestre');
            navigation.navigate('SignIn');
          }
        }
      }
    } else {
      if (thematique === 'Circuit Cyclable') {
        await EncryptedStorage.setItem('choix', 'Circuit Cyclable');
        navigation.navigate('SignIn');
      } else {
        await EncryptedStorage.setItem('choix', 'Circuit Pedestre');
        navigation.navigate('SignIn');
      }
    }
  };

  useEffect(()=>{
    
  })
  return (
    <SafeAreaView
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#ffffff'}}>
      <ScrollView style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            {/* <AntDesign
              style={{marginLeft: 15, marginRight: 27}}
              name="arrowleft"
              size={30}
              color="black"
            /> */}
            <Image
              source={require('../../Components/icons/back.png')}
              style={{width: 24, height: 24, marginStart: 20}}
            />
          </Pressable>
          <Text
            style={{
              color: '#303030',
              fontSize: 22,
              fontFamily: 'SegoeUI',
              paddingLeft: 20,
            }}>
            Introduction Circuit
          </Text>
        </View>
        {/* <SearchBar
              circuitDetail={circuitDetail}
              monumentDetail={monumentDetail}
            /> */}
        <View
          style={{
            //   backgroundColor: '#E59138',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.3,
            alignSelf: 'center',
            borderRadius: 15,
            marginTop: 30,
          }}>
          {/* {thematique === 'Circuit Cyclable' ? (
              <MapViewCyclable />
            ) : (
              <MapViewPedestre />
            )} */}
          {/* <VideoPlayer
            pauseOnPress
            video={{
              uri: 'https://res.cloudinary.com/dourdourdour/video/upload/v1658185961/Dourbia/intro/intro_0_jhh9bu.mp4',
            }}
            videoWidth={493}
            videoHeight={Dimensions.get('window').width * 0.8}
            thumbnail={{
              uri: 'https://res.cloudinary.com/dourdourdour/image/upload/v1658187869/Dourbia/intro/carthage_collien_de_byrsa_vue_sur_le_port_df3id6.jpg',
            }}
          /> */}
          <Image
            source={
              thematique === 'Circuit Cyclable' ? cyclableImg : pedestreImg
            }
            style={{width: Dimensions.get('window').width, height: '100%'}}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{position: 'absolute', top: 10, right: 10}}>
            {/* <Image source={require('../../Components/icons/zoomin.png')} /> */}
            <MaterialIcons
              style={{marginLeft: 15}}
              name="zoom-out-map"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 50, marginStart: 15}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#474747',
              fontFamily: 'SegoeUI',
            }}>
            {thematique.toUpperCase()}
            {/* {'Circuit cyclable'.toUpperCase()} */}
          </Text>
          <Text style={{color: '#303030', fontSize: 17, fontFamily: 'SegoeUI'}}>
            Qu'est ce qu'on peut savoir?
          </Text>
        </View>
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
            description="La ville de Carthage est aujourd’hui perçue, comme étant une commune côtière, où, a priori, coexistent urbanisation pavillonnaire et îlots archéologiques isolés. Cependant, la capitale éponyme de l’empire Carthaginois fut le siège de plusieurs civilisations qui ont marqué l’histoire de la Méditerranée. Dourb’IA, vous propose dans ce parcours de découvrir Carthage en re-visitant des sites qui représentent des points culminants de l’histoire de la ville. Le parcours débute sur la colline de Byrsa, lieu mythique de la naissance et de la chute de Quart’Hadasht et se termine au musée océanographique, un bâtiment Art déco présentant un brin d’orientalisme. Dourb’IA vous guidera à découvrir Carthage à des époques différentes : l’empire Carthaginois, la domination romaine, et le protectorat français. Quart’Hadasht sera racontée en parcourant la colline de Byrsa, le quartier Magon, le port punique et l’espace sacré dit « Tophet ». Colonia Concordia Julia Carthago, la Carthage Romaine, sera racontée en visitant les Villas Romaines, les thermes d’Antonin et le théâtre Romain. Le palais Zarrouk sera le point d’arrêt où l’on découvrira la ville de Carthage à l’époque Beylicale. Le musée océanographique, quant à lui, est le point d’arrêt où l’on parlera brièvement des traces de l’époque du protectorat français dans la ville.La narration sera concise et brève. Pour une visite plus riche, vous êtes appelés à essayer les trois parcours thématiques que Dourb’IA vous propose.
                "
          /> */}
          <View style={{marginStart: 15, marginRight: 15}}>
            <PlayAudio />
          </View>
          <Image
            style={{marginRight: 10}}
            source={require('../../Components/icons/vocal.png')}
          />
          <Image
            style={{marginRight: 10}}
            source={require('../../Components/icons/vocal.png')}
          />
          <Image
            style={{marginRight: 10}}
            source={require('../../Components/icons/vocal.png')}
          />
          <Image
            style={{marginRight: 10}}
            source={require('../../Components/icons/vocal.png')}
          />
          <Image
            style={{marginRight: 10}}
            source={require('../../Components/icons/vocal.png')}
          />
          <Image source={require('../../Components/icons/vocal.png')} />
          <View style={{flexDirection: 'row', marginRight: 30}}></View>
        </View>
        <View style={{marginStart: 15, marginTop: 30}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'SegoeUI',
              fontWeight: 'bold',
              color: '#000000',
              textAlign: 'justify',
              lineHeight: 30,
            }}>
            Informations
          </Text>
          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SegoeUI',
                color: '#474747',
                textAlign: 'justify',
                lineHeight: 30,
              }}>
              Nombre de monuments : {toutL_ObjetCircuit?.nbr_etape}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SegoeUI',
                color: '#474747',
                textAlign: 'justify',
                lineHeight: 30,
                paddingRight: 10,
              }}>
              Durée de la visite : {toutL_ObjetCircuit?.duree} (exclut le temps
              de la visite)
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SegoeUI',
                color: '#474747',
                textAlign: 'justify',
                lineHeight: 30,
              }}>
              Kilométrage : {toutL_ObjetCircuit?.kilometrage}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SegoeUI',
                color: '#474747',
                textAlign: 'justify',
                lineHeight: 30,
              }}>
              Renseignements utiles: il s'agit d'un circuit sur la route urbaine
              sans compter le temps de la visite{' '}
            </Text>
          </View>
        </View>
        <View style={{marginBottom: '25%'}}>
          <Text
            numberOfLines={suite ? 5 : undefined}
            style={{
              width: Dimensions.get('window').width * 0.9,
              textAlign: 'justify',
              lineHeight: 30,
              marginLeft: 20,
              marginTop: 20,
              fontSize: 14,
              fontFamily: 'SegoeUI',
              fontWeight: '200',
              color: '#474747',
            }}>
            {description}
          </Text>
          <TouchableOpacity>
            {suite ? (
              <Text
                onPress={() => {
                  setSuite(!suite);
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
                  setSuite(!suite);
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {flexDirection: 'column', backgroundColor: 'red'},
              ]}>
              <View
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                  backgroundColor: '#EFEFEF',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'SegoeUI',
                    fontWeight: 'bold',
                  }}>
                  {thematique.toUpperCase()}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    source={require('../../Components/icons/zoomout.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 6,
                  width: Dimensions.get('window').width,
                  backgroundColor: 'black',
                }}>
                <Image
                  source={
                    thematique === 'Circuit Cyclable'
                      ? fullCyclableImg
                      : fullPedestreImg
                  }
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  }}
                />
                <View
                  style={{
                    backgroundColor: '#EFEFEF',
                    width: Dimensions.get('window').width * 0.5,
                    // height: Dimensions.get('window').height * 0.2,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    borderRadius: 5,
                    padding: 15,
                  }}>
                  <Text>Durée : {toutL_ObjetCircuit?.duree}</Text>
                  <Text>Distance : {toutL_ObjetCircuit?.kilometrage} </Text>
                  <Text>Monuments : {toutL_ObjetCircuit?.nbr_etape} </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View
        style={{
          //   backgroundColor: 'green',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}>
        <Pressable
          style={styles.panelButton}
          onPress={() => {
            checkAuth();
          }}>
          <Text style={styles.panelButtonTitle}>Démarrer la visite</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IntroductionCircuit;

const styles = StyleSheet.create({
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#E59138',
    alignItems: 'center',
    marginVertical: 2,
    width: Dimensions.get('screen').width * 0.85,
    alignSelf: 'center',
    height: 60,
    justifyContent: 'center',
  },
  panelButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'SegoeUI',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    // textAlign: 'center',
  },
});
