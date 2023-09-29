import React, { Component,useRef } from 'react'
import { Text, View,FlatList,Image,Dimensions,StyleSheet,Animated } from 'react-native'
import MaskedView from '@react-native-community/masked-view';
import { Rect,Svg,LinearGradient} from 'react-native-svg';
import SearchBar from '../../Components/SearchBar';
const AnimatedSvg=Animated.createAnimatedComponent(Svg);
const {width,height} = Dimensions.get('window');
const ITEM_LENGTH = width * 0.72;
const ITEM_HEIGTH = height*0.9;

const BACKDROP_HEIGTH = height * 0.65;
const BACKDROP_HEIGHT = height * 0.65;
const SPACING = 5;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const sercuits=[
    {id:0},
    {id:1,title:'CERCUIT ROMAIN',des:'Sur le versant oriental de la colline de l Odéon s étend actuellement un parc archéologique',img:'https://images.unsplash.com/photo-1607326957431-29d25d2b386f'},
    {id:2,title:'CERCUIT PUNIQUE',des:'Les deux ports puniques,le port de commerce rectangulaire et le port militaire circulaire..',img:'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7'},
    {id:3,title:'SERCUIT BIZANTIN',des:'Dans ce vaste complexe dont les vestiges sont encore conservés,mais peu compréhensibles...',img:'https://images.unsplash.com/photo-1627522460108-215683bdc9f6'},
    {id:4},
];
const Backdrop = ({ sercuits, scrollX }) => {
  return(
    <View style={{height:BACKDROP_HEIGHT,width,position:'absolute'}}>
      <FlatList 
      data={sercuits}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={false}
      contentContainerStyle={{width,height:BACKDROP_HEIGHT}}
      renderItem={({item,index})=>{
        const translateX=scrollX.interpolate({
          inputRange:[(index-2)*ITEM_SIZE,(index-1)*ITEM_SIZE],
          outputRange:[0,width]
        });
        return(
          <Animated.View removeClippedSubviews={false} 
          style={{position:'absolute',
          height:translateX,
          width,
          overflow:'hidden'}} >
            <Image 
            source={{uri:item.img}}
            style={{
              width,
              height:BACKDROP_HEIGHT,
              position:'absolute'
            }} 
            />
            </Animated.View>
        ); 
      }}
      />

    </View>
  )
  
};
const ListeCircuit = props => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return(
    <View style={{flex:1}}>
        <SearchBar />
      <Backdrop sercuits={sercuits} scrollX={scrollX} />
      <Animated.FlatList 
      data={sercuits}
      keyExtractor={(item) => item.id}
      horizontal
      bounces={false}
      renderToHardwareTextureAndroid
      snapToAlignment='start'
      contentContainerStyle={{ alignItems: 'center' }}
      snapToInterval={ITEM_SIZE}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      renderItem={({item,index})=>{
        if (!item.img) {
          return <View style={{ width: 90 }} />;
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
        <View style={{width:ITEM_SIZE,height:ITEM_HEIGTH,marginTop:200}}>
          <Animated.View style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}>
              <Image source={{uri:item.img}} style={{width: '100%',
              height: ITEM_SIZE * 1.2,
              resizeMode: 'cover',
              borderRadius: 24,
              margin: 0,
              marginBottom: 10,}}/>
            <Text>{item.title}</Text>
            <Text style={{ fontSize: 12 }} numberOfLines={3}>{item.des}</Text>
          </Animated.View>
        </View>)
      }} />
    </View>
  )
}
export default ListeCircuit;