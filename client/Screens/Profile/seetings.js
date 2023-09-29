import React, {useState, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  I18nManager,
  DevSettings,
  Dimensions,
  // Button,
} from 'react-native';
import {AuthContext} from '../Authentication/context';
import Loader from '../ActivityIndicator/Loader';
import {useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import EncryptedStorage from 'react-native-encrypted-storage';
import {useTranslation} from 'react-i18next';
import Navigation from '../../Components/Navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {LangContext} from './langues/context';
export default function Settings({navigation, route}) {
  const {signOut} = useContext(AuthContext);
  const {setSons} = route.params;
  const {id} = route.params;
  // const {controlSound } = useContext(AuthContext);
  const [lang, setLang] = useState('FR');
  const [not, setNot] = useState(true);
  const [son, setSon] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [c, setC] = useState(true);

  const {t, i18n} = useTranslation();

  const ControlSound = () => {
    if (son === false) {
      AsyncStorage.setItem('sound', 'true');
      setSon(true);
      setSons(false);
    } else {
      AsyncStorage.setItem('sound', 'false');
      setSon(false);
      setSons(true);
    }
  };

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)

      .then(() => {
        // if (value === 'AR') {
        //   I18nManager.forceRTL(i18n.language === 'AR');

        //    DevSettings.reload();
        //   AsyncStorage.setItem('lang', value);
        // }
        // if (value === 'FR' || value === 'EN') {
        // I18nManager.allowRTL(false);
        // I18nManager.forceRTL(false);
        // setC(false);
        // DevSettings.reload();

        AsyncStorage.setItem('lang', value);
        // }
      })
      .catch(err => console.log('this is error', err));
  };

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLang(res);
    });
    // const d =x()
    // AsyncStorage.getItem('sound').then(res => {
    //   if (res === 'false') {
    //     setC(true);
    //   }
    // });
    // console.log(' CCC', c);
    // if (lang === '') {
    //   AsyncStorage.setItem('lang', 'FR').then(res => {
    //     setLang(res);
    //   });
    // }
    // console.log(son);

    // AsyncStorage.getItem('sound').then(res => {
    //   console.log('this res', res);

    //   if (res === 'true') {
    //     setSon(true);
    //     AsyncStorage.setItem('sound', 'true');
    //     // setC(false)
    //   } else {
    //     AsyncStorage.setItem('sound', 'false');
    //     setSon(false);
    //     // setC(true)
    //   }
    // });

    console.log('this is language', lang);
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {showSettings ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: 15,
            }}>
            <Pressable
              android_disableSound={c}
              onPress={() => navigation.goBack()}>
              <AntDesign
                style={{marginLeft: 15}}
                name="arrowleft"
                size={30}
                color="black"
              />
            </Pressable>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: '#474747',
                fontFamily: 'SegoeUI',
                marginLeft: 25,
              }}>
              {t('param')}
            </Text>
          </View>
          <View style={{paddingTop: 100}}></View>
          <View style={Styles.options}>
            {/* <View style={Styles.greyLine}></View> */}

            {/* <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: Dimensions.get('window').width * 0.8,
                alignSelf: 'center',
                height: 75,
              }}>
              <Text
                style={{
                  color: '#474747',

                  fontSize: 20,
                  fontFamily: 'SegoeUI',
                }}>
                {t('notif')}
              </Text>
              <View>
                <Pressable
                  android_disableSound={c}
                  onPress={() => {
                    // setNot(!not);
                  }}>
                  {not ? (
                    <FontAwesome name="toggle-on" size={35} color={'#474747'} />
                  ) : (
                    <FontAwesome
                      name="toggle-off"
                      size={35}
                      color={'#474747'}
                    />
                  )}
                </Pressable>
              </View>
            </View> */}
            <View style={Styles.greyLine}></View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: Dimensions.get('window').width * 0.8,
                alignSelf: 'center',
                height: 75,
              }}>
              <Text
                style={{
                  color: '#474747',

                  fontSize: 20,
                  fontFamily: 'SegoeUI',
                }}>
                {t('son')}
              </Text>
              <View>
                <Pressable
                  android_disableSound={c}
                  onPress={() => {
                    setSon(!son);
                  }}>
                  {son ? (
                    <FontAwesome name="toggle-on" size={35} color={'#E59138'} />
                  ) : (
                    <FontAwesome
                      name="toggle-off"
                      size={35}
                      color={'#474747'}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            {/* <View style={Styles.greyLine}></View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: Dimensions.get('window').width * 0.8,
                alignSelf: 'center',
                height: 75,
              }}>
              <Text
                style={{
                  color: '#474747',

                  fontSize: 20,
                  fontFamily: 'SegoeUI',
                }}>
                {t('lang')}
              </Text>
              {lang === 'FR' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: -20,
                  }}>
                  <Pressable
                    android_disableSound={c}
                    onPress={() => {
                      changeLanguage('EN');
                    }}>
                    <AntDesign name="left" size={20} color={'black'} />
                  </Pressable>
                  <Text
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      fontWeight: 'bold',
                      height: 30,
                      // width: 35,
                      fontSize: 20,
                      color: '#474747',
                      fontFamily: 'SegoeUI',
                    }}>
                    {lang}
                  </Text>
                  <Pressable
                    android_disableSound={c}
                    onPress={() => {
                      changeLanguage('EN');
                    }}>
                    <AntDesign name="right" size={20} color={'black'} />
                  </Pressable>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: -20,
                  }}>
                  <Pressable
                    android_disableSound={c}
                    onPress={() => {
                      changeLanguage('FR');
                    }}>
                    <AntDesign name="left" size={20} color={'black'} />
                  </Pressable>
                  <Text
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      fontWeight: 'bold',
                      height: 30,
                      // width: 35,
                      fontSize: 20,
                      color: '#474747',
                      fontFamily: 'SegoeUI',
                    }}>
                    {lang}
                  </Text>
                  <Pressable
                    android_disableSound={c}
                    onPress={() => {
                      changeLanguage('FR');
                    }}>
                    <AntDesign name="right" size={20} color={'black'} />
                  </Pressable>
                </View>
              )}
            </View> */}
            <View style={Styles.greyLine}></View>
            <Pressable
              android_disableSound={c}
              onPress={() => navigation.navigate('account', {id: id})}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: Dimensions.get('window').width * 0.8,
                  alignSelf: 'center',
                  height: 75,
                }}>
                <Text
                  style={{
                    color: '#474747',

                    fontSize: 20,
                    fontFamily: 'SegoeUI',
                  }}>
                  {t('acc')}
                </Text>
                <View>
                  <Image
                    style={{height: 29, width: 27}}
                    source={require('../../Components/Images/settingsIcons/accountButton.png')}
                  />
                </View>
              </View>
            </Pressable>
            <View style={Styles.greyLine}></View>
            <Pressable
              android_disableSound={c}
              onPress={() => {
                navigation.navigate('SignIn');
                signOut();
                GoogleSignin.signOut();
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: Dimensions.get('window').width * 0.8,
                  alignSelf: 'center',
                  height: 75,
                }}>
                <Text
                  style={{
                    color: '#474747',

                    fontSize: 20,
                    fontFamily: 'SegoeUI',
                  }}>
                  {t('decon')}
                </Text>
                <View>
                  <Image
                    style={{height: 29, width: 27}}
                    source={require('../../Components/Images/settingsIcons/logOutButton.png')}
                  />
                </View>
              </View>
            </Pressable>

            <View style={Styles.greyLine2}></View>
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  icon: {
    left: 80,
  },
  option: {
    paddingTop: 5,
    color: '#474747',
    paddingLeft: 40,
    paddingBottom: 5,
    paddingRight: 19,
    fontSize: 20,
  },
  icons: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    border: 'solid',
    backgroundColor: '#EAEAEA',
  },
  options: {
    backgroundColor: '#FFFFFF',
  },
  greyLine: {
    height: 2,
    backgroundColor: '#DAD4D4',
    marginLeft: 40,
  },
  greyLine1: {
    height: 2,
    backgroundColor: '#DAD4D4',
  },
  greyLine2: {
    height: 2,
    backgroundColor: '#DAD4D4',
  },
});
