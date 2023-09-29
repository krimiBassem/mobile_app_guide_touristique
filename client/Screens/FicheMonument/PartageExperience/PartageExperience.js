import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  ImageBackground,
  ToastAndroid,
  Pressable,
} from 'react-native';
import React, {useState, useRef} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

/******************* IMPORT PACKAGES *******************/
import ImagePicker from 'react-native-image-crop-picker';
import Share from 'react-native-share';
import TrashIcon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
/******************* *************** *******************/

/******************* IMPORT COMPONENTS *******************/
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Feather';
import PhotoIcon from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
/******************* *************** *******************/

const PartageExperience = ({route}) => {
  // const {navigateBack} = route.params;
  // const camera = useRef(null);
  // const video = useRef(null);
  // const photo = useRef(null);
  const bs = useRef(null);
  const fall = new Animated.Value(1);
  const [textPartage, setTextPartage] = useState('');
  const [imageTaked, setImageTaked] = useState('url from camera');
  const [imageChoosed, setImageChoosed] = useState('image from gallery');
  const [videoChoosed, setVideoChoosed] = useState('video from gallery');
  const [press, setPress] = useState('nothing');

  const x = () => {
    chooseVideoFromLibrary();
    setPress('video');
  };
  const renderInner = () => (
    <View style={styles.panel}>
      <TouchableOpacity
        // ref={video}
        style={styles.panelButton}
        onPress={() => {
          x();
        }}>
        <Text style={styles.panelButtonTitle}>
          Importer une vidéo à partir de la galerie
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        // ref={photo}
        style={styles.panelButton}
        onPress={() => {
          choosePhotoFromLibrary();
          setPress('photo');
          stopTalking();
        }}>
        <Text style={styles.panelButtonTitle}>
          Importer une photo à partir de la galerie
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  /********** Method for sharing experience on social media **********/
  const myCostumShare = async () => {
    try {
      const shareOptions = {
        message: textPartage,
        // url: camera
        //   ? imageTaked
        //   : photo
        //   ? imageChoosed
        //   : videoChoosed != 'video from gallery'
        //   ? videoChoosed
        //   : null,
        url:
          imageTaked !== 'url from camera'
            ? imageTaked
            : imageChoosed !== 'image from gallery'
            ? imageChoosed
            : videoChoosed !== 'video from gallery'
            ? videoChoosed
            : null,
        // press === 'camera'
        //   ? imageTaked
        //   : press === 'photo'
        //   ? imageChoosed
        //     ? press === 'video'
        //     : videoChoosed
        //   : null,
        failOnCancel: false,
      };
      await Share.open(shareOptions)
        .then(response => {
          console.log('Data was successfully shared!!');
          emptyChamp();
          // ToastAndroid.show('Partagé avec succès, Merci!', ToastAndroid.LONG);
        })
        .catch(res => console.log(res));
      // console.log(JSON.stringify(ShareResponse));
    } catch (err) {
      console.log('this is the error', err);
    }
  };
  /********** ********************************************* **********/

  const stopTalking = () => {
    const stopVoiceOff = global.stopVoiceOff;
    stopVoiceOff(false);
  };

  /********************========= CAMERA =========********************/
  const tackePhotoFromCamera = async () => {
    try {
      await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
      })
        .then(async res => {
          const uri = res.path;
          const type = res.mime;
          const name = res.modificationDate;
          const source = {
            uri,
            name,
            type,
          };
          await handleUpload(source);
        })
        .then(bs.current.snapTo(1));
    } catch (err) {
      err => console.error(err);
    }
  };

  /********** ******************************************** **********/

  /********************========= GALLERY =========********************/
  const choosePhotoFromLibrary = async () => {
    try {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(async res => {
          const uri = res.path;
          const type = res.mime;
          const name = res.modificationDate;
          const source = {
            uri,
            name,
            type,
          };
          await handleUpload(source);
        })
        .then(bs.current.snapTo(1));
    } catch (err) {
      err => console.error(err);
    }
  };
  const chooseVideoFromLibrary = async () => {
    try {
      await ImagePicker.openPicker({
        mediaType: 'video',
      })
        .then(async res => {
          const uri = res.path;
          const type = res.mime;
          const name = res.modificationDate;
          const source = {
            uri,
            name,
            type,
          };
          await handleUploadVideo(source);
        })
        .then(bs.current.snapTo(1));
    } catch (err) {
      err => console.error(err);
    }
  };

  /********** ******************************************** **********/
  // console.log(press);
  // console.log(videoChoosed);

  /********** Getting url from cloudinary  **********/
  const handleUpload = async photo => {
    console.log(videoChoosed);
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'dourbiaApp');
    data.append('cloud_name', 'devmycode');
    await fetch('https://api.cloudinary.com/v1_1/devmycode/upload', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        console.log('this url or video choosed', data.url);
        console.log('this is press', press);
        press === 'camera'
          ? setImageTaked(data.url)
          : press === 'photo'
          ? setImageChoosed(data.url)
          : null;
        // setVideoChoosed(data.url);
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };
  const handleUploadVideo = async photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'dourbiaApp');
    data.append('cloud_name', 'devmycode');
    await fetch('https://api.cloudinary.com/v1_1/devmycode/upload', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.url);
        setVideoChoosed(data.url);
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };
  /********** ********************************* **********/
  // console.log('image choosed', imageChoosed);
  // console.log('video choosed', videoChoosed);

  const emptyChamp = () => {
    setVideoChoosed('video from gallery');
    setImageChoosed('image from gallery');
    setImageTaked('url from camera');
    setTextPartage('');
    setPress('nothing');
  };

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 10,
            justifyContent: 'flex-end',
            // position: 'absolute',
            // top: 0,
            // right: 0,
            marginRight: 20,
            marginTop: 10,
          }}>
          {/* <TouchableOpacity onPress={fileUploadPDFDOC}>
            <Image
              source={require('../../../Components/iconsContribution/attachement.png')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              tackePhotoFromCamera();
              setPress('camera');
              stopTalking();
            }}>
            <Image
              source={require('../../../Components/iconsContribution/camera.png')}
              style={{marginLeft: 10, marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <Image
              source={require('../../../Components/iconsContribution/gallery.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={value => setTextPartage(value)}
            value={textPartage}
            multiline
            placeholder="Ajouter un commentaire..."
            underlineColorAndroid="transparent"
            placeholderTextColor={'#474747'}
          />
          {/* <TextInput
          onChangeText={value => setTextPartage(value)}
          value={textPartage}
          multiline
          // numberOfLines={5}
          style={styles.input}
          placeholder="Ajouter un commentaire..."
          underlineColorAndroid="transparent"
        /> */}
        </View>
        {imageChoosed !== 'image from gallery' ? (
          <ScrollView style={styles.contributionContainer}>
            <View style={{flex: 2, borderRadius: 8}}>
              <ImageBackground
                source={{
                  uri: imageChoosed,
                }}
                style={{
                  flex: 1,
                  width: Dimensions.get('screen').width * 0.8,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 8,
                }}
              />
              <TouchableOpacity style={styles.ContainerText}>
                <Image
                  source={require('../../../Components/iconsContribution/upload_plus.png')}
                  style={{marginLeft: 5, width: 13, height: 13}}
                />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2,
                    color: '#000000',
                    fontFamily: 'SegoeUI',
                  }}>
                  Ajouter des photos/vidéos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setImageChoosed('image from gallery')}
                style={styles.trashContainer}>
                <TrashIcon
                  name="trash-o"
                  size={13}
                  color={'#000'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : null}
        {imageTaked !== 'url from camera' ? (
          <ScrollView style={styles.contributionContainer}>
            <View style={{flex: 2, borderRadius: 8}}>
              <ImageBackground
                source={{
                  uri: imageTaked,
                }}
                style={{
                  flex: 1,
                  width: Dimensions.get('screen').width * 0.8,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 8,
                }}
              />
              <TouchableOpacity style={styles.ContainerText}>
                <Image
                  source={require('../../../Components/iconsContribution/upload_plus.png')}
                  style={{marginLeft: 5, width: 13, height: 13}}
                />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2,
                    color: '#000000',
                    fontFamily: 'SegoeUI',
                  }}>
                  Ajouter des photos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setImageTaked('url from camera')}
                style={styles.trashContainer}>
                <TrashIcon
                  name="trash-o"
                  size={13}
                  color={'#000'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : null}
        {videoChoosed !== 'video from gallery' ? (
          <ScrollView style={styles.contributionContainerVideo}>
            <View
              style={{
                marginTop: 20,
                width: Dimensions.get('window').width * 0.8,
                borderRadius: 15,
                alignSelf: 'center',
              }}>
              <VideoPlayer
                pauseOnPress
                video={{
                  uri: videoChoosed,
                }}
                videoWidth={600}
                videoHeight={Dimensions.get('window').width * 0.8}
                thumbnail={{
                  uri: 'https://res.cloudinary.com/devmycode/image/upload/v1656344133/typcjl2noi4ktzcwc7iu.jpg',
                }}
              />
              <TouchableOpacity style={styles.ContainerText}>
                <Image
                  source={require('../../../Components/iconsContribution/upload_plus.png')}
                  style={{marginLeft: 5, width: 13, height: 13}}
                />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2,
                    color: '#000000',
                    fontFamily: 'SegoeUI',
                  }}>
                  votre video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVideoChoosed('video from gallery')}
                style={styles.trashContainer}>
                <TrashIcon
                  name="trash-o"
                  size={13}
                  color={'#000'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : null}
        <TouchableOpacity
          onPress={myCostumShare}
          style={{
            // marginTop: 10,
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 20,
            width: 100,
            borderRadius: 5,
            backgroundColor: '#E8E8E8',
            alignSelf: 'flex-end',
            marginTop: 10,
            marginRight: 5,
          }}>
          <Text style={{fontSize: 16, color: '#705F5F', fontFamily: 'SegoeUI'}}>
            Partager
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}></Animated.View>
    </>
  );
};

