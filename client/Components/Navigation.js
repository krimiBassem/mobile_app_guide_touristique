import React, {useMemo, useState, useEffect, useRef} from 'react';
import {Text, Dimensions, View, ActivityIndicator} from 'react-native';

//Navigation components
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CircuitPedestreScreen from '../Screens/CircuitPedestre/CircuitPedestre';
import CircuitVeloScreen from '../Screens/CircuitVelo/CircuitVelo';
// import { createAppContainer } from 'react-navigation';
import i18n from '../Screens/Profile/langues/i18n';
//Icons

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
//Import all screens
import MapNavigation from '../Components/MapNavigation/MapNavigation';
import FicheMonumentScreen from '../Screens/FicheMonument/FicheMonument';
import ListScreen from '../Screens/ListCircuit/ListScreen';
import ChatbotScreen from '../Screens/Chatbot/ChatbotScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import NotificationScreen from '../Screens/Notification/NotificationScreen';
import SettingsScreen from '../Screens/Profile/seetings';
import AccountScreen from '../Screens/Profile/account';
import LoginScreen from '../Screens/Authentication/LoginScreen/index';
import SignUpScreen from '../Screens/Authentication/SignUpScreen/index';
import {AuthContext} from '../Screens/Authentication/context';
import FeedBackScreen from '../Screens/Profile/feedBack';
import AboutDourbia from '../Screens/Profile/aboutDourbia';
import Help from '../Screens/Profile/help';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useTranslation} from 'react-i18next';
import IntroductionCircuitScreen from '../Screens/ListCircuit/IntroductionCircuitScreen';
import Loader from '../Screens/ActivityIndicator/Loader';

import HomeScreen from '../Screens/Home/HomeScreens';
import DemoScreen from '../Screens/Demo/Demo';
import AutorisationScreen from '../Screens/Autorisation/Autorisation';
import MapGIZScreen from '../Screens/CircuitGIZ/CircuitGIZ';
import ListCircuit from '../Screens/ListCircuit/ListScreen';
import IntroductionCircuit from '../Screens/ListCircuit/IntroductionCircuitScreen';
import CircuitPedestre from '../Screens/CircuitPedestre/CircuitPedestre';
import CircuitCyclable from '../Screens/CircuitVelo/CircuitVelo';
import PartageExperience from '../Screens/FicheMonument/PartageExperience/PartageExperience';

import {TourGuideProvider} from 'rn-tourguide';

import {io} from 'socket.io-client';

