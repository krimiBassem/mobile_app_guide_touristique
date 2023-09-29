import React, {useState, useEffect, useRef} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  DevSettings,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import BASE_URL from '../../assests/baseUrl';

export default function Account({navigation, route}) {
  const {id} = 'ilhjsdll:';

  const [securPass1, setSecurePass1] = useState(true);
  const [securPass2, setSecurePass2] = useState(true);
  const [image, setImage] = useState(null);
  const [changeName, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [changePassword, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [pseudo1, setPseudo1] = useState('');
  const [pes, setPes] = useState(null);
  const [updateName, setUpdateName] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updateFle1, setUpdateFle1] = useState(false);
  const [updateFle2, setUpdateFle2] = useState(false);
  const [updateFle3, setUpdateFle3] = useState(false);
  const [updateFle4, setUpdateFle4] = useState(false);

  const [localisation, setLocalisation] = useState();
  const [updateLocalisation, setUpdateLocalisation] = useState(false);
  const [a, setA] = useState(-50);
  const [lang, setLang] = useState('');
  const {t, i18n} = useTranslation();
  const [c, setC] = useState(false);

  const choosePhotoFromLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      const uri = image.path;
      const name = image.modificationDate;
      const type = image.mime;
      const source = {
        uri,
        name,
        type,
      };
      await handleUpload(source);
    } catch (err) {
      err => console.error(err);
    }
  };
  const changeImageFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      const uri = image.path;
      const name = image.modificationDate;
      const type = image.mime;
      const source = {
        uri,
        name,
        type,
      };
      await handleUpload(source);
    } catch (err) {
      err => console.error(err);
    }
  };
  const handleUpload = async photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'dourbina');
    data.append('cloud_name', 'dqoutfci8');
    await fetch('https://api.cloudinary.com/v1_1/dqoutfci8/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(async data => {
        await axios
          .put(`${BASE_URL}/user/${id}`, {photo_utilisateur: data.url})
          .then(() => {
            DevSettings.reload();
          });
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };
  renderInner = () => (
    <View style={Styles.panel}>
      <View style={{alignItems: 'center'}}>
        {/* <Text style={Styles.panelTitle}>CHOISIR</Text> */}
        <Text style={[Styles.panelSubtitle, {fontFamily: 'SegoeUI'}]}>
          Choisir votre photo de profil
        </Text>
      </View>
      <TouchableOpacity
        style={Styles.panelButton}
        onPress={changeImageFromCamera}>
        <Text style={[Styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          Ouvrir l'appareil photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={[Styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          Importer a partir de la galerie
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={[Styles.panelButtonTitle, {fontFamily: 'SegoeUI'}]}>
          Annuler
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={Styles.header}>
      <View style={Styles.panelHeader}>
        <View style={Styles.panelHandle} />
      </View>
    </View>
  );

  const bs = useRef();
  const fall = new Animated.Value(1);

  const getImage = async () => {
    await fetch(`${BASE_URL}/user/${id}`)
      .then(response => response.json())
      .then(json => {
        setPes(json.data.pseudo);
        console.log(json.data.photo_utilisateur);

        if (json.data.photo_utilisateur !== null) {
          setImage(json.data.photo_utilisateur);
        } else {
          setImage('https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg');
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error,
        );
      });
  };

  const changePass = async () => {
    if (changePassword != '') {
      await axios
        .put(`${BASE_URL}/user/updatePass/${id}`, {
          password_utilisateur: changePassword,
        })
        .then(() =>
          ToastAndroid.show(
            'Votre Password est changé avec succès',
            ToastAndroid.LONG,
          ),
        )

        .catch(err => console.log(err));
    }
  };
  const changeEmail = async () => {
    console.log(typeof email, typeof id);
    if (email != '') {
      await axios
        .put(`${BASE_URL}/email/verify/${id}`, {
          email_utilisateur: email,
          id: id,
        })
        .then(response => {
          ToastAndroid.show(response.data.message, ToastAndroid.LONG);
        })

        .catch(err => console.log(err));
    }
  };
  const changeNam = async () => {
    if (changeName != '') {
      await axios
        .put(`${BASE_URL}/user/${id}`, {
          nom_utilisateur: changeName,
          prenom_utilisateur: prenom,
          email_utilisateur: email,
        })
        .then(response => console.log(response.data))
        .then(res => {
          ToastAndroid.show(
            'Votre feedback est envoyé avec succès',
            ToastAndroid.LONG,
          );
        })
        .catch(err => console.log(err));
    }
  };
  const changePseudo = async () => {
    if (pseudo.length >= 3) {
      await axios
        .put(`${BASE_URL}/user/${id}`, {
          pseudo: pseudo,
        })
        .then(() => {
          ToastAndroid.show(
            'Votre pseudo est changé avec succès',
            ToastAndroid.LONG,
          );
        })

        .catch(err => {
          console.log(err);
          ToastAndroid.show(
            'Votre deux pseudo n"ont pas la meme valeur',
            ToastAndroid.LONG,
          );
        });
    } else {
      ToastAndroid.show('Remplire more than 3 caractére', ToastAndroid.LONG);
    }
  };

  const turnFleche1 = () => {
    if (a === -50) {
      setA(10);
      setUpdateFle1(true);
      setUpdateName(true);
      setUpdateFle3(false);
      setUpdateFle2(false);
      setUpdateFle4(false);
      setUpdateLocalisation(false);
    } else if (a === 10) {
      if (updatePass === true || updateEmail === true) {
        setUpdatePass(false);
        setUpdateEmail(false);
        setUpdateName(true);
        setUpdateFle1(true);
      } else {
        setUpdateName(false);
        setA(-50);
        setUpdateFle1(false);
      }
    }
    console.log(updateName);
  };
  const turnFleche2 = () => {
    if (a === -50) {
      setA(10);
      setUpdateFle2(true);
      setUpdateName(false);
      setUpdatePass(true);
      setUpdateFle3(false);
      setUpdateFle1(false);
      setUpdateFle4(false);
      setUpdateLocalisation(false);
    } else if (a === 10) {
      if (updateName === true || updateEmail === true) {
        setA(10);
        setUpdateFle2(true);
        // setUpdateFle1(false);
        setUpdatePass(true);
        setUpdateEmail(false);
        setUpdateName(false);
      } else {
        setA(-50);
        setUpdateFle2(false);
        setUpdatePass(false);
        setUpdateName(false);
      }
    }
  };
  const turnFleche3 = () => {
    if (a === 0) {
      setUpdateFle3(!updateFle3);
      setUpdateLocalisation(!updateLocalisation);
    } else {
      setA(0);
      setUpdateFle3(true);
      setUpdateLocalisation(!updateLocalisation);
      setUpdatePass(false);
      setUpdateName(false);
      setUpdateEmail(false);
      setUpdateFle2(false);
      setUpdateFle1(false);
      setUpdateFle4(false);
    }
  };
  const turnFleche4 = () => {
    if (a === -50) {
      setA(10);
      setUpdateFle4(true);
      setUpdateEmail(true);
      setUpdateFle3(false);
      setUpdateFle2(false);
      setUpdateFle1(false);
      setUpdateLocalisation(false);
    } else if (a === 10) {
      if (updateName === true || updatePass === true) {
        setUpdatePass(false);
        setUpdateEmail(true);
        setUpdateName(false);
        setUpdateFle4(true);
        setUpdateFle1(false);
        setUpdateFle2(false);
        setA(10);
      } else {
        setUpdateEmail(false);
        setA(-50);
        setUpdateFle4(false);
      }
    }
    console.log(updateName);
  };

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLang(res);
    });
    AsyncStorage.getItem('sound').then(res => {
      if (res === 'false') {
        setC(true);
      } else {
        setC(false);
      }
    });
    getImage();
    AsyncStorage.getItem('permisssion').then(res => {
      setLocalisation(res);
    });
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 15,
        }}>
        <TouchableOpacity
          android_disableSound={c}
          onPress={() => navigation.goBack()}>
          {lang === 'AR' ? (
            <AntDesign
              style={{marginLeft: 15}}
              name="arrowright"
              size={30}
              color="black"
            />
          ) : (
            <Image
              source={require('../../Components/icons/back.png')}
              style={{width: 24, height: 24, marginStart: 20}}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#474747',
            fontFamily: 'SegoeUI',
            marginLeft: 25,
          }}>
          {t('acc')}
        </Text>
      </View>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => bs.current.snapTo(0)}
        android_disableSound={c}>
        <Image
          style={{
            paddingLeft: 40,
            width: Dimensions.get('window').width * 0.35,
            height: Dimensions.get('window').width * 0.35,
            borderRadius: 400 / 2,
          }}
          source={{
            uri: image
              ? image
              : 'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg',
          }}
        />

        <Image
          style={{right: -80, top: -55}}
          source={require('../../Components/icons/cam.png')}
        />
        <Image
          style={{right: -99, top: -95}}
          source={require('../../Components/icons/backCam.png')}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center', left: -40}}>
        <Text
          style={{
            top: -50,
            paddingLeft: 80,
            fontSize: 20,
            fontFamily: 'SegoeUI',
          }}>
          {t('picChange')}
        </Text>
      </View>

      <View style={{bottom: a}}>
        <View style={{marginBottom: 10}}>
          <TouchableOpacity
            onPress={() => turnFleche1()}
            android_disableSound={c}>
            <Image
              style={{width: 450, marginBottom: -4}}
              source={require('../../Components/icons/nomPrenom.png')}
            />
            {!updateFle1 ? (
              <Image
                style={{position:'absolute',top: 20, right: 30}}
                source={require('../../Components/icons/upFle.png')}
              />
            ) : (
              <Image
                style={{position:'absolute',top: 20, right: 30}}
                source={require('../../Components/icons/downFle.png')}
              />
            )}
            <Text
              style={{
                marginTop: -29,
                fontSize: 20,
                color: 'white',
                top: -20,
                right: -45,
                fontFamily: 'SegoeUI',
              }}>
              {'Pseudoname'}
            </Text>
          </TouchableOpacity>
        </View>
        {updateName ? (
          <View>
            <TextInput
              placeholder={'type your pseudoname'}
              style={Styles.input}
              onChangeText={value => setPseudo(value)}
              placeholderTextColor={'#474747'}
            />

            {/* <TextInput
              placeholder={'retype your pseudoname'}
              style={Styles.input}
              onChangeText={value => setPseudo1(value)}
            /> */}

            {/* <Button
              title="presse me"
              color={'black'}
              onPress={() => {
                changeNam(changeName);
              }}
            /> */}
            <TouchableOpacity
              onPress={() => {
                changePseudo();
              }}
              android_disableSound={c}>
              <Text
                style={{
                  paddingLeft: 30,
                  paddingTop: 2,
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#096A6B',
                  fontFamily: 'SegoeUI',
                  textDecorationLine: 'underline',
                  marginLeft: 250,
                }}>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{marginBottom: 10}}>
          <TouchableOpacity
            onPress={() => turnFleche4()}
            android_disableSound={c}>
            <Image
              style={{width: 450, marginBottom: -4}}
              source={require('../../Components/icons/nomPrenom.png')}
            />
            {!updateFle4 ? (
              <Image
              style={{position:'absolute',top: 20, right: 30}}
              source={require('../../Components/icons/upFle.png')}
              />
            ) : (
              <Image
              style={{position:'absolute',top: 20, right: 30}}
              source={require('../../Components/icons/downFle.png')}
              />
            )}
            <Text
              style={{
                marginTop: -29,
                fontSize: 20,
                color: 'white',
                top: -20,
                right: -45,
                fontFamily: 'SegoeUI',
              }}>
              {'Email'}
            </Text>
          </TouchableOpacity>
        </View>
        {updateEmail ? (
          <View>
            <TextInput
              placeholder={'change email'}
              style={Styles.input}
              onChangeText={value => setEmail(value)}
              placeholderTextColor={'#474747'}
            />

            <TouchableOpacity
              onPress={() => {
                changeEmail();
              }}
              android_disableSound={c}>
              <Text
                style={{
                  paddingLeft: 30,
                  paddingTop: 2,
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#096A6B',
                  fontFamily: 'SegoeUI',
                  textDecorationLine: 'underline',
                  marginLeft: 250,
                }}>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() => turnFleche2()}
          android_disableSound={c}>
          <Image
            style={{width: 450, marginBottom: -4}}
            source={require('../../Components/icons/nomPrenom.png')}
          />
          {!updateFle4 ? (
            <Image
            style={{position:'absolute',top: 20, right: 30}}
            source={require('../../Components/icons/upFle.png')}
            />
          ) : (
            <Image
            style={{position:'absolute',top: 20, right: 30}}
            source={require('../../Components/icons/downFle.png')}
            />
          )}

          <Text
            style={{
              marginTop: -29,
              fontSize: 20,
              color: 'white',
              top: -20,
              right: -45,
              fontFamily: 'SegoeUI',
            }}>
            {t('changePass')}
          </Text>
          {updatePass ? (
            <View>
              <TextInput
                secureTextEntry={securPass1}
                placeholder={t('newPass')}
                style={Styles.input}
                onChangeText={value => setPass(value)}
                placeholderTextColor={'#474747'}
              />
              <View>
                {securPass1 ? (
                  <TouchableOpacity
                    onPress={() => setSecurePass1(false)}
                    android_disableSound={c}>
                    <AntDesign
                      style={{left: 295, bottom: 10, marginTop: -30}}
                      name="eyeo"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setSecurePass1(true)}
                    android_disableSound={c}>
                    <AntDesign
                      style={{left: 295, bottom: 10, marginTop: -30}}
                      name="eye"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                secureTextEntry={securPass2}
                placeholder={t('repeatPass')}
                style={Styles.input}
                onChangeText={value => setPass(value)}
                placeholderTextColor={'#474747'}
              />
              <View>
                {securPass2 ? (
                  <TouchableOpacity
                    style={{}}
                    onPress={() => setSecurePass2(false)}
                    android_disableSound={c}>
                    <AntDesign
                      style={{left: 295, bottom: 10, marginTop: -30}}
                      name="eyeo"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setSecurePass2(true)}
                    android_disableSound={c}>
                    <AntDesign
                      style={{left: 295, bottom: 10, marginTop: -30}}
                      name="eye"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* <Button
                title="presse me"
                color={'black'}
                onPress={() => {
                  changePass(changePassword);
                }}
              /> */}
              <TouchableOpacity
                android_disableSound={c}
                onPress={() => {
                  changePass();
                }}>
                <Text
                  style={{
                    paddingLeft: 30,
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#096A6B',
                    fontFamily: 'SegoeUI',
                    textDecorationLine: 'underline',
                    marginLeft: 250,
                  }}>
                  {t('save')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => turnFleche3()} android_disableSound={c}>
          <Image
            style={{width: 450, marginTop: 0}}
            source={require('../../Components/icons/nomPrenom.png')}
          />
          {!updateFle3 ? (
            <Image
              style={{top: -31, right: -380}}
              source={require('../../Components/icons/upFle.png')}
            />
          ) : (
            <Image
              style={{top: -31, right: -380}}
              source={require('../../Components/icons/downFle.png')}
            />
          )}
          <View>
            <Text
              style={{
                marginTop: -30,
                fontSize: 20,
                color: 'white',
                top: -20,
                right: -45,
              }}>
              {t('localisation')}
            </Text>
            <View> */}
        {/* {updateLocalisation ? (
                <View>
                  {localisation == 'true' ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{paddingTop: 20, paddingLeft: 50, fontSize: 20}}>
                        {t('loc')}
                      </Text>
                      <TouchableOpacity
                        android_disableSound={c}
                        onPress={() => {
                          setLocalisation(false);
                          AsyncStorage.setItem('permisssion', 'false');
                        }}>
                        <Text
                          style={{
                            paddingTop: 20,
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#096A6B',
                            fontFamily: 'Segoe UI',
                            textDecorationLine: 'underline',
                            marginLeft: 150,
                          }}>
                          {t('activer')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{paddingTop: 20, paddingLeft: 50, fontSize: 20}}>
                        {t('loc')}
                      </Text>
                      <TouchableOpacity
                        android_disableSound={c}
                        onPress={() => {
                          setLocalisation(false);
                          AsyncStorage.setItem('permisssion', 'true');
                        }}>
                        <Text
                          style={{
                            paddingTop: 20,
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#E83B3B',
                            fontFamily: 'Segoe UI',
                            textDecorationLine: 'underline',
                            marginLeft: 160,
                          }}>
                          {t('desactiver')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : null} */}
        {/* </View>
          </View>
        </TouchableOpacity> */}
      </View>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}></Animated.View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  image: {
    marginTop: 0,
    paddingLeft: 140,
    width: 120,
    height: 180,
    borderColor: '#000000',
    borderWidth: 1,
  },

  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: 200,
    marginLeft: 70,
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
});
