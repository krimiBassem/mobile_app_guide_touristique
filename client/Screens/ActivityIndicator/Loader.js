import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const Loader = () => {
  state = {
    spinner: false,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>chargement en cours ...</Text>
      <FastImage
        style={{width: 50, height: 50}}
        source={{
          uri: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
