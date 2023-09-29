import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicIcons from 'react-native-vector-icons/MaterialIcons';
import dings from './adrev_for_a_3rd_party.mp3';
let Sound = require('react-native-sound');

Sound.setCategory('Playback');

const audio = new Sound(
  'https://res.cloudinary.com/devmycode/video/upload/v1654865999/2-_Byrsa-short_version_h9mzwv.mp3',
  null,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    console.log(
      'duration in seconds: ' +
        audio.getDuration() +
        'number of channels: ' +
        audio.getNumberOfChannels(),
    );
  },
);
const Index = () => {
  const [cant, setCant] = useState(false);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    audio.setVolume(0);
    return () => {
      audio.release();
    };
  }, []);
  const playPause = () => {
    AsyncStorage.getItem('sound').then(res => {
      console.log(res);
      if (res === 'false') {
        setCant(true);
      } else {
        if (audio.isPlaying()) {
          audio.pause();
          setPlaying(true);
        } else {
          setPlaying(false);
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
      }
    });
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.playBtn}
        onPress={playPause}
        underlayColor={'#ccd0d5'}>
        <MusicIcons
          name={playing ? 'music-off' : 'music-note'}
          size={30}
          color={'#000000'}
        />
      </TouchableOpacity>

      {cant ? (
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#474747',
              fontFamily: 'Segoe UI',
              marginLeft: 25,
            }}>
            Cannot start music because you are not activate the sound in the
            profile settings
          </Text>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
});
export default Index;
