import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/******************* IMPORT SCREENS *******************/
import Login from '../Screens/Authentication/LoginScreen';
import SignUp from '../Screens/Authentication/SignUpScreen';
import ListScreen from '../Screens/ListCircuit/ListScreen';
/******************* ***************** *******************/

const Stack = createNativeStackNavigator();

const UserNavigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="List circuit"
        component={ListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UserNavigators;
