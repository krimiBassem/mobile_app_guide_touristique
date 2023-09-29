import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager,
  LoginButton,
} from 'react-native-fbsdk-next';
import InstagramLogin from 'react-native-instagram-login';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
//native-base
import {Input, Stack, Center, NativeBaseProvider} from 'native-base';

//react-native-community/checkbox
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'react-native-bouncy-checkbox';

import FastImage from 'react-native-fast-image';

import axios from 'axios';

//react-native-victor-icons

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AuthContext} from '../context';
// import { json } from 'sequelize/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Snackbar, Button} from '@react-native-material/core';

const sponsorSection = require('../../../Components/Images/sponsors/new_sponsor.png');

// import AuthGlobal from '../../../Context/store/AuthGlobal';
// import {loginUser} from '../../../Context/actions/AuthActions';
// import Model from '../SignUpScreen/Model';
import BASE_URL from '../../../assests/baseUrl';
// import {check} from 'express-validator';

const Login = ({navigation, route}) => {
  // const {circuit} = route.params;
  const instagramLogin = useRef();
  const [securPass1, setSecurePass1] = useState(true);
  const {signIn, setChoise} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [tokenFromInstagram, setTokenFromInstagram] = useState('');
  const [checked, setchecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [doneCondtions, setDoneCondtions] = useState(false);
  const [chooseSocialMedia, setChooseSocialMedia] = useState('');
  const [messageAlert, setMessageAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const conditionGeneral = boolean => {
    setDoneCondtions(boolean);
  };

  const bs = useRef();
  const fall = new Animated.Value(1);
  useEffect(() => {
    setchecked(false);
  });

  //for auth google
  const [data, setData] = useState('');
  // console.log('data', data);

  const width = Dimensions.get('window').width;

  //-----------------checkbox state -------------------
  const [agree, setAgree] = useState(true);
  //------------------android toast ----------------
  const HandleAlert = () => (
    <Snackbar
      message={`${messageAlert}`}
      action={
        <Button
          variant="text"
          title="Fermer"
          color="#E59138"
          compact
          onPress={() => setShowAlert(false)}
        />
      }
      style={{width: Dimensions.get('window').width * 0.9, alignSelf: 'center'}}
    />
  );

  const handleCheckBox = () => {
    setAgree(!agree);
    console.log(agree);
  };

  const [show, setShow] = useState(null);
  // const RenderSuccess = () => {
  //   return <>{show && <TestModal />}</>;
  // };

  const loginUser = async () => {
    const permission = await AsyncStorage.getItem('permisssion');
    if (email != '' && password != '') {
      await axios
        .post(`${BASE_URL}/user/login`, {
          email_utilisateur: email,
          password_utilisateur: password,
        })
        .then(async res => {
          setShow(true);
          console.log('ress', res);
          if (res.data.message === "email hasn't verified") {
            setShowAlert(true);
            setMessageAlert(
              'Veuillez vérifier votre adresse électronique avant de vous identifier.',
            );
          } else {
            await EncryptedStorage.setItem('id', res.data.user.id);
            console.log('id', res.data.user.id);
            await EncryptedStorage.setItem('token', res.data.token);
            await EncryptedStorage.getItem('choix').then(res => {
              console.log('ressss', res);
              // ToastAndroid.show('Bienvenu', ToastAndroid.LONG);
              // <ActivityIndicator />;
              if (permission === 'false') {
                signIn();
              } else {
                if (res === 'Circuit Cyclable') {
                  setChoise('Cyclable');

                  signIn();
                } else if (res === 'Circuit Pedestre') {
                  setChoise('Pedestre');

                  signIn();
                }
              }
            });
          }
        })
        .catch(err => {
          console.log('err', err);
          setShow(false);
          setShowAlert(true);
          setMessageAlert('email et/ou mot de passe incorrect(s)');
        });
    }
    // }
  };

  const GoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId:
        '962362814023-um07e7eakuqb576bl2nn05vt54q0dfar.apps.googleusercontent.com',
      offlineAccess: true,
    });
    // '315470685061-fm65eti82a829sgusf9o27eofj03h7b1.apps.googleusercontent.com',
    // '315470685061-tldh007qo0abpvdil743i4uf219mtlo9.apps.googleusercontent.com',
    GoogleSignin.hasPlayServices()
      .then(async hasPlayService => {
        if (hasPlayService) {
          await GoogleSignin.signIn()
            .then(async userInfo => {
              // console.log(userInfo);
              if (userInfo) {
                // @TODO: Save in localStorage or DB
                await axios({
                  url: `${BASE_URL}/user/google`,
                  method: 'POST',
                  data: {
                    tokenId: userInfo.idToken,
                  },
                })
                  .then(async response => {
                    console.log(response);
                    // console.log(response.data.newUser.id);
                    await EncryptedStorage.setItem(
                      'id',
                      response.data.savedUser.id,
                    );
                    // console.log(response.data.token);
                    await EncryptedStorage.setItem(
                      'token',
                      response.data.token,
                    ).then(
                      EncryptedStorage.getItem('choix').then(res => {
                        console.log('ressss', res);
                        if (res === 'Circuit Cyclable') {
                          setChoise('Cyclable');
                          signIn();
                        } else if (res === 'Circuit Pedestre') {
                          setChoise('Pedestre');
                          signIn();
                        }
                      }),
                    );
                    console.log('Data was successfully sent!!');
                  })
                  .catch(err => console.log('erreur!!!!!!!', err));
              }
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(error => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.warn('user cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.warn('operation (e.g. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.warn('play services not available or outdated');
        } else {
          console.warn(error);
          // some other error happened
        }
      });
  };
  const facebookLogin = async () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' + JSON.stringify(result),
            AccessToken.getCurrentAccessToken().then(async token => {
              console.log(token.accessToken);
              const authToken = token.accessToken;
              await axios({
                url: `${BASE_URL}/user/facebook`,
                method: 'POST',
                data: {
                  authToken,
                },
              })
                .then(async response => {
                  // console.log(response.data.token);
                  // console.log(response.data.newUser.id);
                  const tokenForApp = response.data.token;
                  const idUserApp = response.data.savedUser.id;
                  await EncryptedStorage.setItem('id', idUserApp);
                  await EncryptedStorage.setItem('token', tokenForApp);
                  EncryptedStorage.getItem('choix').then(res => {
                    console.log('ressss', res);
                    if (res === 'Circuit Cyclable') {
                      setChoise('Cyclable');
                      signIn();
                    } else if (res === 'Circuit Pedestre') {
                      setChoise('Pedestre');
                      signIn();
                    }
                  });
                })
                .catch(err => console.log('erreur!!!!!!!', err));
            }),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  /**================ Instagram Login ================**/
  /**
   * Instagram App ID : 967287790649158
   * Instagram App Secret : 04632bb66768747b255b5a1b3b7ed5d2
   * redirectURL: 'https://github.com/'
   */

  const setInstagramToken = async data => {
    try {
      // console.log(data);
      // setTokenFromInstagram(data.access_token)
      await axios({
        url: `${BASE_URL}/user/insta`,
        method: 'POST',
        data: {
          authToken: data.access_token,
          userId: data.user_id,
        },
      })
        .then(async response => {
          // console.log(response.data.token);
          // console.log(response.data.newUser.id);
          const tokenForApp = response.data.token;
          const idUserApp = response.data.newUser.id;
          await EncryptedStorage.setItem('id', idUserApp);
          await EncryptedStorage.setItem('token', tokenForApp);
          EncryptedStorage.getItem('choix').then(res => {
            console.log('ressss', res);
            if (res === 'Circuit Cyclable') {
              setChoise('Cyclable');
              signIn();
            } else if (res === 'Circuit Pedestre') {
              setChoise('Pedestre');
              signIn();
            }
          });
        })
        .catch(err => console.log('erreur!!!!!!!', err));
    } catch (error) {
      console.log(error);
    }
  };

  const onClear = () => {
    console.log('clear token from EncryptedStorage');
  };

  /**================ Instagram Login ================**/

  return (
    <ScrollView style={styles.container}>
      {/* <View style={{width, height: 120, flex: 1}}>
        <Image
          source={sponsorSection}
          style={{width: width, height: '28%', alignItems: 'flex-start'}}
        />
      </View> */}

      {/* <Modal  visible={modal}>
        <View>
          <Model setCheck={setchecked} setModal={setModal} />
        </View>
      </Modal> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 5,
          marginTop: 15,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          {/* <AntDesign
            style={{marginLeft: 15, marginRight: 27}}
            name="arrowleft"
            size={30}
            color="black"
          /> */}
          <Image
            source={require('../../../Components/icons/back.png')}
            style={{width: 24, height: 24, marginStart: 20}}
          />
        </Pressable>
      </View>
      <View style={{alignSelf: 'center', flex: 2}}>
        <Text
          style={{
            marginBottom: 30,
            fontFamily: 'SegoeUI',
            color: '#000',
            fontSize: 24,
            marginTop: 20,
            fontWeight: 'bold',
          }}>
          Bienvenue
        </Text>
      </View>
      {showAlert && <HandleAlert />}
      <NativeBaseProvider>
        <Center flex={2} px="3">
          <Stack space={4} w="300px" maxW="500px">
            <Input
              variant="outline"
              placeholder="Adresse email"
              //   bg={'##f1f3f4'}
              onChangeText={value => setEmail(value.toLowerCase().trim())}
              value={email}
              backgroundColor={'#f1f3f4'}
              borderWidth={'1'}
              borderColor={'#f1f3f4'}
              borderRadius={'9'}
              placeholderTextColor={'#474747'}
              keyboardType="email-address"
            />
          </Stack>
          <Stack space={4} w="300px" maxW="500px" style={{marginTop: 20}}>
            <Input
              variant="outline"
              placeholder="Mot de passe"
              //   bg={'##f1f3f4'}
              onChangeText={value => setPassword(value)}
              value={password}
              backgroundColor={'#f1f3f4'}
              borderWidth={'1'}
              borderColor={'#f1f3f4'}
              borderRadius={'9'}
              secureTextEntry={securPass1}
              placeholderTextColor={'#474747'}
              InputRightElement={() => (
                <Pressable onPress={() => setSecurePass1(!securPass1)}>
                  <AntDesign name="eyeo" size={20} color="black" />
                </Pressable>
              )}
            />
          </Stack>
        </Center>
      </NativeBaseProvider>
      {/* <View style={{flex: 2}}>
        <TextInput
          style={styles.input}
          onChangeText={value => setEmail(value.toLowerCase().trim())}
          value={email}
          placeholder="Adresse email"
          placeholderTextColor={'#474747'}
          // fontWeight="Regular"
          keyboardType="email-address"
        />

        <View>
          <TextInput
            secureTextEntry={securPass1}
            style={styles.input}
            onChangeText={value => setPassword(value)}
            value={password}
            placeholder="Mot de passe"
            placeholderTextColor={'#474747'}
          />
          {securPass1 ? (
            <Pressable
              style={{position: 'absolute', top: 27, right: 60}}
              onPress={() => setSecurePass1(false)}
              android_disableSound={false}>
              <AntDesign name="eyeo" size={20} color="black" />
            </Pressable>
          ) : (
            <Pressable
              style={{position: 'absolute', top: 27, right: 60}}
              onPress={() => setSecurePass1(true)}
              android_disableSound={false}>
              <AntDesign name="eye" size={20} color="black" />
            </Pressable>
          )}
        </View>
      </View> */}
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <CheckBox
            disabled={true}
            value={checked}
            // value={toggleCheckBox}
            onValueChange={() => {}}
          />
        </TouchableOpacity>
        <Text style={{fontFamily: 'Segoe UI', fontSize: 12}}>
          {" J'accepte les "}
        </Text>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text
            style={{
              fontFamily: 'Segoe UI',
              fontSize: 12,
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            {'conditions'}
          </Text>
        </TouchableOpacity>
        <Text style={{fontFamily: 'Segoe UI', fontSize: 12}}>
          {" d'utilisations de cette application"}
        </Text>
      </View> */}

      {/* <View
        style={{
          width: Dimensions.get('screen').width * 0.5,
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: 30,
          flex: 3,
        }}>
        <Button
          title="Se connecter"
          onPress={loginUser}
          color="#E59138"
          accessibilityLabel="Learn more about this purple button"
        />
      </View> */}

      <Pressable
        style={styles.panelButton}
        onPress={() => {
          loginUser();
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 7000);
        }}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          {!show ? (
            <Text style={styles.panelButtonTitle}>Se Connecter</Text>
          ) : (
            <Text style={styles.panelButtonTitle}>En cours</Text>
          )}
          {show && (
            <FastImage
              style={{width: 25, height: 25, marginLeft: 20}}
              source={{
                uri: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
      </Pressable>
      <TouchableOpacity onPress={()=>{navigation.navigate('forgotPass')}}>
      <Text style={{paddingLeft:50,fontSize:15,fontWeight:'bold'}}>mot de passe oublié ?</Text>
      </TouchableOpacity>
      <View>
        {/* <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        /> */}
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          height: Dimensions.get('window').height * 0.3,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setChooseSocialMedia('google');
            setModalVisible(true);
          }}
          style={{
            width: Dimensions.get('window').width * 0.8,
            alignSelf: 'center',
            // marginTop: 30,
            padding: 5,
            paddingLeft: 15,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 60,
            backgroundColor: '#ffffff',
          }}>
          <Image
            style={{width: 31, height: 31, marginRight: 20, marginStart: 20}}
            source={require('../../../Components/icons/google.png')}
          />
          <View>
            <Text
              style={{fontSize: 16, fontFamily: 'SegoeUI', color: '#474747'}}>
              Continuer avec Google
            </Text>
          </View>
        </TouchableOpacity>
        {/* *********************************************************************** */}
        <TouchableOpacity
          onPress={() => {
            setChooseSocialMedia('facebook');
            setModalVisible(true);
          }}
          style={{
            width: Dimensions.get('window').width * 0.8,
            alignSelf: 'center',
            // marginTop: 30,
            padding: 5,
            paddingLeft: 15,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 60,
            backgroundColor: '#ffffff',
          }}>
          <Image
            style={{width: 31, height: 31, marginRight: 20, marginStart: 20}}
            source={require('../../../Components/icons/facebook.png')}
          />
          <View>
            <Text
              style={{fontSize: 16, fontFamily: 'SegoeUI', color: '#474747'}}>
              Continuer avec Facebook
            </Text>
          </View>
        </TouchableOpacity>
        {/* *********************************************************************** */}
        <TouchableOpacity
          onPress={() => {
            setChooseSocialMedia('instagram');
            setModalVisible(true);
          }}
          style={{
            width: Dimensions.get('window').width * 0.8,
            alignSelf: 'center',
            // marginTop: 30,
            padding: 5,
            paddingLeft: 15,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 60,
            backgroundColor: '#ffffff',
          }}>
          <Image
            style={{width: 31, height: 31, marginRight: 20, marginStart: 20}}
            source={require('../../../Components/icons/instagram.png')}
          />
          <View>
            <Text
              style={{fontSize: 16, fontFamily: 'SegoeUI', color: '#474747'}}>
              Continuer avec Instagram
            </Text>
          </View>
          <InstagramLogin
            ref={instagramLogin}
            appId="967287790649158"
            appSecret="04632bb66768747b255b5a1b3b7ed5d2"
            redirectUrl="https://github.com/"
            // incognito={false}
            scopes={['user_profile', 'user_media']}
            onLoginSuccess={setInstagramToken}
            onLoginFailure={data => console.log(data)}
            // language="fr" //default is 'en' for english
          />
        </TouchableOpacity>
        {/* *********************************************************************** */}
      </View>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'SegoeUI',
            fontSize: 15,
            color: '#474747',
          }}>
          Vous n'êtes pas un membre?
        </Text>
        <Text
          style={{
            color: '#E59138',
            textDecorationLine: 'underline',
            fontSize: 17,
            alignSelf: 'center',
            marginTop: 10,
            fontWeight: 'bold',
            textDecorationColor: '#E59138',
          }}
          onPress={() => navigation.navigate('SignUp')}>
          Créer un compte
        </Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {showAlert &&
            messageAlert ===
              "Veuillez accepter nos conditions d'utilisation." && (
              <HandleAlert />
            )}
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                position: 'absolute',
                right: 15,
                top: 10,
              }}>
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
            </Pressable>
            <Text style={styles.modalText}>
              En se connectant par les réseaux sociaux, vous acceptez nos
              Conditions Générales d'Utilisations.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Checkbox
                size={20}
                isChecked={doneCondtions}
                iconStyle={{borderColor: '#000000', borderRadius: 2}}
                innerIconStyle={{borderColor: '#000000', borderRadius: 2}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                unfillColor="white"
                fillColor="#E59138"
                // text="Custom Disabled Checkbox Example"
                onPress={value => setDoneCondtions(value)}
              />

              <Text
                style={{fontFamily: 'SegoeUI', fontSize: 16, color: '#474747'}}>
                Accepter les{' '}
                <Text
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Conditions', {
                      conditionGeneral,
                      setModalVisible,
                    });
                  }}
                  style={{
                    color: '#E59138',
                    textDecorationLine: 'underline',
                    textDecorationColor: '#E59138',
                    fontFamily: 'SegoeUI',
                    fontSize: 16,
                  }}>
                  conditions d'utilisations
                </Text>{' '}
                et continuer
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose, {marginTop: 15}]}
              onPress={() => {
                // setchecked(true);
                // setModalVisible(!modalVisible);
                // if (chooseSocialMedia) {
                //   facebookLogin();
                //   setModalVisible(!modalVisible);
                // } else if (googleRef) {
                //   GoogleSignIn();
                //   setModalVisible(!modalVisible);
                // } else if (instagramRef) {
                //   instagramLogin.current.show();
                //   setModalVisible(!modalVisible);
                // }
                if (doneCondtions) {
                  switch (chooseSocialMedia) {
                    case 'google':
                      GoogleSignIn();
                      setModalVisible(!modalVisible);
                      break;
                    case 'facebook':
                      facebookLogin();
                      setModalVisible(!modalVisible);
                      break;

                    case 'instagram':
                      instagramLogin.current.show();
                      setModalVisible(!modalVisible);
                    default:
                      break;
                  }
                } else {
                  setMessageAlert(
                    "Veuillez accepter nos conditions d'utilisation.",
                  );
                  setShowAlert(true);
                }
              }}>
              <Text style={styles.textStyle}>Continuer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: 250,
    alignItems: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#f1f3f4',
    padding: 10,
    borderRadius: 8,
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
    backgroundColor: '#f1f3f4',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    height: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#E59138',
    alignItems: 'center',
    marginVertical: 7,
    width: Dimensions.get('screen').width * 0.5,
    alignSelf: 'center',
    // flexDirection: 'row',
    marginTop: 20,
    height: 60,
    justifyContent: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E59138',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  //
  //
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(184,184,184,0.63)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.85,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#E59138',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    // textAlign: 'center',
    fontFamily: 'SegoeUI',
    fontSize: 16,
    color: '#474747',
  },
  modals: {
    // margin: 50,
    // backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.6,
    height: 60,
  },
});