const fullScreenWidth = Dimensions.get('window').width;
export default Navigation = props => {
  const HomeStack = createNativeStackNavigator();
  const Stack = createNativeStackNavigator();

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="MapGIZ" component={MapGIZScreen} />
        <HomeStack.Screen
          name={choixCircuit}
          component={
            choixCircuit === 'Circuit Pedestre'
              ? CircuitPedestre
              : CircuitCyclable
          }
          options={{
            headerShown: false,
            tabBarVisible: false,
            tabBarButton: props => null,
          }}
        />
        {/* <HomeStack.Screen
          name="Pedestre"
          component={CircuitPedestre}
          options={{headerShown: true}}
        />
        <HomeStack.Screen
          name="Cyclable"
          component={CircuitCyclable}
          options={{headerShown: true}}
        /> */}

        <HomeStack.Screen
          name="Introduction"
          component={IntroductionCircuitScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="monument"
          component={FicheMonumentScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Partage"
          component={PartageExperience}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="listCircuit"
          component={ListScreen}
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
          name="Chatbot"
          component={ChatbotScreen}
          options={{headerShown: true}}
        />
      </ChatStack.Navigator>
    );
  };

  const GIZStack = createNativeStackNavigator();

  const GIZStackScreen = () => {
    return (
      <GIZStack.Navigator>
        <GIZStack.Screen
          name="MapGIZ"
          component={MapGIZScreen}
          options={{headerShown: true}}
        />
        <GIZStack.Screen
          name="Introduction"
          component={IntroductionCircuitScreen}
          options={{headerShown: false}}
        />
        <GIZStack.Screen
          // name={`${
          //   choixCircuit === 'Circuit Pedestre'
          // } ? 'Circuit Pedestre': 'Circuit Cyclable'`}
          name={choixCircuit === 'Circuit Cyclable' ? 'Cyclable' : 'Pedestre'}
          component={
            choixCircuit === 'Circuit Cyclable'
              ? CircuitCyclable
              : CircuitPedestre
          }
        />
      </GIZStack.Navigator>
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

  const [isLoggedin, setIsLoggedin] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [id, setId] = useState('');
  const [choixCircuit, setChoixCircuit] = useState('');

  const socket = useRef();
  useEffect(() => {
    if (isLoggedin) {
      socket.current = io('https://apidourbya.herokuapp.com/api/v1');
    }
    return () => {
      socket?.current?.disconnect();
      socket?.current?.off();
    };
  }, [isLoggedin]);

  useEffect(() => {
    console.log(id);
    // socket?.emit('addUser', id);
    socket?.current?.emit('addUser', id);
    console.log('add user');
  }, [socket, id]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = (await EncryptedStorage.getItem('choix')).toString();
        setChoixCircuit(result);
        const value = (await EncryptedStorage.getItem('id')).toString();
        if (value !== null) {
          setId(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    retrieveUserSession();
  });
  useEffect(() => {
    // AsyncStorage.getItem('sound').then((res)=>{
    //  setSound(res)
    //   })

    // getting language and set it
    AsyncStorage.getItem('lang').then(res => {
      i18n.changeLanguage(res).catch(err => console.log('this is error', err));
     
    });
  }, []);

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
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <TourGuideProvider {...{borderRadius: 16, androidStatusBarVisible: true}}>
        <NavigationContainer>
          {isLoggedin == null ? (
            <Stack.Navigator>
              <Stack.Screen name="loading" component={Loader} />
            </Stack.Navigator>
          ) : isLoggedin == false ? (
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
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
                name="MapGIZ"
                component={MapGIZScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="listCircuit"
                component={ListCircuit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Introduction"
                component={IntroductionCircuit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Pedestre"
                component={CircuitPedestre}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Cyclable"
                component={CircuitCyclable}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{headerShown: true}}
              />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              initialRouteName="GIZ"
              screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused, color, size, padding}) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                  } else if (route.name === 'Chat') {
                    iconName = focused
                      ? 'ios-chatbox-ellipses'
                      : 'ios-chatbox-ellipses-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                  } else if (route.name === 'Notification') {
                    iconName = focused
                      ? 'ios-notifications'
                      : 'ios-notifications-outline';
                  } else if (route.name === 'GIZ') {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                  }

                  return (
                    <Ionicons
                      name={iconName}
                      size={size}
                      color={color}
                      style={{paddingBottom: padding}}
                    />
                  );
                },
                tabBarActiveTintColor: '#E59138',
                tabBarInactiveTintColor: '#707070',
              })}>
              <Tab.Screen name="GIZ" component={GIZStackScreen} />
              <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                  headerShown: false,
                  tabBarVisible: false,
                  tabBarButton: props => null,
                }}
              />
              <Tab.Screen name="Chat" component={ChatStackScreen} />
              <Tab.Screen name="Profile" component={ProfileStackScreen} />
              <Tab.Screen
                name="Cyclable"
                component={CircuitCyclable}
                options={{
                  headerShown: false,
                  tabBarVisible: false,
                  tabBarButton: props => null,
                }}
              />
              <Tab.Screen
                name="Pedestre"
                component={CircuitPedestre}
                options={{
                  headerShown: false,
                  tabBarVisible: false,
                  tabBarButton: props => null,
                }}
              />

              <Tab.Screen
                name="Notification"
                // component={NotificationStackScreen}
                options={{tabBarBadge: 3}}
                children={() => <NotificationScreen socket={socket} />}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </TourGuideProvider>
    </AuthContext.Provider>
  );
};
