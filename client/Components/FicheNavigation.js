import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FicheMonument from '../Screens/FicheMonument/FicheMonument';
import PartageExperience from '../Screens/FicheMonument/PartageExperience/PartageExperience';

const Stack = createNativeStackNavigator();

const FicheNavigation = props => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="FicheStack">
        <Stack.Screen
          name="FicheStack"
          component={FicheMonument}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PartageStack"
          component={PartageExperience}
          // options={{headerShown: false}}
          //change
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FicheNavigation;
