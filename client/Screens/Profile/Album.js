// import React, {useState, useLayoutEffect} from 'react';
// import {
//   Platform,
//   Dimensions,
//   Linking,
//   StyleSheet,
//   View,
//   Text,
//   TouchableWithoutFeedback,
//   Image,
//   LogBox,
//   Button,
//   Modal,
//   DevSettings,
//   ScrollView,
//   TouchableOpacity,
//   ScrollViewComponent,
// } from 'react-native';
// LogBox.ignoreLogs(['EventEmitter.removeListener']);
// import ImageLayout from 'react-native-image-layout';
// import IconBack from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import baseUrl from '../../assests/baseUrl';
// import axios from 'axios';

// export default Album = ({route, navigation}) => {
//   const {id} = route.params;
//   const [modalVisible, setModalVisible] = useState(false);
//   const [data, setData] = useState([]);
//   const [dataLength, setDataLength] = useState(null);

//   const deleteOnePhoto = async () => {
//     try {
//       /***
//        * @todo: get the id of photo to delete it
//        */
//       await axios
//         .delete(`${baseUrl}/photo`)
//         .then(res => {
//           console.log(res);
//         })
//         .catch(er => {
//           console.log(er);
//         });
//     } catch (e) {
//       console.log(e, 'pas de suppression de photo');
//     }
//   };

// const fetchPhotos = async () => {
//   try {
//     const response = await axios.get(
//       // `${baseUrl}/photos`,
//       `${baseUrl}/photos/${id}`,
//     );
//     setData(response.data.data);
//     setDataLength(response.data.data.length);
//     // console.log(response.data.data.length);
//   } catch (e) {
//     console.log(e, 'problem api into gallery');
//   }
// };
//   useLayoutEffect(() => {
//     fetchPhotos();
//   }, [dataLength]);

//   return (
//     <View style={styles.container}>
//       <ImageLayout
//         rerender={true}
//         images={data}
//         renderPageHeader={(image, i, onClose) => {
//           console.log(image);
//           return (
//             <View
//               style={[styles.statusBarTop, styles.header, styles.pageHeader]}>
//               <TouchableWithoutFeedback
//                 onPress={() => {
//                   onClose();
//                 }}>
//                 <IconBack
//                   style={{marginLeft: 15}}
//                   name="arrow-left"
//                   color={'#FFFFFF'}
//                   size={20}
//                 />
//               </TouchableWithoutFeedback>
//               <View>
//                 <Button
//                   title="supprimer"
//                   color={'#000000'}
//                   onPress={() => setModalVisible(true)}
//                 />
//               </View>
//               {/* <View style={{}}>
//                 <Text style={[styles.profilePrimary, styles.whiteText]}>
//                   {image.title}
//                 </Text>
//                 <Text style={[styles.profileSecondary, styles.whiteText]}>
//                   {image.description}
//                 </Text>

//               </View> */}
//             </View>
//           );
//         }}
//       />
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <View style={[styles.button, styles.buttonClose]}>
//               <Button
//                 title="supprimer"
//                 color={'#000000'}
//                 onPress={() => setModalVisible(!modalVisible)}
//               />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#368FFA',
//   },
//   header: {
//     height: 64,
//     backgroundColor: 'transparent',
//   },
//   headerBody: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statusBarTop: {
//     paddingTop: 0,
//   },
//   mobileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pageHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     top: 0,
//     width: Dimensions.get('window').width - 20,
//     position: 'absolute',
//     zIndex: 1000,
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 25,
//   },
//   listTab: {
//     height: 32,
//     flexDirection: 'row',
//     borderTopLeftRadius: 7.5,
//     borderTopRightRadius: 7.5,
//     backgroundColor: '#fff',
//     marginBottom: -5,
//   },
//   tab: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabTextUnderline: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#e53935',
//   },
//   tabTextOn: {
//     fontSize: 10,
//     color: '#e53935',
//   },
//   tabTextOff: {
//     fontSize: 10,
//     color: 'grey',
//   },
//   whiteText: {
//     fontWeight: 'bold',
//     color: '#fafafa',
//   },
//   profilePrimary: {
//     fontSize: 14,
//     paddingHorizontal: 5,
//   },
//   profileSecondary: {
//     fontSize: 12,
//     paddingHorizontal: 5,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   panelButtonActive: {
//     padding: 13,
//     borderRadius: 10,
//     backgroundColor: '#E59138',
//     alignItems: 'center',
//     marginVertical: 7,
//     width: 100,
//   },
//   panelButtonInactive: {
//     padding: 13,
//     borderRadius: 10,
//     backgroundColor: '#DDDDDD',
//     alignItems: 'center',
//     marginVertical: 7,
//     width: 100,
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

