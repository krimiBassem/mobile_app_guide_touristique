import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import baseUrl from '../../assests/baseUrl';
import circuit from './data.json';
const SearchScreen = ({navigation}) => {
  // const [circuit, setCircuit] = useState([]);
  const [circuitFiltred, setCircuitFiltred] = useState([]);
  const [cyclableMonument, setCyclableMonument] = useState([]);
  const [pedestreMonument, setPedestreMonument] = useState([]);

  const searchCircuit = text => {
    const circuit1 = circuit.slice(0, 2);
    const result = [{boolean: 'false'}];
    const monumentCyclable = [];
    const monumentPedestre = [];

    if (text.length >= 3) {
      circuit1.forEach((item, index) => {

        if (item.nom_thematique.toLowerCase().includes(text.toLowerCase())) {
          result.push({
            id:item.id,
            nom_thematique: item.nom_thematique,
            Monuments: item.Monuments,
            
           
          });
          console.log('hello circuit',result);
        } else {
          item.Monuments.forEach((el, i) => {

            if (item.nom_thematique === 'Circuit Cyclable') {
              if (el.nom_monument.toLowerCase().includes(text.toLowerCase())) {
              
                monumentCyclable.push({
                  nom_monument: el.nom_monument,
                  nom_thematique: item.nom_thematique,
                  id:item.id,
                  qr_code: el.qr_code,
                });
              }
            } else if (item.nom_thematique === 'Circuit Pedestre') {
              if (el.nom_monument.toLowerCase().includes(text.toLowerCase())) {
              
                monumentPedestre.push({
                  nom_monument: el.nom_monument,
                  nom_thematique: item.nom_thematique,
                  id:item.id,
                  qr_code: el.qr_code,
                });
              }
            }
          });
          if (monumentPedestre.length === 0) {
            setCircuitFiltred([]);
          } else {
            setCircuitFiltred([
              {boolean: 'true'},
              monumentCyclable,
              monumentPedestre,
            ]);
            return
          }

          ;
        }
        setCircuitFiltred(result);
      });
    } else {
      setCircuitFiltred([]);
    }
  };

  // useLayoutEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios.get(`${baseUrl}/thematiques`).then(res => {
  //       console.log('ressss',res);
  //         setCircuit([res.data[0], res.data[1]]);
  //       });
  //     } catch (err) {
  //       console.error(err, 'API Problem');
  //     }
  //   };
  //   fetchData();
  //   // console.log('filtreeeed',circuit);

  // }, []);

  console.log('filtred', circuitFiltred.slice(1));

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: Dimensions.get('window').width * 0.9,
          borderRadius: 35,
          height: 50,
          alignSelf: 'center',
          marginTop: 15,
        }}>
        <TextInput
          onChangeText={text => searchCircuit(text)}
          style={styles.input}
          placeholder={'Recherche ...'}
          placeholderTextColor={'#000000'}
          fontWeight="Regular"
        />
        <TouchableOpacity
          style={{position: 'absolute', top: '25%', right: '5%'}}>
          <SearchIcon
            name="search"
            size={20}
            color={'#000'}
            style={{
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{padding: 20, marginTop: 15, marginBottom: 15}}>
        <FlatList
          style={{alignSelf: 'center'}}
          contentContainerStyle={{alignItems: 'center'}}
          data={circuitFiltred.slice(1)}
          horizontal={false}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={(post, index) => {
            const item = post.item;
            return (
              <View>
                {circuitFiltred[0].boolean === 'false' ? (
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SegeoUI',
                        color: '#E88C30',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {item.nom_thematique}
                    </Text>
                    <FlatList
                      data={item.Monuments}
                      horizontal={false}
                      numColumns={2}
                      keyExtractor={el => {
                        return el.id;
                      }}
                      renderItem={el => {
                        const element = el.item;
                        return (
                          <TouchableOpacity
                            style={{
                              width: 150,
                              alignItems: 'center',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                            onPress={()=>{navigation.navigate('Introduction',{thematique:item.nom_thematique,id_thematique:item.id})}}
                            >
                            <ImageBackground
                              style={styles.backgroundImage}
                              imageStyle={styles.otherMonument}
                              source={{
                                uri: element.qr_code,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(46, 138, 138, 0.1)',
                                  borderRadius: 10,
                                  width: 150,
                                }}>
                                <Text style={styles.itemText}>
                                  {element.nom_monument.toUpperCase()}
                                </Text>
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : item[0].nom_thematique === 'Circuit Cyclable' ? (
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SegeoUI',
                        color: '#E88C30',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      Circuit Cyclable
                    </Text>
                    <FlatList
                      data={item}
                      horizontal={false}
                      numColumns={2}
                      keyExtractor={el => {
                        return el.id;
                      }}
                      renderItem={el => {
                        const element = el.item;
                        return (
                          <TouchableOpacity
                            style={{
                              width: 150,
                              alignItems: 'center',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                            onPress={()=>{navigation.navigate('Introduction',{thematique:element.nom_thematique,id_thematique:element.id})}}
                            >
                            <ImageBackground
                              style={styles.backgroundImage}
                              imageStyle={styles.otherMonument}
                              source={{
                                uri: element.qr_code,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(46, 138, 138, 0.1)',
                                  borderRadius: 10,
                                  width: 150,
                                }}>
                                <Text style={styles.itemText}>
                                  {element.nom_monument.toUpperCase()}
                                </Text>
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SegeoUI',
                        color: '#E88C30',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      Circuit Pedestre
                    </Text>
                    <FlatList
                      data={item}
                      horizontal={false}
                      numColumns={2}
                      keyExtractor={el => {
                        return el.id;
                      }}
                      renderItem={el => {
                        const element = el.item;
                        console.log('this is item ', item);
                        return (
                          <TouchableOpacity
                            style={{
                              width: 150,
                              alignItems: 'center',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                            onPress={()=>{navigation.navigate('Introduction',{thematique:element.nom_thematique,id_thematique:element.id})}}
                            >
                            <ImageBackground
                              style={styles.backgroundImage}
                              imageStyle={styles.otherMonument}
                              source={{
                                uri: element.qr_code,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'rgba(46, 138, 138, 0.1)',
                                  borderRadius: 10,
                                  width: 150,
                                }}>
                                <Text style={styles.itemText}>
                                  {element.nom_monument.toUpperCase()}
                                </Text>
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    // margin: 12,
    // borderWidth: 1,
    // borderColor: '#CCCCCC',
    padding: 10,
    borderRadius: 35,
    width: Dimensions.get('window').width * 0.9,
    // alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  backgroundImage: {
    // flex: 1,
    height: 80,
    // backgroundColor: 'black',
    margin: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  otherMonument: {
    borderRadius: 10,
  },
  itemText: {
    fontSize: 13,
    color: '#FFFFFF',
    // color: '#E59138',
    textAlign: 'justify',
    // lineHeight: 30,
    fontWeight: 'bold',
    // marginTop: 20,
  },
});