export default PartageExperience;

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    marginTop: 10,
    height: 120,
  },
  input: {
    // flex: 1,
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 10,
    backgroundColor: '#ffffff',
    color: '#424242',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    height: 90,
    marginTop: 10,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // height: 190,
    // margin: 12,
    // borderWidth: 1,
    // borderColor: '#9E9E9E',
    // padding: 10,
    // borderRadius: 5,
    // width: Dimensions.get('screen').width * 0.8,
    // alignSelf: 'center',
    // backgroundColor: '#ffffff',
    // paddingBottom: 140,
    borderColor: '#E59138',
    borderWidth: 2,
  },
  contributionContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    marginTop: 3,
    height: 100,
  },
  contributionContainerVideo: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    marginTop: 3,
    height: 'auto',
  },
  ContainerText: {
    backgroundColor: '#FFFFFF',
    height: 'auto', //any of height
    width: 'auto', //any of width
    justifyContent: 'center',
    borderRadius: 8, // it will be height/2
    position: 'absolute',
    left: 20,
    top: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.7, //0.2
  },
  trashContainer: {
    backgroundColor: '#FFFFFF',
    height: 20, //any of height
    width: 20, //any of width
    justifyContent: 'center',
    borderRadius: 8, // it will be height/2
    position: 'absolute',
    left: 20,
    bottom: 5,
    opacity: 0.7,
  },
  contributionContainerFile: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    marginTop: 3,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    height: '100%',
    justifyContent: 'flex-end',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#E59138',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
