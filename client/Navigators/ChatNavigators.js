import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/******************* IMPORT SCREENS *******************/
import ChatbotScreen from '../Screens/Chatbot/ChatbotScreen';
/******************* ***************** *******************/

const Stack = createNativeStackNavigator();

const ChatbotNavigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatbotNavigators;
