import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    TouchableOpacity,
    Linking,
    TextInput,
    ScrollView,
    StatusBar,
    Alert,
    ImageBackground,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import axios from 'axios';
  
  /******************* IMPORT COMPONENTS *******************/
  import TextToSpeak from './TextToSpeak';
  import HeaderFicheMonument from './HeaderFicheMonument';
  import ContributionUser from './ContributionUser';
  /******************* ***************** *******************/
  
  /******************* IMPORT PACKAGES *******************/
  import ImagePicker from 'react-native-image-crop-picker';
  import DocumentPicker from 'react-native-document-picker';
  /******************* *************** *******************/
  
  /******************* BASE URL *******************/
  import baseUrl from '../../assests/baseUrl';
  /******************* ******** *******************/
  
  const FicheMonument = ({navigation,route}) => {
    const {nomMonument} = route.params;
    const {descriptionMonument} = route.params;
  
    // console.log(openFiche.Thematiques[0].MonumentThematique.MonumentId);
    // const MonumentId = openFiche.Thematiques[0].MonumentThematique.MonumentId;
    /********** State hook for storing data from monuments table **********/
    // const [stateIdMonument, setStateIdMonument] = useState(MonumentId);
    // const [nomMonument, setNomMonument] = useState('');
    // const [descriptionMonument, setDescriptionMonument] = useState('');
    /**
     * @todo: State for images monument
     */
    /********** ************************************************ **********/
  
    /********** Select video from gallery **********/
    const chooseVideoFromLibrary = () => {
      ImagePicker.openPicker({
        mediaType: 'video',
      })
        .then(video => {
          console.log(video);
        })
        .catch(err => console.error(err));
    };
    /********** ***************************** **********/
  
    /********** Select video from camera **********/
    const tackeVideoFromCamera = () => {
      ImagePicker.openCamera({
        mediaType: 'video',
      })
        .then(image => {
          const uri = image.path;
          const name = image.modificationDate;
          const type = image.mime;
          const source = {
            uri,
            name,
            type,
          };
          handleUpload(source);
        })
        .catch(err => console.log(err));
    };
    /********** ************************ **********/
  
    /********** Method for getting cloudinary url **********/
    const handleUpload = photo => {
      const data = new FormData();
      data.append('file', photo);
      data.append('upload_preset', 'dourbiaApp');
      data.append('cloud_name', 'devmycode');
      fetch('https://api.cloudinary.com/v1_1/devmycode/upload', {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          setElementForContribution(data.secure_url);
          setIsUploaded(true);
          // setPhotoChoosed(data.secure_url);
          // setPhotoTaked(data.secure_url);
          // setFileToUpload(data.secure_url);
        })
        .catch(err => {
          Alert.alert('An Error Occured While Uploading');
        });
    };
    /********** ********************************* **********/
  
    /********** Icon track audio **********/
    const items = [];
    for (let index = 0; index <= 3; index++) {
      items.push(
        <Image
          key={index}
          source={require('../../Components/Images/icones/track_audio.png')}
          style={{width: 35, height: 30, marginLeft: 5}}
        />,
      );
    }
    /********** **************** **********/
  
    /********** Fetching data from monuments table **********/
    // const fetchMonument = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${baseUrl}/monument/${stateIdMonument}`,
    //     );
    //     setNomMonument(response.data.data.nom_monument);
    //     setDescriptionMonument(response.data.data.description_monument);
    //   } catch (e) {
    //     console.log(e, 'problem api into searchbar');
    //   }
    // };
    useEffect(() => {
  console.log("this is descripttionnnnnnnnn",descriptionMonument);  }, []);
    /********** ********************************** **********/
  
    return (
      <ScrollView style={{flex: 1}}>
        <View>
          <HeaderFicheMonument />
          <View style={{alignSelf: 'center', marginTop: 10}}>
            {nomMonument ? (
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'Segoe UI',
                }}>
                {nomMonument}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'Segoe UI',
                }}>
                Not found
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={{marginLeft: 20, marginTop: 30, fontWeight: 'bold'}}>
            Envie d'écoutez le text?
          </Text>
          <View
            style={{
              width: 250,
              alignSelf: 'center',
              marginTop: 15,
              padding: 5,
              paddingLeft: 15,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
  
              elevation: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextToSpeak description={descriptionMonument} />
            <View style={{flexDirection: 'row', marginRight: 30}}>{items}</View>
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width - 30,
              alignSelf: 'center',
              marginTop: 50,
            }}>
            {descriptionMonument ? (
              <Text style={{textAlign: 'justify'}}>{descriptionMonument}</Text>
            ) : (
              <Text style={{textAlign: 'justify'}}>Not found</Text>
            )}
          </View>
        </View>
        <ContributionUser />
        <View>
          {nomMonument ? (
            <Text style={{fontWeight: 'bold', marginTop: 30, marginLeft: 20}}>
              `Découvrez d'avantage ${nomMonument}`
            </Text>
          ) : (
            <Text style={{fontWeight: 'bold', marginTop: 30, marginLeft: 20}}>
              Not found
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 25,
            }}>
            <TouchableOpacity onPress={() => {}} underlayColor={'#fff'}>
              <Image
                source={require('../../Components/Images/icones/obj3d.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={chooseVideoFromLibrary}
              underlayColor={'#fff'}>
              <Image
                source={require('../../Components/Images/icones/visite360.png')}
                style={{width: 40, height: 40, marginLeft: 40, marginRight: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={tackeVideoFromCamera}
              underlayColor={'#fff'}>
              <Image
                source={require('../../Components/Images/icones/video.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
            <Image />
            <Image />
          </View>
        </View>
        <View
          style={{
            width: 257,
            alignSelf: 'center',
            height: 79,
            borderRadius: 8,
            marginTop: 30,
          }}>
          <Button
            title="Partager votre expérience"
            color="#E59138"
            onPress={() => navigation.navigate('PartageStack')}
          />
        </View>
        {nomMonument !== 'Le Tophet' ? (
          <View
            style={{
              width: 257,
              alignSelf: 'center',
              height: 79,
              borderRadius: 8,
              // marginTop: 30,
            }}>
            <Button
              title="Prochain Monument"
              color="#E59138"
              onPress={() => navigation.navigate('PartageStack')}
            />
          </View>
        ) : (
          <View
            style={{
              width: 257,
              alignSelf: 'center',
              height: 79,
              borderRadius: 8,
              marginBottom: 70,
            }}>
            <Button
              title="Continuer la visite !"
              color="#E59138"
              onPress={() => navigation.navigate('PartageStack')}
            />
          </View>
        )}
      </ScrollView>
    );
  };
  
  export default FicheMonument;
  
  const styles = StyleSheet.create({});
  