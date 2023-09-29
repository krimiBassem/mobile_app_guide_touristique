import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContentLoader from 'react-native-easy-content-loader';

const LoaderGuide = () => {
  return (
    <View style={{marginTop: 50, padding: 20}}>
      <ContentLoader
        containerStyles={{marginBottom: 20}}
        active
        avatar
        pRows={2}
        // pHeight={[100, 30, 20]}
        pWidth={[100, 70, 100]}
      />
      <ContentLoader
        containerStyles={{marginBottom: 20}}
        active
        avatar
        pRows={2}
        // pHeight={[100, 30, 20]}
        pWidth={[100, 70, 100]}
      />
      <ContentLoader
        containerStyles={{marginBottom: 20}}
        active
        avatar
        pRows={2}
        // pHeight={[100, 30, 20]}
        pWidth={[100, 70, 100]}
      />
    </View>
  );
};

export default LoaderGuide;

const styles = StyleSheet.create({});
