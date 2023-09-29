import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/******************* IMPORT SCREENS *******************/
import NotificationScreen from '../Screens/Notification/NotificationScreen';
/******************* ***************** *******************/

const Stack = createNativeStackNavigator();

const NotificationNavigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="mes notifications"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NotificationNavigators;
