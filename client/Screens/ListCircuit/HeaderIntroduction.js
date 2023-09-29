import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import axios from 'axios';
import baseUrl from '../../assests/baseUrl';

/********** Data of images **********/
// const images = [
//   'https://res.cloudinary.com/devmycode/image/upload/v1655555871/kolna%20nemchiw%20bizert/introduction/Plan_Bizerte_1910_e0f1kv.jpg',
//   'https://res.cloudinary.com/devmycode/image/upload/v1655555915/kolna%20nemchiw%20bizert/introduction/310709PlanBizerteClaudeVERG_jww1or.jpg',
// ];

/********** ************** **********/

const WIDTH = Dimensions.get('window').width - 20;
const HEIGHT = Dimensions.get('window').height;

const index = ({id_thematique}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchThematique = async () => {
    try {
      let imageTable = [];
      await axios.get(`${baseUrl}/them_pic/${id_thematique}`).then(res => {
        console.log(res.data.data);
        // res.data.data.map(el => imageTable.push(el.uri_image_thematique));
        setImages(res.data.data);
        setLoading(false);
      });
      // images.map(el => {
      //   imageTable.push(el.uri_image_monument);
      // });
      // console.log(imageTable);
    } catch (e) {
      console.log(e, 'Fetch monument');
    }
  };

  useEffect(() => {
    fetchThematique();
  }, [id_thematique]);
  // console.log(id_thematique);
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
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
              <ScrollView
                onScroll={({nativeEvent}) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal={true}
                style={styles.wrap}>
                {images.map((el, index) => (
                  <View>
                    <Text>{el.legende}</Text>
                    <Image
                      key={index}
                      resizeMode="stretch"
                      style={styles.wrap}
                      source={{uri: el.uri_image_thematique}}
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={styles.wrapDot}>
                {images ? RenderDot : <ActivityIndicator animating={true} />}
              </View>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
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
