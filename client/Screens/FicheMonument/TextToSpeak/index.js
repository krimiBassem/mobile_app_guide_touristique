import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

//Import react-native-vector-icons
import EntypoIcon from 'react-native-vector-icons/Entypo';

//Import react-native-tts
import tts from 'react-native-tts';

const index = ({description}) => {
  const [play, setPlay] = useState(false);

  //Text To Speak

  const handleFinish = () => {
    tts.stop();
  };

  const stopReadingText = bool => {
    tts.stop();
    setPlay(bool);
  };
  global.stopReading = stopReadingText;

  const handleVoice = async text => {
    tts.setDefaultVoice('com.apple.ttsbundle.siri_male_fr-FR_compact');
    await tts.getInitStatus().then(() => {
      tts.setDefaultLanguage('fr-FR');
      tts.speak(text, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    });
  };

  const playStopSpeak = text => {
    if (play) {
      setPlay(false);
      handleFinish();
    } else {
      handleVoice(text);
      setPlay(true);
    }
  };

  return (
    <TouchableOpacity
      style={{marginRight: 15}}
      onPress={() => playStopSpeak(description)}>
      <EntypoIcon
        name={play ? 'controller-stop' : 'controller-play'}
        size={40}
        color="#474747"
      />
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({});
