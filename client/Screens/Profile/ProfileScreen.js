import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AlbumIcon from 'react-native-vector-icons/FontAwesome5';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../assests/baseUrl';
import ContentLoader from 'react-native-easy-content-loader';
import {login} from '../../../controllers/auth';
// import { useContext } from 'react';
// import { LangContext } from './langues/context';
export default function ProfileScreen({navigation}) {
  // const {changeLan} = useContext(LangContext);
  const [sons, setSons] = useState(true);

  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPrenomm, setUserPrenom] = useState('');
  const [userEmail, setEmail] = useState('');
  const [pseudoName, setPseudoName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState('');
  const [lang, setLang] = useState('');
  const [d, setD] = useState(10);

  const {t, i18n} = useTranslation();

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}`);
      // setCirctuit(response.data);
      setIsLoading(false);
      setUserName(response.data.data.nom_utilisateur);
      setEmail(response.data.data.email_utilisateur);
      setUserPrenom(response.data.data.prenom_utilisateur);
      if (response.data.data.pseudo !== null) {
        setPseudoName(response.data.data.pseudo);
      }
      if (response.data.data.photo_utilisateur !== null) {
        setImage(response.data.data.photo_utilisateur);
      } else {
        setImage('https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg');
      }
      console.log(response.data.data.nom_utilisateur);
    } catch (err) {
      console.error(err, 'API Problem');
    }
  };
  // const getUdser = async () => {
  // await  axios.get(`${BASE_URL}/api/v1/user/${id}`)

  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json);
  //       setUserName(json.data.nom_utilisateur);
  //       setEmail(json.data.email_utilisateur);
  //       if (json.data.photo_utilisateur !== null) {
  //         setImage(json.data.photo_utilisateur);
  //       } else {
  //         setImage('https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg');
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(
  //         'There has been a problem with your fetch operation: ' + error,
  //       );
  //     });
  // };
  const getData = async () => {
    try {
      const value = await EncryptedStorage.getItem('id');
      if (value !== null) {
        setId(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(id);
  // useEffect(()=>{
  //   AsyncStorage.getItem('sound').then((res)=>{
  //     console.log(res);
  //     if(res==='false'){
  //       setSons(true)
  //     }
  //     else {
  //       setSons(false)
  //     }
  //   })

  // })
  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      setLang(res);
    });
    if (lang === 'AR') {
      setD(0);
    }
    getUser();
    getData();
  }, [id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Pressable
          android_disableSound={sons}
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
        </Pressable>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#474747',
            fontFamily: 'SegoeUI',
            marginLeft: 15,
          }}>
          Profile
        </Text>
      </View>
      {isLoading ? (
        <View style={{padding: 20}}>
          <ContentLoader
            active={true}
            avatar
            pRows={1}

            // pHeight={[200]}
            // pWidth={[350]}
          />
        </View>
      ) : (
        <View style={Styles.image}>
          <Pressable android_disableSound={sons}>
            <Image
              style={{
                paddingLeft: 40,
                width: 100,
                height: 100,
                borderRadius: 400 / 2,
                marginRight: 30,
              }}
              source={{uri: image}}
            />
          </Pressable>
          <View
            style={{
              width: Dimensions.get('window').width * 0.5,
            }}>
            <Text
              numberOfLines={3}
              style={[Styles.header, {fontFamily: 'SegoeUI'}]}>
              {pseudoName
                ? pseudoName.toUpperCase()
                : [userName.toUpperCase() + ' ' + userPrenomm.toUpperCase()]}
            </Text>
            {/* <Text style={Styles.header}>{userEmail}</Text> */}
          </View>
        </View>
      )}

      <ScrollView
        style={{
          // flex:1,
          right: 10,
          paddingTop: 30,
          fontSize: 40,
          marginTop: 30,
          marginLeft: d,
          // marginBottom: 20,
          backgroundColor: '#FFFFFF',
          width: 500,
        }}>
        <View style={{marginLeft: 10}}>
          <Pressable
            android_disableSound={sons}
            style={{paddingBottom: 0, paddingLeft: 3}}
            onPress={() =>
              navigation.navigate('album', {id: id, imageProfile: image})
            }>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              <Image
                style={{marginRight: 20}}
                source={require('../../Components/Images/profile/album.png')}
              />
              {t('photos')}
            </Text>
          </Pressable>
        </View>
        <View style={Styles.greyLine}></View>
        <View style={{marginLeft: 10}}>
          <Pressable
            android_disableSound={sons}
            style={{paddingBottom: 0, paddingLeft: 3, marginTop: 10}}
            onPress={() =>
              navigation.navigate('settings', {setSons: setSons, id: id})
            }>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              <Image
                style={{marginRight: 20}}
                source={require('../../Components/Images/profile/sett.png')}
              />
              {t('params')}
            </Text>
          </Pressable>
        </View>
        <View style={Styles.greyLine}></View>
        <View style={{}}>
          <Pressable
            android_disableSound={sons}
            style={{paddingBottom: 15, paddingLeft: 10, bottom: -13}}
            onPress={() => navigation.navigate('aboutDourbia')}>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              <Image
                style={{marginRight: 20}}
                source={require('../../Components/Images/profile/about.png')}
              />
              {t('about')}
            </Text>
          </Pressable>
        </View>

        <View style={Styles.greyLine}></View>
        <View>
          <Pressable
            android_disableSound={sons}
            style={{paddingBottom: 15, paddingLeft: 14, bottom: -13}}
            onPress={() => navigation.navigate('feedback')}>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              <Image
                source={require('../../Components/Images/profile/feedb.png')}
              />

              {t('feedback')}
            </Text>
          </Pressable>
        </View>

        <View style={Styles.greyLine}></View>
        <View>
          <Pressable
            android_disableSound={sons}
            style={{paddingBottom: 15, paddingLeft: 15, bottom: -13}}>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              <Image
                source={require('../../Components/Images/profile/share.png')}
              />
              {t('share')}
            </Text>
          </Pressable>
        </View>

        <View style={Styles.greyLine}></View>
        <View>
          <Pressable
            android_disableSound={sons}
            onPress={() => {
              navigation.navigate('help');
            }}
            style={{paddingBottom: 15, paddingLeft: 15, bottom: -13}}>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              {/* <MaterialCommunityIcons
                    name="message-question-outline"
                    size={20}
                  /> */}

              <Image
                source={require('../../Components/Images/profile/help.png')}
              />

              {t('help')}
            </Text>
          </Pressable>
        </View>

        <View style={Styles.greyLine}></View>
        <View>
          <Pressable
            android_disableSound={sons}
            onPress={() => {
              navigation.navigate('visite', {
                UserId: id,
              });
            }}
            style={{paddingBottom: 15, paddingLeft: 15, bottom: -13}}>
            <Text style={[Styles.Text, {fontFamily: 'SegoeUI'}]}>
              {/* <MaterialCommunityIcons
                    name="message-question-outline"
                    size={20}
                  /> */}
              <Image
                source={require('../../Components/Images/profile/list_circuit.png')}
              />{' '}
              Circuits Visités
            </Text>
          </Pressable>
        </View>

        <View style={[Styles.greyLine1, {marginBottom: 25}]}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginTop: 15,
    color: '#474747',
    fontFamily: 'Segoe UI',
  },

  image: {
    width: 80,
    height: 80,
  },
  container: {
    paddingTop: 50,
  },
  user: {
    flexDirection: 'column',
    paddingLeft: 20,

    marginTop: 30,
  },
  image: {
    paddingLeft: 40,
    flexDirection: 'row',
    fontSize: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  xd: {
    paddingTop: 50,
    paddingLeft: 40,
  },
  Text: {
    fontSize: 20,
    marginRight: 30,
    marginBottom: 20,
    marginStart: 30,
    color: '#474747',
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
});
