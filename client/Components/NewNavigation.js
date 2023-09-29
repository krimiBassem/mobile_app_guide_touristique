import React, {useMemo, useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image, StyleSheet, Text, View} from 'react-native';
import HomeScreen from '../Screens/Home/HomeScreens';
import DemoScreen from '../Screens/Demo/Demo';
import AutorisationScreen from '../Screens/Autorisation/Autorisation';
import Test2 from '../Screens/Authentication/LoginScreen/test2';
//import MapGIZScreen from '../Screens/CircuitGIZ/CircuitGIZ';
import ListCircuit from '../Screens/ListCircuit/ListScreen';
import IntroductionCircuit from '../Screens/ListCircuit/IntroductionCircuitScreen';
import LoginScreen from '../Screens/Authentication/LoginScreen/index';
import SignUpScreen from '../Screens/Authentication/SignUpScreen/index';
import ChatbotScreen from '../Screens/Chatbot/ChatbotScreen';
import NotificationScreen from '../Screens/Notification/NotificationScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SettingsScreen from '../Screens/Profile/seetings';
import AccountScreen from '../Screens/Profile/account';
import FeedBackScreen from '../Screens/Profile/feedBack';
import AboutDourbia from '../Screens/Profile/aboutDourbia';
import Help from '../Screens/Profile/help';
import Loader from '../Screens/ActivityIndicator/Loader';
import CircuitPedestre from '../Screens/CircuitPedestre/CircuitPedestre';
import CircuitCyclable from '../Screens/CircuitVelo/CircuitVelo';
import {AuthContext} from '../Screens/Authentication/context';
import FicheMonumentScreen from '../Screens/FicheMonument/FicheMonument';
import PartageExperienceScreen from '../Screens/FicheMonument/PartageExperience/PartageExperience';
import ContributionUserScreen from '../Screens/FicheMonument/ContributionUser/ContributionUser';
import VideoMonumentScreen from '../Screens/FicheMonument/VideoMonument/VideoMonument';
import ListCircuitAnimation from '../Screens/OtherCircuit/OtherCircuits';
import Circuit_Bizerte from '../Screens/CircuitBizerte/CircuitBizerte';
//import CircuitGIZ from '../Screens/Circuit5Juin/Circuit5Juin';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Model from '../Screens/Authentication/SignUpScreen/Model';
import GalleryImageMonumentScreen from '../Screens/FicheMonument/HeaderFicheMonument/GalleryForHeader';
import GuideScreen from '../Screens/GuideScreen/GuideScreen';
import passwordForgotten from '../Screens/Authentication/LoginScreen/passwordForgotten';
/******* */
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TourGuideProvider} from 'rn-tourguide';
import {TouchableOpacity, Button} from 'react-native';
import Album from '../Screens/Profile/Album';
// import {Button} from 'native-base';
import Shop from './MapDrawer/Shop';
import {io} from 'socket.io-client';
import CircuitGIZ from '../Screens/CircuitGIZ/CircuitGIZ';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';
import ListCircuitVisite from '../Screens/Profile/ListCircuitVisite';
import Test from '../Screens/Authentication/SignUpScreen/Test';
import PDFscreen from '../Screens/FicheMonument/pdf';
import ChangePass from '../Screens/Authentication/LoginScreen/changePass'
const Stack = createNativeStackNavigator();

