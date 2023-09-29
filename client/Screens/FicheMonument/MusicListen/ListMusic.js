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
import React, {useState, useEffect} from 'react';
import PlayIcon from 'react-native-vector-icons/FontAwesome5';
var Sound = require('react-native-sound');
import Carthage from '../../FicheMonument/MusicListen/carthage.mp3';

Sound.setCategory('Playback');

var audio = new Sound(Carthage, Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully.
  console.log('success');
});

const TestModal = ({setVisibleMusic, visibleMusic}) => {
  const [calls, setCalls] = useState([
    {
      id: 1,
      name: 'Christopher Tin',
      status: 'War Elephant',
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    },
  ]);

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    // audio.setVolume(5);
    return () => {
      audio.release();
    };
  }, []);
  const playPause = () => {
    if (audio.isPlaying()) {
      audio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      audio.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        disabled={item.status === 'active' && true}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            width: Dimensions.get('window').width * 0.9,
            justifyContent: 'space-between',
            padding: 20,
            margin: 5,
          },
          item.status === 'active' && styles.playing,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 20,
            width: Dimensions.get('window').width * 0.7,
          }}>
          <View
            style={{
              backgroundColor: item.status === 'active' ? '#FFFFFF' : '#B8B8B8',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              width: 35,
              height: 35,
            }}>
            <Text
              style={{
                fontFamily: 'SegoeUI',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#474747',
              }}>
              {item.id}
            </Text>
          </View>
          <View style={{marginStart: 20}}>
            <Text
              style={{
                color: '#1E1E1E',
                fontFamily: 'SegoeUI',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: '#1E1E1E',
                fontFamily: 'SegoeUI',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {' '}
              {item.status}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={playPause}>
          <PlayIcon
            name={playing ? 'pause' : 'play'}
            size={20}
            color={'#000000'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1, backgroundColor: '#F6A63E'}}>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 20,
          }}>
          <Text
            style={{
              fontFamily: 'SegoeUI',
              fontSize: 22,
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}>
            Le titre du morceau
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI',
              fontSize: 22,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            Chanteur
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisibleMusic(false)}
          style={{position: 'absolute', top: 15, right: 20}}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#E59138',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 3, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            borderRadius: 75,
            width: 75,
            height: 75,
            backgroundColor: '#000000',
            position: 'absolute',
            top: -35,
            left: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PlayIcon name="play" size={30} color={'#FFFFFF'} />
        </View>
        <View style={{flex: 1, marginTop: 40, marginBottom: 30}}>
          <FlatList
            data={calls}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

export default TestModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    // backgroundColor: '#fff',
    // borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 35,
    height: 35,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#1E1E1E',
    fontSize: 14,
    width: 170,
    fontFamily: 'SegoeUI',
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: 'bold',
    color: '#1E1E1E',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: 'SegoeUI',
  },
  playing: {
    backgroundColor: '#F6A63E',
    borderRadius: 50,
  },
});
