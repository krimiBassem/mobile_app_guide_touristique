import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {useEffect, useState} from 'react';
import {AuthContext} from '../Authentication/context';

import {
  View,
  Image,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import FastImage from 'react-native-fast-image';
import IconChevron from 'react-native-vector-icons/Feather';
// import VideoPlayer from 'react-native-video-player';
import EncryptedStorage from 'react-native-encrypted-storage';
import VideoPlayer from 'react-native-video-controls';

//import {PERMISSION} from '../config/permission';

export default function Medo({navigation}) {
  // const {signIn} = useContext(AuthContext);

  const checkAuth = async () => {
    const result = await EncryptedStorage.getItem('token');
    // if (!result) {
    //   navigation.navigate('SignIn');
    // } else {
    //   signIn();
    // }
  };

  const [permi, setPermi] = useState('');
  //console.log("Permission",  PERMISSION )
  useEffect(() => {
    AsyncStorage.getItem('permisssion').then(res => {
      setPermi(res);
    });

    console.log('permiii;iiiiiiiiiiiii', permi);
  });

  const {colors} = useTheme();
  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView style={styles.wrapper}>
    //     <TouchableOpacity
    //       onPress={
    //         () => {
    //           AsyncStorage.getItem('permisssion').then(res => {
    //             if (res === 'true') {
    //               navigation.navigate('Circuit_GIZ');
    //             } else {
    //               navigation.navigate('Autorisation');
    //             }
    //           });
    //         }
    //         //  permi ? navigation.navigate('MapGIZ') :navigation.navigate('Autorisation')
    //       }>
    //       <Text style={styles.title}> DEMO </Text>
    //     </TouchableOpacity>
    //   </ScrollView>
    // </SafeAreaView>
    <Onboarding
      onDone={async () => {
        await AsyncStorage.getItem('permisssion').then(res => {
          if (res === 'true') {
            // navigation.navigate('Circuit_GIZ');
            navigation.navigate('ListCircuit');
          } else {
            navigation.navigate('Autorisation');
          }
        });
      }}
      bottomBarColor={'#E59138'}
      DotComponent={() => {
        return null;
      }}
      DoneButtonComponent={() => (
        <TouchableOpacity
          onPress={async () => {
            EncryptedStorage.setItem('showdemovideo', 'false');
            await AsyncStorage.getItem('permisssion').then(res => {
              if (res === 'true') {
                // navigation.navigate('Circuit_GIZ');
                navigation.navigate('ListCircuit');
              } else {
                navigation.navigate('Autorisation');
              }
            });
          }}
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
          <Text
            style={{
              marginRight: 10,
              fontFamily: 'SegoeUI',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}>
            Passer la demo
          </Text>
          <IconChevron name="chevrons-right" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      )}
      NextButtonComponent={() => <Text>Suivant</Text>}
      SkipButtonComponent={() => <Text>Passer</Text>}
      onSkip={async () => {
        await AsyncStorage.getItem('permisssion').then(res => {
          if (res === 'true') {
            // navigation.navigate('Circuit_GIZ');
            navigation.navigate('ListCircuit');
          } else {
            navigation.navigate('Autorisation');
          }
        });
      }}
      //   SkipButtonComponent={() => console.warn('skip button')}
      //   DoneButtonComponent={() => console.warn('done button')}
      pages={[
        {
          backgroundColor: '#E59138',
          image: (
            <View
              style={{
                //   backgroundColor: '#E59138',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * 0.3,
                alignSelf: 'center',
                borderRadius: 15,
                marginBottom: 20,
              }}>
              <VideoPlayer
                tapAnywhereToPause={true}
                // onBack={undefined}
                source={{
                  uri: 'https://res.cloudinary.com/dourdourdour/video/upload/v1666404298/demo_ha8lzv.mp4',
                }}
              />
              {/* <VideoPlayer
                fullScreenOnLongPress={true}
                fullscreenAutorotate={true}
                autoplay={true}
                pauseOnPress
                video={{
                  uri: 'https://res.cloudinary.com/devmycode/video/upload/v1663768080/Composition_demo_FINAL_1_1_tlyfug.mp4',
                }}
                videoWidth={493}
                videoHeight={Dimensions.get('window').width * 0.8}
                thumbnail={undefined}
                // style={{
                //   width: Dimensions.get('window').width,
                //   height: Dimensions.get('window').height,
                // }}
              /> */}
            </View>
          ),
          // title: "Faire un tour dans l'application",
          // subtitle: 'En cours de construction',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 60,
    height: 95,
    marginLeft: 150,
  },
  title: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    marginTop: 300,
  },
  btnNormal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#e59138',
    marginTop: 25,
    width: 200,
    height: 60,
  },
});
