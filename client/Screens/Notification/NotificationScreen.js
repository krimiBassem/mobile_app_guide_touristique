// import {StyleSheet, Text, View, SafeAreaView, Pressable,Image} from 'react-native';
// import React from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// //Import components
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {useEffect} from 'react';
// import axios from 'axios';
// import {useState} from 'react';

// const NotificationScreen = () => {
//   const [monumentStorage, setMonumentStorage] = useState(46);
//   const [monument, setMonument] = useState([]);

//   fetchMonuments = async () => {
//     try {
//       const response = await axios.get(`http://10.0.2.2:8000/api/v1/monuments`);
//       if (response.data.length > monumentStorage) {
//         setMonument(response.data[response.data.length - 1]);
//         setMonumentStorage(response.data.length);
//         console.log(response.data.length);
//       } else {
//       }
//     } catch (e) {
//       console.log(e, 'problem api into searchbar');
//     }
//   };

//   useEffect(() => {
//     fetchMonuments();
//   }, []);
//   return (
//     <SafeAreaView>
// <View
//   style={{
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingTop: 15,
//   }}>
//   <Pressable
//     android_disableSound={false}
//     onPress={() => navigation.goBack()}>
//     <AntDesign
//       style={{marginLeft: 15}}
//       name="arrowleft"
//       size={30}
//       color="black"
//     />
//   </Pressable>
//   <Text
//     style={{
//       fontSize: 22,
//       fontWeight: 'bold',
//       color: '#474747',
//       fontFamily: 'Segoe UI',
//       marginLeft: 25,
//     }}>
//     Notification
//   </Text>
// </View>

//       <View
//         style={{height: 1, backgroundColor: '#CFCCCC', marginTop: 10}}>

//         </View>

//       {<View style={{marginTop:30}}>

//         <View style={{height:70,flexDirection:'row'}}>

//           <View style={{marginLeft:38,height:50,width:50,borderRadius:50,backgroundColor:'#E59138'}}></View>
//           <Image
//         style={{left:-38,top:8}}
//                   source={require('../../Components/Images/feedbackSmile/notiff.png')}
//                 />
//           <Text style={{marginLeft:-10,top:0,fontFamily:"Segoe UI",fontSize:13}}>{monument.nom_monument}</Text>

//         </View>
//         <View
//         style={{height: 1.5, backgroundColor: '#DFDFDF'}}>

//         </View>
//       </View>}
/************************************************************************ */
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import axios from 'axios';
// import EncryptedStorage from 'react-native-encrypted-storage';

// //Import components
import SearchBar from '../../Components/SearchBar';
// import baseUrl from '../../assests/baseUrl';

// const NotificationScreen = ({socket}) => {
//   const [notif, setNotif] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [id, setId] = useState('');

//   const getIdUser = async () => {
//     try {
//       const value = await EncryptedStorage.getItem('id');
//       console.log(value);
//       if (value !== null) {
//         setId(value);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//     // console.log(id);
//   };

//   useEffect(() => {
//     getIdUser();
//     const getNotif = async () => {
//       try {
//         const {data} = await axios.get(`${baseUrl}/notif/${id}`); //id user
//         console.log(data.data.length);
//         global.nbrNotif = data.data.length;
//         setNotif(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

//     getNotif();
//   }, [id]);

//   return (
//     <SafeAreaView>
//       {/* <SearchBar /> */}
//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         notif?.map(el => <Text key={el.id}>{el.text_notification}</Text>)
//       )}
//     </SafeAreaView>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({});

/***************************************************************************************************************** */

// import React from 'react';
// import {View, Button} from 'react-native';
// import notifee from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

// const NotificationScreen = () => {
//   const onDisplayRemoteNotification = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       await messaging()
//         .getToken()
//         .then(fcmToken => {
//           console.log('FCM Token: ', fcmToken);
//         });
//     } else {
//       console.log('Not Authorization Status : ', authStatus);
//     }
//   };

//   const onDisplayLocalNotification = async () => {
//     // Request permissions (required for iOS)
//     // await notifee.requestPermission();

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     // Display a notification
//     await notifee.displayNotification({
//       title: 'Notification Sample',
//       body: 'Main body content of the notification',
//       android: {
//         channelId,
//         // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//         // // pressAction is needed if you want the notification to open the app when pressed
//         // pressAction: {
//         //   id: 'default',
//         // },
//       },
//     });
//   };

//   return (
//     <View>
//       <Button
//         title="Display Notification"
//         onPress={onDisplayLocalNotification}
//       />
//       <View style={{height: 52}} />
//       <Button
//         title="Display Remote Notification"
//         onPress={onDisplayRemoteNotification}
//       />
//     </View>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import EncryptedStorage from 'react-native-encrypted-storage';

const NotificationScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <Text
            style={{fontFamily: 'SegoeUI'}}
            onPress={() => EncryptedStorage.setItem('showdemo', 'true')}>
            En cours de construction
          </Text>
          <FastImage
            style={{width: 400, height: 400}}
            source={{
              uri: 'https://res.cloudinary.com/devmycode/image/upload/v1657892329/arch%C3%A9ologie/mob-dev_lhv1iw.gif',
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
    </>
  );
};

export default NotificationScreen;

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
