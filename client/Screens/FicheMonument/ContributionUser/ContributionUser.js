import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Platform,
  Button,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useLayoutEffect, useRef} from 'react';
import axios from 'axios';

/******************* IMPORT COMPONENTS *******************/
import TrashIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
/******************* ***************** *******************/
import contribution from '../test.json';
/******************* IMPORT PACKAGES *******************/
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
/******************* *************** *******************/

/******************* BASE URL *******************/
import baseURL from '../../../assests/baseUrl';
/******************* ******** *******************/

const ContributionUser = ({route}) => {
  const {navigateBack, MonumentId, UserId, navigatePartage} = route.params;
  /********** State hook for contribution  **********/

  /****** */
  const [fileName, setFileName] = useState(null);
  const [fileToSend, setFileToSend] = useState('');
  const [textContribution, setTextContribution] = useState('');
  const [urlContribution, setUrlContribution] = useState('url from cloudinary');
  const [imageTaked, setImageTaked] = useState('url from camera');
  const [imageChoosed, setImageChoosed] = useState('url from gallery');
  const [title, setTitle] = useState(false);
  /********** **************************** **********/

  const camera = useRef();
  const gallery = useRef();

  /********** Select photo from camera **********/
  const tackePhotoFromCamera = async () => {
    try {
      // const image = await ImagePicker.openCamera({
      //   width: 300,
      //   height: 400,
      //   cropping: true,
      // })
      // const uri = image.path;
      // const name = image.modificationDate;
      // const type = image.mime;
      // const source = {
      //   uri,
      //   name,
      //   type,
      // };
      // await handleUpload(source);
      // setImageTaked(urlContribution);
      await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
      }).then(async res => {
        const uri = res.path;
        const type = res.mime;
        const name = res.modificationDate;
        const source = {
          uri,
          name,
          type,
        };
        await handleUpload(source);
      });
    } catch (err) {
      err => console.error(err);
    }
  };

  /********** ************************ **********/

  /********** Select photo from gallery **********/
  const choosePhotoFromLibrary = async () => {
    try {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(async res => {
        const uri = res.path;
        const type = res.mime;
        const name = res.modificationDate;
        const source = {
          uri,
          name,
          type,
        };
        await handleUpload(source);
      });
    } catch (err) {
      err => console.error(err);
    }
  };
  /********** ***************************** **********/

  /********** Getting url from cloudinary  **********/
  const handleUpload = async photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'dourbiaApp');
    data.append('cloud_name', 'devmycode');
    await fetch('https://api.cloudinary.com/v1_1/devmycode/upload', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(async data => {
        if (camera) {
          setImageTaked(data.url);
        } else if (gallery) {
          setImageChoosed(data.url);
        }
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };
  /********** ********************************* **********/

  /********** Upload file PDF and DOC **********/
  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  const fileUploadPDFDOC = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      const formFile = new FormData();
      formFile.append('myfile', {
        uri: pickerResult.fileCopyUri,
        type: pickerResult.type,
        name: pickerResult.name,
      });

      let res = await fetch(`${baseURL}/media/upload`, {
        method: 'post',
        body: formFile,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseJson = await res.json();
      setFileName(pickerResult.name);
      setFileToSend(responseJson.data);
    } catch (e) {
      handleError(e);
    }
  };
  /********** *********************** **********/
  /********** Send contribution to database **********/
  const emptyChamp = () => {
    setFileName(null);
    setFileToSend(null);
    setImageChoosed('url from gallery');
    setImageTaked('url from camera');
    setTextContribution('');
  };
  const sendContribution = async () => {
    if (textContribution != '') {
      axios({
        url: `${baseURL}/contribution`,
        method: 'post',
        data: {
          pdfFile: fileToSend != '' ? fileToSend : null,
          text_contribution:
            'Titre : ' + title + '. TextContribution : ' + textContribution,
          image_importe:
            imageChoosed != 'url from gallery' ? imageChoosed : null,
          image_capture: imageTaked != 'url from camera' ? imageTaked : null,
          MonumentId: MonumentId,
          UtilisateurId: UserId,
        },
      })
        .then(response => {
          console.log('Data was successfully sent!!');
          emptyChamp();
          ToastAndroid.show(
            'Votre contribution sera traitée dans les plus brefs délais, Merci!',
            ToastAndroid.LONG,
          );
        })
        .catch(err => console.log('erreur!!!!!!!', err));
    } else if (textContribution == '') {
      console.warn('Merci de bien vouloir nous indiquer une descriptive!!');
    } else if (
      fileToSend == '' ||
      imageChoosed == 'url from gallery' ||
      imageTaked == 'url from camera'
    ) {
      console.warn(
        'Merci de bien vouloir nous transmettre votre contribution!!',
      );
    }
  };
  /********** ********************************* **********/
  return (
    <ScrollView style={{backgroundColor: '#ffffff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 5,
          marginTop: 20,
        }}>
        <Pressable onPress={navigateBack}>
          {/* <AntDesign
            style={{marginLeft: 15, marginRight: 27}}
            name="arrowleft"
            size={30}
            color="black"
          /> */}
          <Image
            source={require('../../../Components/icons/back.png')}
            style={{width: 24, height: 24, marginStart: 20}}
          />
        </Pressable>
        <Text
          style={{
            marginStart: 30,
            fontWeight: 'bold',
            color: '#474747',
            fontFamily: 'SegoeUI',
            fontSize: 22,
          }}>
          Contribution du contenu
        </Text>
      </View>
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
          marginTop: 40,
        }}>
        <TouchableOpacity onPress={fileUploadPDFDOC}>
          <Image
            source={require('../../../Components/iconsContribution/attachement.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity ref={camera} onPress={tackePhotoFromCamera}>
          <Image
            source={require('../../../Components/iconsContribution/camera.png')}
            style={{marginLeft: 10, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity ref={gallery} onPress={choosePhotoFromLibrary}>
          <Image
            source={require('../../../Components/iconsContribution/gallery.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholderTextColor={'#474747'}
          style={styles.input}
          onChangeText={value => setTextContribution(value)}
          value={textContribution}
          multiline
          placeholder="Ajouter un commentaire..."
          underlineColorAndroid="transparent"
        />
      </View>
      {fileName && (
        <View style={styles.contributionContainerFile}>
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
              fontFamily: 'SegoeUI',
            }}>
            {fileName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setFileName(null);
            }}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      )}
      {imageChoosed != 'url from gallery' && (
        <View>
          <View style={styles.contributionContainer}>
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
                onPress={() => setImageChoosed('url from gallery')}
                style={styles.trashContainer}>
                <TrashIcon
                  name="trash-o"
                  size={13}
                  color={'#000'}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
            {/* <TextInput
          onChangeText={value => setTextContribution(value)}
          value={textContribution}
          multiline
          numberOfLines={5}
          style={styles.input}
          placeholder="Ajouter un commentaire..."
          underlineColorAndroid="transparent"/> */}
          </View>
        </View>
      )}
      {imageTaked != 'url from camera' && (
        <View>
          <View style={styles.contributionContainer}>
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
                  Ajouter des photos/vidéos
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
          </View>
          <View style={{paddingTop: 10, paddingLeft: 25}}>
            <TextInput
              placeholderTextColor={'#474747'}
              onChangeText={value => setTitle(value)}
              multiline
              numberOfLines={5}
              style={{
                flex: 1,
                paddingLeft: 10,
                backgroundColor: '#E8E8E8',
                color: '#424242',
                borderRadius: 8,

                width: '94%',
                height: 40,
              }}
              placeholder="Ajouter un titre ... "
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: 10,
          marginTop: 20,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={sendContribution}
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
            marginRight: 15,
          }}>
          <Text style={{fontSize: 16, color: '#705F5F', fontFamily: 'SegoeUI'}}>
            Envoyer
          </Text>
        </TouchableOpacity>
      </View>
      {contribution.map((el, i) => (
        <View style={{flexDirection: 'row', paddingBottom: 10, paddingLeft: 5}}>
          <View style={{flexDirection: 'row', paddingTop: 10, paddingRight: 6}}>
            {el.photo_utilisateur !== null ? (
              <Image
                style={{
                  paddingLeft: 40,
                  width: Dimensions.get('window').width * 0.1,
                  height: Dimensions.get('window').width * 0.1,
                  borderRadius: 400 / 2,
                }}
                source={{uri: el.photo_utilisateur}}
              />
            ) : (
              <Image
                style={{
                  paddingLeft: 40,
                  width: Dimensions.get('window').width * 0.1,
                  height: Dimensions.get('window').width * 0.1,
                  borderRadius: 400 / 2,
                }}
                source={{
                  uri: el.photo_utilisateur,
                }}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'column',
              paddingLeft: 20,
              backgroundColor: '#EEECEC',
              borderRadius: 10,
              paddingTop: 8,
              width: Dimensions.get('window').width * 0.8,
            }}>
            <Text style={{fontSize: 20}}>
              {el.prenom_utilisateur} {el.nom_utilisateur}
            </Text>
            <Text style={{fontSize: 18, paddingTop: 10}}>
              {el.text_contribution}
            </Text>
            <View style={{flexDirection: 'row', paddingBottom: 18}}>
              {el.image_importe !== null ? (
                <Image
                  style={{
                    paddingRight: 10,
                    borderRadius: 10,
                    paddingLeft: 40,
                    width: Dimensions.get('window').width * 0.3,
                    height: Dimensions.get('window').width * 0.3,
                  }}
                  source={{uri: el.image_importe}}
                />
              ) : null}
              {el.image_capture !== null ? (
                <Image
                  style={{
                    left: 30,
                    borderRadius: 10,

                    paddingRight: 10,
                    width: Dimensions.get('window').width * 0.3,
                    height: Dimensions.get('window').width * 0.3,
                  }}
                  source={{uri: el.image_capture}}
                />
              ) : null}
            </View>
            <View>
              {el.pdfFile !== null ? (
                <TouchableOpacity
                  onPress={() => {
                    navigatePartage('Pdf');
                  }}>
                  <Image
                    style={{
                      left: 30,
                      borderRadius: 10,
                      paddingRight: 10,
                      width: Dimensions.get('window').width * 0.2,
                      height: Dimensions.get('window').width * 0.2,
                    }}
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMXTOP7uq6n0NyJ0Y2sgWpk6J7H5VUbt_TQ&usqp=CAU',
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContributionUser;

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    marginTop: 10,
    height: 80,
  },
  contributionContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    marginTop: 3,
    height: 100,
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
  input: {
    backgroundColor: '#ffffff',
    color: '#424242',
    borderRadius: 8,
    width: Dimensions.get('screen').width - 55,
    alignSelf: 'center',
    height: 90,
    marginTop: 10,
    borderColor: '#E59138',
    borderWidth: 2,
  },
  searchIcon: {
    padding: 10,
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
});