import React, {useState, useLayoutEffect} from 'react';
import {
  Platform,
  Dimensions,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImageLayout from 'react-native-image-layout';
// import ImageLayout from "./src"
import baseUrl from '../../assests/baseUrl';
import axios from 'axios';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;

import IconBack from 'react-native-vector-icons/FontAwesome5';

export default Album = ({route, navigation}) => {
  const {id, imageProfile} = route.params;
  console.log({'id utilisateur': id, 'image utilisateur': imageProfile});
  const fetchTotal = 0;

  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState();
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/photos`,
        `${baseUrl}/photos/${id}`,
      );
      console.log('id from axios album', id);
      console.log(response.data);
      setData(response.data.data);
      setDataLength(response.data.data.length);
      // console.log(response.data.data.length);
    } catch (e) {
      console.log(e, 'problem api into gallery');
    }
  };
  useLayoutEffect(() => {
    fetchPhotos();
  }, [data]);

  return (
    <View style={styles.container}>
      <ImageLayout
        // rerender={true}
        renderMainHeader={() => {
          return (
            <View>
              <View
                style={[
                  styles.statusBarTop,
                  styles.header,
                  styles.mobileHeader,
                ]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={{
                      uri: imageProfile
                        ? imageProfile
                        : 'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg',
                    }}
                    style={{
                      height: 50,
                      width: 50,
                      marginLeft: 10,
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: '#ffffff',
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.headerBody}>
                  <Text style={[styles.title, {fontFamily: 'SegoeUI'}]}>
                    Galerie photos
                  </Text>
                </View>
              </View>
              {/* <View style={styles.listTab}>
                  <TouchableWithoutFeedback
                    style={{borderTopLeftRadius: 7.5}}
                    onPress={() => Linking.openURL('https://luehangs.site')}>
                    <View style={styles.tab}>
                      <View
                        style={[styles.tabTextUnderline, {paddingBottom: 3}]}>
                        <Text style={styles.tabTextOn}>REMOTE/LOCAL</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.tab}>
                      <View style={{paddingBottom: 3}}>
                        <Text style={styles.tabTextOff}>CAMERA ROLL</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View> */}
            </View>
          );
        }}
        images={data}
        // onEndReached={() => {
        //   if (fetchTotal === 0) {
        //     // console.log("onEndReached");
        //     setData(data);
        //     fetchTotal++;
        //   }
        // }}
        renderIndividualMasonryHeader={(data, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL('https://luehangs.site')}>
              <View
                style={[
                  styles.masonryHeader,
                  {width: data.masonryDimensions.width},
                ]}>
                <Image
                  source={{
                    uri: 'https://luehangs.site/images/lue-hang2018-square.jpg',
                  }}
                  style={styles.userPic}
                />
                <Text style={[styles.userName, {fontFamily: 'SegoeUI'}]}>
                  {data.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        renderPageHeader={(image, i, onClose) => {
          return (
            <View
              style={[styles.statusBarTop, styles.header, styles.pageHeader]}>
              <TouchableWithoutFeedback
                onPress={() => {
                  onClose();
                }}>
                <IconBack
                  style={{marginLeft: 15}}
                  name="arrow-left"
                  color={'#FFFFFF'}
                  size={20}
                />
              </TouchableWithoutFeedback>
              <View style={{}}>
                <Text
                  style={[
                    styles.profilePrimary,
                    styles.whiteText,
                    {fontFamily: 'SegoeUI'},
                  ]}>
                  {image.title}
                </Text>
                {/* <Text style={[styles.profileSecondary, styles.whiteText]}>{image.description}</Text> */}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

function isIPhoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  return (
    Platform.OS === 'ios' &&
    ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
      (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#368FFA',
  },
  header: {
    height: isIPhoneX() ? 74 : 64,
    backgroundColor: '#E59138',
  },
  headerBody: {
    flex: 1,
    alignItems: 'center',
  },
  statusBarTop: {
    paddingTop: isIPhoneX() ? 30 : platform === 'ios' ? 20 : 0,
  },
  mobileHeader: {
    // width: deviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  masonryHeader: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(150,150,150,0.4)',
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
  },
  title: {
    fontSize: 25,
  },
  listTab: {
    height: 32,
    flexDirection: 'row',
    borderTopLeftRadius: 7.5,
    borderTopRightRadius: 7.5,
    backgroundColor: '#fff',
    marginBottom: -5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTextUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: '#e53935',
  },
  tabTextOn: {
    fontSize: 10,
    color: '#e53935',
  },
  tabTextOff: {
    fontSize: 10,
    color: 'grey',
  },
  userPic: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  userName: {
    color: '#616161',
  },
  whiteText: {
    fontWeight: 'bold',
    color: '#fafafa',
  },
  profilePrimary: {
    fontSize: 14,
    paddingHorizontal: 5,
  },
  profileSecondary: {
    fontSize: 12,
    paddingHorizontal: 5,
  },
});
