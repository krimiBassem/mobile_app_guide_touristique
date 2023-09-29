import React, {Component, useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  // Animated,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import {Rect, Svg, LinearGradient} from 'react-native-svg';
import SearchBar from '../../Components/SearchBar';
import axios from 'axios';
import baseUrl from '../../assests/baseUrl';
// const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const {width, height} = Dimensions.get('window');
const ITEM_LENGTH = width * 0.72;
const ITEM_HEIGTH = height * 0.9;

const BACKDROP_HEIGTH = height * 0.65;
const BACKDROP_HEIGHT = height * 0.65;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const circuits = [
  {id: 0},
  {
    id: 1,
    nom_thematique: 'CERCUIT ROMAIN',
    description_thematique:
      'Sur le versant oriental de la colline de l Odéon s étend actuellement un parc archéologique',
    img: 'https://res.cloudinary.com/dourdourdour/image/upload/v1654333940/Dourbia/Parc%20des%20thermes%20d%27Antonin/IMG_20220515_110751_g5zbr1.jpg',
  },
  {
    id: 2,
    nom_thematique: 'CERCUIT PUNIQUE',
    description_thematique:
      'Les deux ports puniques,le port de commerce rectangulaire et le port militaire circulaire..',
    img: 'https://res.cloudinary.com/dourdourdour/image/upload/v1653138579/Dourbia/Beit%20El%20Hikma/beit_el_hekma_3_dzfl3k.jpg',
  },
  {
    id: 3,
    nom_thematique: 'SERCUIT BIZANTIN',
    description_thematique:
      'Dans ce vaste complexe dont les vestiges sont encore conservés,mais peu compréhensibles...',
    img: 'https://res.cloudinary.com/dourdourdour/image/upload/v1653138621/Dourbia/Beit%20El%20Hikma/beit_el_hekma_4_tnnx58.jpg',
  },
  {id: 4},
];
const Backdrop = ({circuits, scrollX}) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={circuits}
        keyExtractor={item => item.id}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                height: translateX,
                width,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.img}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
const ListeCircuit = ({navigation, route}) => {
  const {nomCircuit} = route.params;
  const [thematique, setThematique] = useState([]);
  const fetchPhotos = async () => {
    try {
      await axios.get(`${baseUrl}/thematiques`).then(res => {
        let tab1 = [{id: 0}];
        let tab2 = [{id: 1}];
        const list = tab1.concat(res.data, tab2);
        console.log(list);
        setThematique(list);
      });
    } catch (e) {
      console.log(e, 'problem api into otherCircuits');
    }
  };
  useEffect(() => {
    fetchPhotos();
  }, []);

  const goToScreen = name => {
    name === 'Circuit Cyclable'
      ? navigation.navigate('Cyclable')
      : navigation.navigate('Pedestre');
  };

  // console.log(
  //   thematique.nom_thematique !== 'Circuit Cyclable' ||
  //     thematique.nom_thematique !== 'Circuit Pedestre',
  // );

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1}}>
      <SearchBar />
      <Backdrop circuits={thematique} scrollX={scrollX} />
      <Animated.FlatList
        data={thematique}
        keyExtractor={item => item.id}
        horizontal
        bounces={false}
        renderToHardwareTextureAndroid
        snapToAlignment="start"
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.img) {
            return <View style={{width: 60}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              onPress={() => goToScreen(item.nom_thematique)}
              disabled={
                item.nom_thematique === 'Circuit Cyclable' ||
                item.nom_thematique === 'Circuit Pedestre'
                  ? false
                  : true
              }
              style={{width: ITEM_SIZE, height: ITEM_HEIGTH, marginTop: 200}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{translateY}],
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}>
                <Image
                  source={{
                    uri: item.img,
                    // uri: 'https://res.cloudinary.com/dourdourdour/image/upload/v1653138579/Dourbia/Beit%20El%20Hikma/beit_el_hekma_3_dzfl3k.jpg',
                  }}
                  style={{
                    width: '100%',
                    height: ITEM_SIZE * 1.2,
                    resizeMode: 'cover',
                    borderRadius: 24,
                    margin: 0,
                    marginBottom: 10,
                  }}
                />
                <Text>{item.nom_thematique}</Text>
                {item.nom_thematique === 'Circuit Cyclable' ||
                item.nom_thematique === 'Circuit Pedestre' ? null : (
                  <Text style={{fontSize: 12}} numberOfLines={3}>
                    Comming Soon
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default ListeCircuit;
