import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlayIcon from 'react-native-vector-icons/FontAwesome5';
import dings from '../FicheMonument/MusicListen/intro.mp3';
let Sound = require('react-native-sound');

Sound.setCategory('Playback');

var audio = new Sound(dings, Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully.
  console.log('success');
});

const Index = () => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    // audio.setVolume(5);
    return () => {
      audio.release();
    };
  }, []);

  const stopReadingText = () => {
    setPlaying(false);
    audio.pause();
  };

  global.stopReadingText = stopReadingText;

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

  return (
    <TouchableOpacity onPress={playPause}>
      <PlayIcon name={playing ? 'pause' : 'play'} size={20} color={'#000000'} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});
export default Index;
