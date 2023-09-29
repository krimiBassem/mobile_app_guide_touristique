import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import slides from './slides';
// import Animated from 'react-native-reanimated';
import Paginator from './Paginator';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onbording = ({item, doneFunction}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width: width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width: width, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}> {item.title} </Text>
        <Text style={styles.description}> {item.description} </Text>
      </View>
      {item.status === 'done' && (
        <TouchableOpacity onPress={doneFunction}>
          <Text
            style={{
              marginBottom: 15,
              textDecorationLine: 'underline',
              textDecorationColor: '#474747',
              textDecorationStyle: 'solid',
              color: '#474747',
            }}>
            Continuer
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const NewDemo = ({navigation}) => {
  const [permi, setPermi] = useState('');
  //console.log("Permission",  PERMISSION )
  useEffect(() => {
    AsyncStorage.getItem('permisssion').then(res => {
      setPermi(res);
    });

    console.log('permiii;iiiiiiiiiiiii', permi);
  });

  const doneFunction = async () => {
    // EncryptedStorage.setItem('showdemovideo', 'false');
    await AsyncStorage.getItem('permisssion').then(res => {
      if (res === 'true') {
        // navigation.navigate('Circuit_GIZ');
        navigation.navigate('ListCircuit');
      } else {
        navigation.navigate('Autorisation');
      }
    });
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={slides}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Onbording item={item} doneFunction={doneFunction} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

export default NewDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#474747',
    textAlign: 'center',
    fontFamily: 'SegoeUI',
  },
  description: {
    fontWeight: '300',
    fontFamily: 'SegoeUI',
    color: '#2c2c2c',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
