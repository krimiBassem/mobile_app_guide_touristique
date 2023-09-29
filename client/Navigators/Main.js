import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

/******************* IMPORT STACKS *******************/
import ChatbotNavigator from './ChatNavigators';
import UserNavigator from './UserNavigators';
import ProfileNavigator from './ProfileNavigators';
import NotificationNavigator from './NotificationNavigators';
/******************* ***************** *******************/

/******************* IMPORT ICONS *******************/
import Ionicons from 'react-native-vector-icons/Ionicons';
/******************* ***************** *******************/

const Tab = createBottomTabNavigator();

const Main = () => {
  const getTabBarVisible = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Chat';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      //   tabBar={getTabBarVisible}
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
      <Tab.Screen
        name="Home"
        component={UserNavigator}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen name="Chat" component={ChatbotNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen
        name="Notification"
        component={NotificationNavigator}
        options={{tabBarBadge: 3}}
      />
    </Tab.Navigator>
  );
};

export default Main;