/********** for tab bar */
export default function MapNavigation() {
  // const socket = useRef();

  // useEffect(() => {
  //   // if (isLoggedin) {
  //   //   console.log('firstttttttttttttttttttttt');
  //   // }
  //   socket.current = io('https://apidourbya.herokuapp.com');
  //   return () => {
  //     socket?.current?.disconnect();
  //     socket?.current?.off();
  //   };
  // }, [isLoggedin]);

  // useEffect(() => {
  //   console.log(id);
  //   // socket?.emit('addUser', id);
  //   socket?.current?.emit('addUser', id);
  //   console.log('add user');
  // }, [socket, id]);

  const HomeStack = createNativeStackNavigator();
  const HomeStackScreen1 = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Cyclable"
          component={CircuitCyclable}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Introduction"
          component={IntroductionCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Pedestre"
          component={CircuitPedestre}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="MapGIZ"
          component={CircuitGIZ}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListCircuit"
          component={ListCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="monument"
          component={FicheMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Gallery"
          component={GalleryImageMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Contribution"
          component={ContributionUserScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Pdf"
          component={PDFscreen}
          options={{headerShown: false}}
        />
       
        
        <HomeStack.Screen
          name="ListAnimation"
          component={ListCircuitAnimation}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Video"
          component={VideoMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Shop"
          component={Shop}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };
  const HomeStackScreen2 = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Pedestre"
          component={CircuitPedestre}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Introduction"
          component={IntroductionCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Shop"
          component={Shop}
          options={{headerShown: false}}
        />
       

        <HomeStack.Screen
          name="Cyclable"
          component={CircuitCyclable}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="MapGIZ"
          component={CircuitGIZ}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListCircuit"
          component={ListCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="monument"
          component={FicheMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Gallery"
          component={GalleryImageMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Contribution"
          component={ContributionUserScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Pdf"
          component={PDFscreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListAnimation"
          component={ListCircuitAnimation}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Video"
          component={VideoMonumentScreen}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };
  const HomeStackScreen3 = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="ListCircuit"
          component={ListCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Introduction"
          component={IntroductionCircuit}
          options={{headerShown: false}}
        />
       
        <HomeStack.Screen
          name="Cyclable"
          component={CircuitCyclable}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Pedestre"
          component={CircuitPedestre}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Shop"
          component={Shop}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="MapGIZ"
          component={CircuitGIZ}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Contribution"
          component={ContributionUserScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Pdf"
          component={PDFscreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="monument"
          component={FicheMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Gallery"
          component={GalleryImageMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListAnimation"
          component={ListCircuitAnimation}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Video"
          component={VideoMonumentScreen}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };
  const HomeStackScreen4 = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Circuit_GIZ"
          component={CircuitGIZ}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Introduction"
          component={IntroductionCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Pedestre"
          component={CircuitPedestre}
          options={{headerShown: false}}
        />

        <HomeStack.Screen
          name="Contribution"
          component={ContributionUserScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Video"
          component={VideoMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Shop"
          component={Shop}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListCircuit"
          component={ListCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="monument"
          component={FicheMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Gallery"
          component={GalleryImageMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListAnimation"
          component={ListCircuitAnimation}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };
  const HomeStackScreen5 = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Cyclable"
          component={CircuitCyclable}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Introduction"
          component={IntroductionCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Circuit_GIZ"
          component={CircuitGIZ}
          options={{headerShown: false}}
        />

        <HomeStack.Screen
          name="Contribution"
          component={ContributionUserScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Video"
          component={VideoMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Shop"
          component={Shop}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListCircuit"
          component={ListCircuit}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="monument"
          component={FicheMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Gallery"
          component={GalleryImageMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ListAnimation"
          component={ListCircuitAnimation}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };

  const ChatStack = createNativeStackNavigator();

  const ChatStackScreen = () => {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="guide"
          component={GuideScreen}
          options={{headerShown: false}}
        />
      </ChatStack.Navigator>
    );
  };

  const SeachStack = createNativeStackNavigator();

  const SeachStackScreen = () => {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="search"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </ChatStack.Navigator>
    );
  };

  const ProfileStack = createNativeStackNavigator();

  const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Mon Profil"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <ProfileStack.Screen
          name="settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />

        <ProfileStack.Screen
          name="account"
          component={AccountScreen}
          options={{headerShown: false}}
        />
        <ProfileStack.Screen
          name="feedback"
          component={FeedBackScreen}
          options={{headerShown: false}}
        />
        <ProfileStack.Screen
          name="aboutDourbia"
          component={AboutDourbia}
          options={{headerShown: false}}
        />
        <ProfileStack.Screen
          name="help"
          component={Help}
          options={{headerShown: false}}
        />
        <ProfileStack.Screen
          name="visite"
          component={ListCircuitVisite}
          options={{headerShown: false}}
        />
        <ProfileStack.Screen
          name="album"
          component={Album}
          options={{headerShown: false}}
        />
      </ProfileStack.Navigator>
    );
  };

  const NotificationStack = createNativeStackNavigator();

  const NotificationStackScreen = () => {
    return (
      <NotificationStack.Navigator>
        <NotificationStack.Screen
          name="Mes Notifications"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
      </NotificationStack.Navigator>
    );
  };

  const Tab = createBottomTabNavigator();

  /********** for tab bar */

  const [isLoggedin, setIsLoggedin] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [id, setId] = useState('');
  const [x, setX] = useState(false);

  const [choix, setChoix] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setChoix('');
    }, 4000);
    const getData = async () => {
      try {
        const value = await EncryptedStorage.getItem('id');
        console.log(value);
        if (value !== null) {
          setId(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    console.log('thissssssss isssssssss choixxxxxx', choix);
  }, []);

  useEffect(() => {
    retrieveUserSession();
    AsyncStorage.getItem('lang').then(res => {
      i18n.changeLanguage(res).catch(err => console.log('this is error', err));
    });
  });

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('token').then(res => {
        setUserToken(res);
      });
      if (userToken) {
        // Congrats! You've just retrieved your first value!
        console.log('done');
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  }
  async function removeUserSession() {
    try {
      const session = await EncryptedStorage.removeItem('token');
      retrieveUserSession();
    } catch (error) {
      // There was an error on the native side
      console.log(error);
    }
  }

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        retrieveUserSession();
      },
      signOut: () => {
        removeUserSession();
      },
      setChoise: value => {
        setChoix(value);
      },
    };
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <TourGuideProvider
        {...{
          borderRadius: 16,
          androidStatusBarVisible: true,
        }}>
        <NavigationContainer>
          {isLoggedin == null ? (
            <Stack.Navigator>
              <Stack.Screen
                name="loading"
                component={Loader}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : isLoggedin == false ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Test"
                component={Test}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Test2"
                component={Test2}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePass"
                component={ChangePass}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Demo"
                component={DemoScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Autorisation"
                component={AutorisationScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Circuit_GIZ"
                component={CircuitGIZ}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ListCircuit"
                component={ListCircuit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Introduction"
                component={IntroductionCircuit}
                options={{headerShown: false}}
              />
               <HomeStack.Screen
          name="forgotPass"
          component={passwordForgotten}
          options={{headerShown: false}}
        />
              <HomeStack.Screen
                name="Cyclable"
                component={CircuitCyclable}
                options={{headerShown: false}}
              />
              <HomeStack.Screen
                name="Pedestre"
                component={CircuitPedestre}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Conditions"
                component={Model}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({navigation, route}) => ({
                title: '',
                headerShown: false,
                tabBarIcon: ({focused, color, size, padding}) => {
                  var namm;
                  let iconName;
                  let name;
                  if (route.name === 'Home') {
                    iconName = focused
                      ? require('../Components/Images/tabBar/home1.png')
                      : require('../Components/Images/tabBar/home.png');
                    name = 'home';
                    namm = 'home';
                  } else if (route.name === 'Feedback') {
                    iconName = focused ? 'navigate-sharp' : 'navigate-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused
                      ? require('../Components/Images/tabBar/profile1.png')
                      : require('../Components/Images/tabBar/profile.png');
                    name = 'Profile';
                  } else if (route.name === 'guide') {
                    iconName = focused
                      ? require('../Components/Images/tabBar/guide1.png')
                      : require('../Components/Images/tabBar/guide.png');
                    name = 'guide';
                  } else if (route.name === 'Notification') {
                    iconName = focused
                      ? require('../Components/Images/tabBar/notification1.png')
                      : require('../Components/Images/tabBar/notification.png');
                    name = 'Notification';
                  } else if (route.name === 'GIZ') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                  } else if (route.name === 'search') {
                    iconName = focused
                      ? require('../Components/Images/tabBar/search1.png')
                      : require('../Components/Images/tabBar/search.png');
                    name = 'search';
                  }

                  return (
                    <View style={{alignItems: 'center'}}>
                      {namm === 'home' ? (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('ListCircuit');
                          }}>
                          <Image
                            source={iconName}
                            style={{
                              top: 13,
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          source={iconName}
                          style={{
                            // resizeMode: 'cover',
                            // height: 30,
                            // width: 30,
                            top: 12,
                          }}
                        />
                      )}
                      {color === '#E59138' ? (
                        <Text style={{color, paddingTop: 15}}>{name}</Text>
                      ) : null}
                    </View>
                  );
                },
                tabBarActiveTintColor: '#E59138',
                tabBarInactiveTintColor: '#707070',
              })}>
              <Tab.Screen
                name="Home"
                component={
                  choix === 'Cyclable'
                    ? HomeStackScreen1
                    : choix === 'Pedestre'
                    ? HomeStackScreen2
                    : HomeStackScreen3
                }
              />

              <Tab.Screen name="search" component={SeachStackScreen} />
              <Tab.Screen name="guide" component={ChatStackScreen} />
              {/* <Tab.Screen
                options={{tabBarBadge: global.nbrNotif}}
                name="Notification"
                // component={NotificationScreen}
                children={() => <NotificationScreen />}
              /> */}
              <Tab.Screen name="Profile" component={ProfileStackScreen} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </TourGuideProvider>
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});