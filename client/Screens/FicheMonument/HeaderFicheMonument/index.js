import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import axios from 'axios';
import baseUrl from '../../../assests/baseUrl';

/********** Data of images **********/
const images = [
  'https://www.voyage-tunisie.info/wp-content/uploads/2018/03/Dougga.jpg',
  'https://www.voyage-tunisie.info/wp-content/uploads/2018/03/Dougga.jpg',
  'https://www.voyage-tunisie.info/wp-content/uploads/2018/03/Dougga.jpg',
  'https://www.voyage-tunisie.info/wp-content/uploads/2018/03/Dougga.jpg',
];

/********** ************** **********/

const WIDTH = Dimensions.get('window').width - 20;
const HEIGHT = Dimensions.get('window').height;

const index = ({images, imageGallery, navigatePartage, nomMonument}) => {
  /********** State hook for active image **********/
  const [imageActive, setImageActive] = useState(0);

  /********** *************************** **********/

  const RenderDot = images.map((el, index) => (
    <Text
      key={index}
      style={imageActive == index ? styles.dotActive : styles.dot}>
      ●
    </Text>
  ));

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imageActive) {
        setImageActive(slide);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigatePartage('Gallery', {imageGallery, nomMonument})}>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal={true}
            style={styles.wrap}>
            {images.map((el, index) => (
              <Image
                key={index}
                resizeMode="stretch"
                style={styles.wrap}
                source={{uri: el}}
              />
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {images ? RenderDot : <ActivityIndicator animating={true} />}
          </View>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    borderRadius: 8,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
});
