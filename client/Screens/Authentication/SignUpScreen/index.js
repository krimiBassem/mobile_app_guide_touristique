import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
//native-base
import {Input, Stack, Center, NativeBaseProvider} from 'native-base';
import axios from 'axios';
//react-native-community/checkbox
import Checkbox from 'react-native-bouncy-checkbox';
import Model from './Model';
import FastImage from 'react-native-fast-image';

//react-native-victor-icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import navigation from '../../../Components/Navigation'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Snackbar, Button} from '@react-native-material/core';

const WIDTH = Dimensions.get('screen').width - 20;
import BASE_URL from '../../../assests/baseUrl';

const SignUp = ({navigation}) => {
  const [userNom, setUserNom] = useState('');
  const [userPrenom, setUserPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setchecked] = useState(false);
  const [doneCondtions, setDoneCondtions] = useState(false);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const conditionGeneral = boolean => {
    setDoneCondtions(boolean);
  };

  const validateEmail = value => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 13) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validateUsername = value => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  };
  const validatePassword = value => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  };

  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [messageAlertSuccess, setMessageAlertSuccess] = useState(false);

  const MessageAlert = () => (
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
      style={{position: 'absolute', start: 16, end: 16, bottom: 16}}
    />
  );

  const SuccessfullySignup = () => (
    <Snackbar
      message="Nous avons envoyé un mail de vérification sur l'adresse indiquée"
      action={
        <Button
          variant="text"
          title="Fermer"
          color="#E59138"
          compact
          onPress={() => {
            setMessageAlertSuccess(false);
            navigation.navigate('SignIn');
          }}
        />
      }
      style={{position: 'absolute', start: 16, end: 16, bottom: 16}}
    />
  );

  const signUp = async () => {
    
  // navigation.navigate('Test')
    if (doneCondtions === false) {
      // ToastAndroid.show(
      //   "Veuillez accepter nos conditions d'utilisation",
      //   ToastAndroid.LONG,
      // );
      setMessageAlert("Veuillez accepter nos conditions d'utilisation");
      setShowAlert(true);
    } else {
      // console.log(email)

      if (email != '' && password != '' && userNom != '' && userPrenom != '') {
        await axios
          .post(`${BASE_URL}/user`, {
            nom_utilisateur: userNom,
            prenom_utilisateur: userPrenom,
            email_utilisateur: email,
            password_utilisateur: password,
          })
          .then(response => {
            console.log(response.data.message);
            if (
              response.data.message === "L'e-mail doit avoir un format correct."
            ) {
              // setShow(false);
              // ToastAndroid.show(
              //   "SVP l'email doit avoir un format correct",
              //   ToastAndroid.LONG,
              // );
              setMessageAlert("SVP l'email doit avoir un format correct");
              setShowAlert(true);
            } else if (response.data.message === 'Email already exist') {
              console.log('qlskjdghlsqkdjhsldqkjh');

              // setShow(false);
              // ToastAndroid.show("l'email existe déjà", ToastAndroid.LONG);
              setMessageAlert("l'utilisateur existe déjà");
              setShowAlert(true);
            } else {
              // setShow(true);
              // ToastAndroid.show(
              //   'Nous vous envoyons un email de verification',
              //   ToastAndroid.LONG,
              // );
              // setMessageAlertSuccess(true);
              navigation.navigate('Test',{id:response.data.message})
            }
          })

          .catch(function (error) {
            setShow(false);
            console.log(
              'There has been a problem with your fetch operation: ' + error,
            );
          });
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 5,
          marginTop: 20,
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
      <NativeBaseProvider>
        <Center flex={2} px="3">
          <Text
            style={{
              marginBottom: 40,
              fontFamily: 'SegoeUI',
              color: '#000',
              fontSize: 20,
            }}>
            Inscription de l'utilisateur
          </Text>
          <Stack space={4} w="300px" maxW="500px">
            <Input
              variant="outline"
              placeholder="Nom"
              //   bg={'##f1f3f4'}
              onChangeText={value => setUserNom(value)}
              value={userNom}
              backgroundColor={'#f1f3f4'}
              borderWidth={'1'}
              borderColor={'#f1f3f4'}
              borderRadius={'9'}
              placeholderTextColor={'#474747'}
            />
          </Stack>
          <Stack space={4} w="300px" maxW="500px" style={{marginTop: 20}}>
            <Input
              variant="outline"
              placeholder="Prénom"
              //   bg={'##f1f3f4'}
              onChangeText={value => setUserPrenom(value)}
              value={userPrenom}
              backgroundColor={'#f1f3f4'}
              borderWidth={'1'}
              borderColor={'#f1f3f4'}
              borderRadius={'9'}
              placeholderTextColor={'#474747'}
            />
          </Stack>

          <Stack space={4} w="300px" maxW="500px" style={{marginTop: 20}}>
            <Input
              variant="outline"
              placeholder="Adresse ou numéro de télèphone"
              //   bg={'##f1f3f4'}
              onChangeText={value => setEmail(value.toLowerCase())}
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
              secureTextEntry
              placeholderTextColor={'#474747'}
            />
          </Stack>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 25,
              width: Dimensions.get('window').width * 0.8,
            }}>
            <TouchableOpacity>
              {/* <CheckBox
              
                disabled={false}
                value={doneCondtions}
                // value={toggleCheckBox}
                onValueChange={value => setDoneCondtions(value)}
                style={{borderColor: '#B8B8B8', borderWidth: 1}}
              /> */}
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
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              style={{fontFamily: 'SegoeUI', fontSize: 12, color: '#474747'}}>
              J'accepte les{' '}
              <Text
                onPress={() =>
                  navigation.navigate('Conditions', {
                    conditionGeneral,
                    setModalVisible,
                    setDoneCondtions,
                  })
                }
                style={{
                  fontFamily: 'SegoeUI',
                  fontSize: 12,
                  color: '#E59138',
                  textDecorationLine: 'underline',
                }}>
                {"conditions d'utilisations"}
              </Text>{' '}
              de cette application
            </Text>
          </View>
          <Pressable
            style={styles.panelButton}
            onPress={() => {
              signUp();
              setShow(true);
              setTimeout(() => {
                setShow(false);
              }, 7000);
            }}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              {!show ? (
                <Text style={styles.panelButtonTitle}>S'inscrire</Text>
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
          {showAlert && <MessageAlert />}
          {messageAlertSuccess && <SuccessfullySignup />}
        </Center>
      </NativeBaseProvider>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  socialMedia: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
    width: 250,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#E59138',
    alignItems: 'center',
    marginVertical: 7,
    width: Dimensions.get('screen').width * 0.5,
    alignSelf: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});