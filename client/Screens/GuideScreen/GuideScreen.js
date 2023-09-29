import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import CallIcon from 'react-native-vector-icons/FontAwesome5';
import call from 'react-native-phone-call';
import axios from 'axios';
import baseUrl from '../../assests/baseUrl';
import LoaderGuide from './LoaderGuide';

const GuideScreen = ({navigation}) => {
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const triggerCall = numero => {
    const args = {
      number: numero, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${baseUrl}/guides`).then(res => {
          setGuides(res.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.error(err, 'API Problem');
      }
    };
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginBottom: 20,
          //   backgroundColor: '#fff',
          //   borderBottomWidth: 0.5,
        }}>
        <View style={styles.row}>
          <Image
            source={{uri: 'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg'}}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item.nom_guide.toUpperCase()} {item.prenom_guide.toUpperCase()}
              </Text>
            </View>
            <View style={styles.end}>
              <Text numberOfLines={2} style={styles.time}>
                Spécialité : {item.specialite_guide}{' '}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => triggerCall(item.telephone_guide.toString())}
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            margin: 5,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: 'SegoeUI',
              fontSize: 14,
              color: '#0C3F3F',
              textDecorationLine: 'underline',
              textDecorationColor: '#000000',
              textDecorationStyle: 'solid',
              marginRight: 5,
            }}>
            Appeler
          </Text>
          <CallIcon name="arrow-right" size={10} color={'#000000'} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <LoaderGuide />
      ) : (
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: 10,
              marginTop: 15,
              marginStart: 10,
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
              Guide
            </Text>
          </View>
          <FlatList
            style={{marginTop: 20, padding: 15}}
            data={guides}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={renderItem}
          />
        </View>
      )}
    </>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',

    padding: 10,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
    fontFamily: 'SegoeUI',
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 30,
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    fontFamily: 'SegoeUI',
  },
  icon: {
    height: 28,
    width: 28,
  },
});
