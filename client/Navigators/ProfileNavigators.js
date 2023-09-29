import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/******************* IMPORT SCREENS *******************/
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SettingsScreen from '../Screens/Profile/seetings';
import Account from '../Screens/Profile/account';
import FeedBack from '../Screens/Profile/feedBack';
import AboutDourbia from '../Screens/Profile/aboutDourbia';
import Help from '../Screens/Profile/help';
/******************* ***************** *******************/

const Stack = createNativeStackNavigator();

const ProfileNavigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mon Profil"
        component={ProfileScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="account"
        component={Account}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="feedback"
        component={FeedBack}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="aboutDourbia"
        component={AboutDourbia}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="help"
        component={Help}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigators;
