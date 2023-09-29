import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
const chat =
  'https://webchat.snatchbot.me/b908ec4acd3e9b45464119424abbd638cf3643f47e8c6e47e81b81342a46285d';
//Import components
import SearchBar from '../../Components/SearchBar';

const ChatbotScreen = () => {
  return (
    <WebView
      source={{uri: chat}}
      style={{flex: 1}}
      onLoad={console.log('Loaded!')}
    />
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({});
