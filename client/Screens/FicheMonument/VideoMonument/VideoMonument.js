import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
//import testv from '../../Components/videos/Horses_8.mp4';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {width} from 'pdfkit/js/page';

const VideoMonument = ({route}) => {
  const {videoMonument, designation, navigateBack} = route.params;
  console.log(videoMonument);
  return (
    <VideoPlayer
      tapAnywhereToPause={true}
      onBack={navigateBack}
      source={{uri: videoMonument}}
    />
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
  },
});
export default VideoMonument;
