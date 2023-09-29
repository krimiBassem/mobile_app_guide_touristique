import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Medo from '../Demo/Medo'
import VideoPlayer from 'react-native-video-controls';

//Import components

const Help = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [lang, setLang] = useState('');
  const [c, setC] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLang(res);
    });
    AsyncStorage.getItem('sound').then(res => {
      console.log(res);
      if (res === 'false') {
        setC(true);
      } else {
        setC(false);
      }
    });
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          
        <Pressable android_disableSound={c} onPress={() => navigation.goBack()}>
          {lang === 'AR' ? (
            <AntDesign
              style={{marginLeft: 15}}
              name="arrowright"
              size={30}
              color="black"
            />
          ) : (
            <AntDesign
              style={{marginLeft: 15}}
              name="arrowleft"
              size={30}
              color="black"
            />
          )}
        </Pressable>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#474747',
            fontFamily: 'SegoeUI',
          }}>
          {t('help')}
        </Text>
      </View>
      <Text
          style={{
            paddingLeft: 30,
            paddingTop: 30,
            fontSize: 20,
            fontWeight: '600',
            color: '#096A6B',
            fontFamily: 'SegoeUI',
            textDecorationLine: 'underline',
          }}>
          {t('demo')}
        </Text>
      <View
              style={{
                //   backgroundColor: '#E59138',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * 0.4,
                alignSelf: 'center',
                borderRadius: 15,
                marginBottom: 20,
                paddingTop:20
              }}>
              <VideoPlayer
                tapAnywhereToPause={true}
                // onBack={undefined}
                source={{
                  uri: 'https://res.cloudinary.com/dourdourdour/video/upload/v1666404298/demo_ha8lzv.mp4',
                }}
              />
             
            </View>
      <Text
        style={{
          paddingLeft: 30,
          paddingTop: 20,
          fontSize: 20,
          fontWeight: '600',
          color: '#474747',
          fontFamily: 'SegoeUI',
        }}>
        {t('findresponse')}
      </Text>
      <View style={{marginLeft: 20, flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          placeholder={t('AskRes')}
          placeholderTextColor="#474747"
        />
        <View
          style={{
            width: 50,
            height: 40,
            borderWidth: 1,
            borderColor: '#096A6B',
            backgroundColor: '#096A6B',
            bottom: -12,
            left: -12,
            color: '#474747',
          }}></View>
        <AntDesign
          style={{left: -50, bottom: -19}}
          name="right"
          size={25}
          color="white"
        />
      </View>
      <Pressable android_disableSound={c} onPress={() => {}}>
        
      </Pressable>
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    width: 290,
    alignSelf: 'center',
    backgroundColor: '#EFEFEF',
  },
});

export default Help;
