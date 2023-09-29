import CircuitPedestre from './Screens/CircuitPedestre/CircuitPedestre';

import {StyleSheet, Text, View, LogBox} from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreAllLogs();
import React, {useEffect} from 'react';

/******************* IMPORT All SCREENS *******************/
// import Model from './Screens/Authentication/LoginScreen/Model';
import LoginScreen from './Screens/Authentication/LoginScreen';
import SignUpScreen from './Screens/Authentication/SignUpScreen';
import CircuitPunique from './Screens/MapPunique/CircuitPunique';
import CircuitRomaine from './Screens/MapRomaine/CircuitRomaine';
import CircuitByzantine from './Screens/MapByzantine/CircuitByzantine';
import CircuitGeneral from './Screens/CircuitGeneral/CircuitGeneral';
import CircuitVelo from './Screens/CircuitVelo/CircuitVelo';
import Autorisation from './Screens/Autorisation/Autorisation';
import TextToSpeak from './Screens/FicheMonument/TextToSpeak/index';
import FeedBack from './Screens/Profile/feedBack';
import ListScreen from './Screens/ListCircuit/ListScreen.js';
import IntroductionCircuitScreen from './Screens/ListCircuit/IntroductionCircuitScreen.js';
import Music from './Screens/FicheMonument/MusicListen';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import Qrcodescreen from './Screens/Qrcodescreen/Qrcodescreen';
import Account from './Screens/Profile/account';
/******************* ***************** *******************/
import Shop from './Components/MapDrawer/Shop';
/******************* IMPORT NAVIGATION STACK *******************/
import Navigation from './Components/Navigation.js';
import FicheNavigation from './Components/FicheNavigation';
/******************* *********************** *******************/

/******************* IMPORT PACKAGES *******************/
import {MenuProvider} from 'react-native-popup-menu';

import CircuitGIZ from './Screens/CircuitGIZ/CircuitGIZ';
import MapNavigation from './Components/MapNavigation/MapNavigation';

/******************* *************** *******************/

import {Settings} from 'react-native-fbsdk-next';
import Main from './Navigators/Main';
import {NavigationContainer} from '@react-navigation/native';
import ListCircuitThematiques from './Components/SearchBar/ListCircuitThematiques';
import FicheMonument from './Screens/FicheMonument/FicheMonument';
import MapDrawer from './Components/MapDrawer/MapDrawer';
import Album from './Screens/Profile/Album';
import ListAlbum from './Screens/Profile/ListAlbum';
import TourGuide from './Screens/TourGuide';
import NotificationScreen from './Screens/Notification/NotificationScreen';
import PartageExperience from './Screens/FicheMonument/PartageExperience/PartageExperience';
import NewNavigation from './Components/NewNavigation';
import Circuit5Juin from './Screens/Circuit5Juin/Circuit5Juin';
import CircuitKolnaNemchiw from './Screens/CircuitKolnaNemchiw/CircuitKolnaNemchiw';
import OtherCircuit from './Screens/OtherCircuit/OtherCircuits';
import TakePhoto from './Screens/FicheMonument/PickPhotos';
import HomeScreen from './Screens/Home/HomeScreens';
import Model from './Screens/Authentication/SignUpScreen/Model';
import ListMonument from './Screens/FicheMonument/ListMonument/ListMonument';
import SearchScreen from './Screens/SearchScreen/SearchScreen';
import GuideScreen from './Screens/GuideScreen/GuideScreen';
import Demo from './Screens/Demo/Demo';
import TestModal from './Screens/TestModaal/TestMoodal';
import TestVideo from './Screens/TestVideo/TestVideo';
import ListCircuitVisite from './Screens/Profile/ListCircuitVisite';
import ModalFeedback from './Components/MapDrawer/ModalFeedback';
import ModalDemo from './Components/MapDrawer/ModalDemo';
import NewDemo from './Screens/Demo/NewDemo';

const App = () => {
  useEffect(() => {
    Settings.initializeSDK();
  }, []);
  return (
    <MenuProvider>
      {/* <MapNavigation /> */}
      {/* <Test\userBackgroundTrackingModal /> */}
      {/* <SearchScreen /> */}
      <NewNavigation />
    </MenuProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
