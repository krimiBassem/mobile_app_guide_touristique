import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../../assests/baseUrl';
import ContentLoader from 'react-native-easy-content-loader';

const ListCircuitVisite = ({navigation, route}) => {
  const {UserId} = route.params;
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [done, setDone] = useState(false);

  const renderContent = ({item}) => (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: Dimensions.get('window').width * 0.9,
          marginStart: 25,
          //   alignSelf: 'center',
          //   justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: Dimensions.get('window').width * 0.6,
          }}>
          {done ? (
            <Image
              source={require('../../Components/icons/black_checklist.png')}
              style={{width: 22, height: 22}}
            />
          ) : (
            <Image
              source={require('../../Components/icons/checklist.png')}
              style={{width: 22, height: 22}}
            />
          )}
          <Text
            style={{
              color: '#000000',
              fontSize: 20,
              fontFamily: 'SegoeUI',
              paddingLeft: 20,
            }}>
            {item.nom_circuit}
          </Text>
        </View>
        <Text
          style={{
            color: item.done ? '#0C3F3F' : '#E88C30',
            fontSize: 18,
            fontFamily: 'SegoeUI',
          }}>
          {done ? 'Visité' : 'En cours ...'}
        </Text>
      </View>
      <View
        style={{
          borderColor: '#CCCCCC',
          borderBottomWidth: 1,
          width: Dimensions.get('window').width * 0.9,
          alignSelf: 'center',
          marginTop: 25,
          marginBottom: 25,
        }}
      />
    </>
  );

  // const handleOrder = () => {
  //   setList(trueFirst);
  // };

  // const handleDone = () => {
  //   setList(newList);
  // };

  // const trueFirst = list.sort((a, b) => Number(a.done) - Number(b.done));

  // const checkStorage = async () => {
  //   try {
  //     const myArray = await AsyncStorage.getItem('@MySuperStore:key');
  //     console.log(JSON.parse(myArray));
  //     // if (myArray !== null) {
  //     //   // We have data!!
  //     //   list.forEach(item => {
  //     //     if (item.thematique !== JSON.parse(myArray).thematique) {
  //     //       list.push(JSON.parse(myArray));
  //     //     }
  //     //   });
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(list);

  function pushItem(array, item) {
    if (
      !array.find(({id_thematique}) => id_thematique === item.id_thematique)
    ) {
      array.push(item);
    }
  }
  // const newList = list.map(item => {
  //   if (item.id === 2) {
  //     return {...item, done: true};
  //   }
  //   return item;
  // });

  const getDataFromCircuitTable = async () => {
    try {
      await axios.get(`${BASE_URL}/circuit/${UserId}`).then(res => {
        const newList = res.data.data.map(item => {
          return {...item, done: false};
        });
        setList(newList);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusProgress = async () => {
    try {
      await AsyncStorage.getItem('@forProgress').then(res => {
        if (res === 'done') {
          setDone(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromCircuitTable();
    getStatusProgress();
  }, []);

  console.log('thuis is the list of circuit', list);

  // console.log('final array', list);

  // console.log(global.thematiqueObject);

  const checkGlobal = () => {
    console.log('variable globale', global.thematiqueObject);
  };

  const idGenerator = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          marginStart: 20,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Components/icons/back.png')}
            style={{width: 24, height: 24}}
          />
        </Pressable>
        <Text
          style={{
            color: '#303030',
            fontSize: 22,
            fontFamily: 'SegoeUI',
            paddingLeft: 20,
          }}>
          Circuits visités
        </Text>
      </View>

      {isLoading ? (
        <View
          style={{padding: 20, alignItems: 'center', justifyContent: 'center'}}>
          <ContentLoader
            active={true}
            pRows={3}
            pHeight={[10, 10, 10]}
            // pWidth={[350]}
          />
        </View>
      ) : (
        <View style={{marginTop: 45}}>
          <FlatList
            data={list}
            keyExtractor={item => {
              return item?.id;
            }}
            renderItem={list ? renderContent : null}
          />
          {/* <Button onPress={handleDone} title="press" /> */}
          {/* <Button onPress={checkStorage} title="order boolean" /> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ListCircuitVisite;

const styles = StyleSheet.create({});
