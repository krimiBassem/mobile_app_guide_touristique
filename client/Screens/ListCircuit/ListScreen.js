import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//Import components
import {useTranslation} from 'react-i18next';
import PinCyclable from '../../Components/Pin/PinCyclable';
import PinPedestre from '../../Components/Pin/PinPedestre';
import ContentLoader from 'react-native-easy-content-loader';

import VideoPlayer from 'react-native-video-controls';
import IconChevron from 'react-native-vector-icons/Feather';

import baseUrl from '../../assests/baseUrl';
import axios from 'axios';
import {Button} from 'react-native-share';

const ListScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [circuit, setCirctuit] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const data = [
    {id: 1, name: 'circuit PUNIQUE'},
    {id: 2, name: 'circuit MUST SEE'},
    {id: 3, name: 'circuit BYZANTIN'},
  ];
  const {t, i18n} = useTranslation();

  const circuitDetail = (x, y) => {
    navigation.navigate('Introduction', {id_thematique: x, thematique: y});
  };
  // const circuitDetail = x => {
  //   navigation.navigate('circuit', {nomCircuit: x});

  // };
  const monumentDetail = x => {
    navigation.navigate('monument', {nomCircuit: x});
  };

  const fetchData = async () => {
    // console.log(circuit);
    try {
      const response = await axios.get(`${baseUrl}/thematiques`);
      // console.log(response);
      setCirctuit(response.data);
      setIsLoading(false);
      // setIsLoading(false)
    } catch (err) {
      console.error(err, 'API Problem');
    }
  };
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);
  // console.log(circuit);
  return (
    <SafeAreaView style={{flex: 1, marginTop: 20}}>
      <View style={{marginTop: 25}}>
        <Text
          style={{
            marginStart: 20,
            fontSize: 28,
            color: '#E59138',
            fontWeight: 'bold',
            fontFamily: 'SegoeUI',
          }}>
          {t('allons')}
        </Text>
        <Text
          style={{
            fontSize: 24,
            marginTop: 10,
            marginStart: 20,
            fontWeight: '800',
            color: '#474747',
            fontFamily: 'SegoeUI',
          }}>
          {t('commencer')}
        </Text>
      </View>
      {isLoading ? (
        <View style={{padding: 20}}>
          <ContentLoader
            active={true}
            pRows={2}
            pHeight={[200, 200, 100]}
            pWidth={[350, 350, 100]}
          />
        </View>
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={circuit}
          renderItem={({item}) => (
            <View style={{marginStart: 5, marginTop: 30, alignSelf: 'center'}}>
              {(item.nom_thematique === 'Circuit Cyclable' ||
                item.nom_thematique === 'Circuit Pedestre') && (
                <TouchableOpacity
                  disabled={item.categorie_thematique !== 'circuit GIZ' && true}
                  onPress={() => {
                    navigation.navigate('Introduction', {
                      thematique: item.nom_thematique,
                      description: item.description_thematique,
                      id_thematique: item.id,
                      toutL_ObjetCircuit: item,
                    });
                  }}
                  //   onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={{
                      uri: item.img,
                    }}
                    style={{
                      width: Dimensions.get('window').width * 0.9,
                      height: 200,
                      borderRadius: 7,
                    }}
                  />
                  <Text style={styles.text}>
                    {t(item.nom_thematique.toUpperCase())}
                  </Text>
                  {item.categorie_thematique !== 'circuit GIZ' && (
                    <Text style={{color: '#474747'}}>Comming Soon</Text>
                  )}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      navigation.navigate('Introduction', {
                        thematique: item.nom_thematique,
                        description: item.description_thematique,
                        id_thematique: item.id,
                        toutL_ObjetCircuit: item,
                      });
                    }}>
                    <View style={styles.centeredView}>
                      <VideoPlayer
                        tapAnywhereToPause={true}
                        onBack={() => setModalVisible(false)}
                        source={{
                          uri: 'https://www.youtube.com/watch?v=XXV6XZB5EY4',
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Introduction', {
                            thematique: item.nom_thematique,
                            description: item.description_thematique,
                            id_thematique: item.id,
                            toutL_ObjetCircuit: item,
                          });
                        }}
                        style={{
                          width: Dimensions.get('window').width,
                          backgroundColor: '#000000',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'SegoeUI',
                            fontSize: 18,
                            color: '#FFFFFF',
                          }}>
                          Passer la vidéo
                        </Text>
                        <IconChevron
                          style={{marginRight: 10}}
                          name="chevrons-right"
                          size={30}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
      {/* {circuit.map((el, index) => (
        <Text key={index}>{el.nom_thematique}</Text>
      ))} */}
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    color: '#474747',
    fontFamily: 'SegoeUI',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(184,184,184,0.63)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
