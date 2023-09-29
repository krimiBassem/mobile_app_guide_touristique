import axios from 'axios';
import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import baseUrl from '../../assests/baseUrl';

export default ListAlbum = () => {
  const fetchMonument = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/e802743b-0f15-49f2-9f23-82e30eda4334`,
      );
      //   const counterPhotos = response.data.data.Albums.length;
      const resultAlbum = response.data.data.Albums;
      setData(resultAlbum);
    } catch (e) {
      console.log(e, 'problem api into gallery');
    }
  };
  useLayoutEffect(() => {
    fetchMonument();
  }, []);

  const [data, setData] = useState([]);
  const [idAlbum, setIdAlbum] = useState('');
  console.log(idAlbum);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={data}
        numColumns={2}
        horizontal={false}
        renderItem={({item, index}) => (
          <View
            style={{
              marginTop: 20,
              alignSelf: 'center',
              margin: 10,
            }}>
            <TouchableOpacity
              key={index}
              onPress={() => {
                setIdAlbum(item.id);
              }}>
              <Image
                source={{
                  uri: 'https://picsum.photos/200/300',
                }}
                style={{
                  width: Dimensions.get('window').width * 0.4,
                  height: Dimensions.get('window').width * 0.3,
                  borderRadius: 15,
                }}
              />
              <Text style={styles.text}>{item.titre_album}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    justifyContent: 'center',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
});
