import React, {useEffect, useLayoutEffect, useRef} from 'react';
import useState from 'react-usestateref';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Pressable,
  Dimensions,
  PermissionsAndroid,
  TouchableHighlight,
  ToastAndroid,
  Modal,
  Image,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {Alert} from 'react-native';

import {Platform} from 'react-native';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';
import {IS_ANDROID} from '../../Config/permission';
import colors from '../../Config/colors';
import PathDrawer from '../PathDrawer/PathDrawer';
import Geolocation from 'react-native-geolocation-service';
import ListMonument from '../../Screens/FicheMonument/ListMonument/ListMonument';
import ListMonumentAllezVers from '../../Screens/FicheMonument/ListMonument/ListMonumentAllezVers';
import ModalDemo from './ModalDemo';
// import ModalCircuitFinished from '../../Screens/FicheMonument/ListMonument/Components/ModalCircuitFinished';
import axios from 'axios';
import BASE_URL from '../../assests/baseUrl';

/**************** BTN MUSIC ************** */
import carthage from '../../Screens/FicheMonument/MusicListen/carthage.mp3';
import MusicIcons from 'react-native-vector-icons/MaterialIcons';
var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var audio = new Sound(carthage, null, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully.
  console.log('success');
});
import {useState as State2} from '@hookstate/core';
/**************** IMPORT FOR DEMO BUTTON ************** */
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController,
} from 'rn-tourguide';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import TakePhoto from '../../Screens/FicheMonument/PickPhotos';
import ModalFeedback from './ModalFeedback';

/**************** IMPORT FOR MODAL ************** */
// import Modal from 'react-native-modalbox';
import MusicButton from '../../Screens/FicheMonument/MusicListen/index';
import FicheMonument from '../../Screens/FicheMonument/FicheMonument';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ListMusic from '../../Screens/FicheMonument/MusicListen/ListMusic';

import exampleIcon from '../Images/svg.png';

import findNearestMarker from '../../Utils/findNearestMarker';
//import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
MapboxGL.setAccessToken(
  // 'sk.eyJ1IjoiYmFsYnlubyIsImEiOiJjbDAxNHRyYXkwMWNrM2tvMGR2ZnlzMGFsIn0.6uNTatJ_MJqst5HjwEcn5A',
  'pk.eyJ1Ijoic2Fuc2EtaGFtZGkiLCJhIjoiY2w4dnVjNXVsMDAxODNubXM1YTA2MHdlNSJ9.UuLLm_b5EQQL9E3sXquskQ',
);

/********************** User background location tracking *************************/
import useBackgroundGeolocationTracker from '../../Components/userBackgroundTracking/userBackgroundTracking';
import Simplepin from '../Pin/SimplePin';
import PinOrder from '../Pin/PinOrder';
import FicheNavigation from '../FicheNavigation';
import Loader from '../../Screens/ActivityIndicator/Loader';
import {data} from 'react-native-image-layout/__tests__/mocks/dataMock';
import {err} from 'react-native-svg/lib/typescript/xml';
import baseURL from '../../assests/baseUrl';

/************************Fin***********************/

export default function MapDrawer(props, {navigation}, nextPin) {
  const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisible1, setModalVisible1] = useState(false);
  const [visibleMusic, setVisibleMusic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resState, setResState] = useState('true');
  const [choix, setChoix] = useState('');

  const displayModalFeedback = item => {
    if (item === 'Villas romaines' || item === 'Le Tophet') {
      setShowModal(true);
    }
  };

  const getResult = async () => {
    await EncryptedStorage.getItem('showdemo').then(res => {
      // console.log('response from storage', res);
      // if (!res) {
      // }
      setModalVisible(true);
    });
  };

  useEffect(() => {
    getResult();
    // setModalVisible(true);
    // getResult();
    // () => {
    //   if (resState === 'true') {
    //     setModalVisible(true);
    //   }
    // };
    // if (resState === 'true') {
    //   () => {
    //     setModalVisible(true);
    //   };
    // }
  }, []);

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    // audio.setVolume(5);
    return () => {
      audio.release();
    };
  }, []);
  const playPause = () => {
    if (audio.isPlaying()) {
      audio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      audio.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };
  /********===== rn-tourguide =====*******/
  const {start, canStart, stop, eventEmitter} = useTourGuideController();
  const [displayButton, setDisplayButton] = useState(true);
  const [finirEvenement, setFinirEvenement] = useState(false);
  const [allerVerNavi, setAllerVersNavi] = useState(false);
  const [dourbiaNavi, setDourbiaNavi] = useState(false);
  const [blockEvent, setblockEvent] = useState(null);
  const [finCircuit, setFinCircuit] = useState(0);
  const [questionnaire, setQ] = useState(0);
  const [flyTo, setFlyTo] = useState({
    coords: [10.3325451882596, 36.8546394504313],
    zoom: 13,
    followMe: false,
  });
  /**************** Toggle Map Navigation ************** */
  const [choise, setChoise] = useState('');
  const [Dourbia, setDourbia] = useState(false);
  const [flying, setFlying] = useState(false);
  const [allezVers, setAllezVers] = useState(false);
  const [mapLoadded, setMapLoadded] = useState(false);
  const [onOpenFicheMounument, setOnOpenFicheMounument] = useState(false);
  const [monumentId, setMonumentId] = useState('');
  const longi = State2(10.3325451882596);
  const latu = State2(36.8546394504313);

  const Userlongi = State2(0);
  const Userlatu = State2(0);
  //  useState([10.323889, 36.853056]);
  const [firstNAV, setFirstNAV] = useState(0);
  const NearestPin = State2(0);

  //    console.log('next pin from map drawer',  nextPin);
  const [circuit, setCircuit] = useState([]);
  const [newCircuit, setNewCircuit] = useState([]);
  const [newCircuit2, setNewCircuit2] = useState([]);
  const newCircuitAtom = State2([]);
  const [newCircuitVisited, setNewCircuitVisited] = useState([]);
  const [loading, setLoading] = useState(true);
  let [staticUser, setStaticUser] = useState({
    latitude: 0,
    longitude: 0,
    coords: [],
  });

  // console.log('array of new circuit', newCircuit);
  // console.log('array of new circuit visited', newCircuitVisited);

  useEffect(() => {
    /*
     if (firstNAV == 0) {
       AsyncStorage.setItem('newCircuit', circuit).then(res => {
         console.log("init Async  de navvv", res)
         // setFirstNAV(res)
       })
     } else {
         }
const fillProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(element => {
            tempProducts = [...tempProducts, {...element}];
        });
        setProducts(tempProducts);
    }
 */

    //   AsyncStorage.setItem('last_nav', 1)
    const item = AsyncStorage.getItem('last_nav').then(res => {
      res == null ? setFirstNAV(0) : setFirstNAV(parseInt(res));
      //  console.log('const item', res);
    });

    /*
    const item2 = AsyncStorage.getItem('nearest_nav').then(res => {
      res == null ? setNearestPin(0) : setNearestPin(parseInt(res));
      //  console.log('const item2', res);
    });
  */

    //    console.log('first res nav', item2);

    //getItemFromAsync();
    //  initialiser();
    // AsyncStorage.removeItem('stopDemo');
    // const item = AsyncStorage.getItem('stopDemo');
    // console.log({item});
    /*
     AsyncStorage.getItem('last_nav').then(res => {
       console.log("res de navvv", res)
        setFirstNAV(res)
      */
  }, []);

  const navigatePartage = (value, obj) => {
    props.navigation1.navigate(value, obj);
  };

  const navigateBack = () => {
    props.navigation1.goBack();
  };

  /**************** HOOK REF FOR MODAL ************** */
  const sheetRef = useRef(null);
  const fall = new Animated.Value(1);

  /**************** FOR MODAL ************** */
  const [id, setId] = useState('');

  const getIdUser = async () => {
    try {
      const value = await EncryptedStorage.getItem('id');
      if (value !== null) {
        setId(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIdUser();
  }, []);

  const RenderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <Text
          style={{fontWeight: 'bold', marginLeft: 15, fontFamily: 'SegoeUI'}}>
          Fiche Monument
        </Text>
        <TouchableOpacity
          onPress={() => {
            const stopVoiceOff = global.stopVoiceOff;
            closeModal();
            stopVoiceOff(false);
            displayModalFeedback(openFicheMonument.nom_monument);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 15,
              textDecorationLine: 'underline',
              fontFamily: 'SegoeUI',
            }}>
            Fermer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.panel}>
      {/* <FicheMonument openFiche={openFicheMonument} /> */}
      <RenderHeader />
      <FicheMonument
        UserId={id}
        openFiche={openFicheMonument}
        firstNav={questionnaire}
        navigatePartage={navigatePartage}
        navigateBack={navigateBack}
        closeModal={closeModal}
      />
    </View>
  );

  const closeModal = () => {
    sheetRef.current.snapTo(1);
  };

  /**************** next monument state ************** */

  /**************** open fiche monument POP UP ************** */
  const [openFicheMonument, setopenFicheMonument] = useState([]);
  const [nextmonument, setNextmonument] = useState([]);
  /*
        useEffect( ()=>{
            return() => {
                Boundary.off(Events.ENTER);
                Boundary.off(Events.EXIT);
                // Remove the boundary from native API´s
                Boundary.remove('GIZ')
                    .then(() => console.log('Goodbye GIZ :('))
                    .catch(e => console.log('Failed to delete GIZ :)', e))
            }
            },[]);
 */

  /****************fetch coords ************** */

  useLayoutEffect(() => {
    fetchUserLocation();
    //console.log('staticUser', staticUser);
  }, []);

  /**************** user background location ************** */
  const [enterBoundary, setEnterBoundary] = useState({
    isEnter: false,
  });

  /**************** fin ************** */

  const fetchUserLocation = async () => {
    Geolocation.watchPosition(
      position => {
        Userlongi.set(position.coords.longitude);

        Userlatu.set(position.coords.latitude);
        // console.log('position', position);
        setStaticUser(staticUser => ({
          ...staticUser,
          latitude: position.coords.latitude,
          //  latitude: location.latitude,
          longitude: position.coords.longitude,
          //  longitude: location.longitude,
        }));

        //var UserStaticLocation = position.coords.latitude + "," +  position.coords.longitude
      },
      error => {
        // See error code charts below.
        //console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**************** GetNearestPin + Bing  function ************** */
  const getNearestBing = async T => {
    /*
    setNewCircuit( T.filter(monument =>   {
          monument.longitude_monument !=  pinNAV.longitude;
        })
    )
     */

    // console.log('new circuit pin NAV', circuit);
    // console.log('new circuit from storage', newCircuit);
    //  console.log('user from fetch data', staticUser);

    const userLocation = Userlatu.get() + ',' + Userlongi.get();
    // const userLocation = 36.8546394504313 + ',' + 10.3325451882596;
    // AsyncStorage.setItem('circuit_vis', JSON.stringify( newCircuit)).then(res => console.log("set filterd",res) )
    if (Userlatu.get() != 0) {
      const BING_API_KEY =
        'AlfW3q3hiBH6n8FcT0Er02A2mVN_861wvOGgqoUNqzGv0QIp9zwpasUwrJsJzWXo';
      let BING_API = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${userLocation}&destinations=`;

      for (let i = 0; i <= T.length - 1; i++) {
        if (i != T.length - 1) {
          const Distance =
            T[i].latitude_monument + ',' + T[i].longitude_monument + ';';
          BING_API = BING_API + Distance;
        } else {
          const Distance =
            T[i].latitude_monument + ',' + T[i].longitude_monument;
          BING_API = BING_API + Distance;
        }
      }
      let BING_API_URL = BING_API + `&travelMode=walking&key=${BING_API_KEY}`;

      //  console.log('GRAPHHOPPER_API_URL', BING_API_URL);

      let fetchResult = fetch(BING_API_URL)
        .then(res => res.json())
        .then(res => {
          //        console.log('res.distances', res.resourceSets[0].resources[0].results);
          // /  setDistance(res.distances);
          /*
            setNewCircuit(res.resourceSets[0].resources[0].results);
            console.log('just new circuit', newCircuit)
            newCircuit.sort(function (a, b) {
              return a.travelDistance - b.travelDistance;
            })
            //  ;
            console.log('sorted new circuit 0', newCircuit);
          */
          // travelDistance
          let DistanceMonuments = res.resourceSets[0].resources[0].results;
          //      console.log('DistanceMonuments finale', DistanceMonuments);

          if (DistanceMonuments.length != 0) {
            var minDist = DistanceMonuments[0].travelDistance;
            var index = 0;
            for (let i = 1; i < DistanceMonuments.length; i++) {
              if (DistanceMonuments[i].travelDistance < minDist) {
                minDist = DistanceMonuments[i].travelDistance;
                index = DistanceMonuments[i].destinationIndex;
              }
            }

            //    console.log('index nearestPinCoord', index);

            var nearestPinCoord11 = T[index];
            NearestPin.set(nearestPinCoord11.orderMonument - 1);
            setNewCircuitVisited(nearestPinCoord11);

            //  console.log('set NearestPin', NearestPin.get());
            console.log('circuit visited from bing ', newCircuitVisited);
            var dnearestPinDistance = minDist;

            //    setNewCircuitVisited(nearestPinCoord11.orderMonument) ;

            longi.set(nearestPinCoord11.longitude_monument);

            latu.set(nearestPinCoord11.latitude_monument);
            /*
              if(index > -1) {
                var splice = newCircuit.splice(index, 0) ;
              }
       */

            //    console.log('spliced array', splice);
            //  console.log('splice . length', splice.length);
            var filterd = T.filter(monument => {
              return (
                monument.longitude_monument !==
                nearestPinCoord11.longitude_monument
              );
            });

            //    console.log('circuit filtred from BING', filterd);
            //   console.log('circuit filtred  length from BING', filterd.length);
            setNewCircuit(filterd);
            //      AsyncStorage.setItem('circuit_visited', newCircuitVisited).then(res => console.log("set visited",res)) ;
            AsyncStorage.setItem('circuit_vis', JSON.stringify(T)).then(res =>
              console.log('set circuit_vis', res),
            );

            //   console.log('nearestPinDistance', dnearestPinDistance);
            //   console.log('nearestPinCoord', nearestPinCoord11);
            //  console.log('sorted new circuit', newCircuit);
            //  console.log('pinNAV_0', longi.get(), latu.get());
            ///   AsyncStorage.setItem('newCircuit', filterd).then(res => {
            //  console.log('filterd from onArrive', res);
            //});

            setAllezVers(!allezVers);
          }
        });
    }
  };
  /**************** GetNearestPin Coords function ************** */
  function getNearestPinCoords(T) {
    const userLocation = Userlatu.get() + ',' + Userlongi.get();
    //    const userLocation = 36.8546394504313 + ',' + 10.3325451882596;

    if (Userlatu.get() != 0) {
      const BING_API_KEY =
        'AlfW3q3hiBH6n8FcT0Er02A2mVN_861wvOGgqoUNqzGv0QIp9zwpasUwrJsJzWXo';
      let BING_API = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${userLocation}&destinations=`;

      for (let i = 0; i <= T.length - 1; i++) {
        if (i != T.length - 1) {
          const Distance =
            T[i].latitude_monument + ',' + T[i].longitude_monument + ';';
          BING_API = BING_API + Distance;
        } else {
          const Distance =
            T[i].latitude_monument + ',' + T[i].longitude_monument;
          BING_API = BING_API + Distance;
        }
      }
      let BING_API_URL = BING_API + `&travelMode=walking&key=${BING_API_KEY}`;

      fetch(BING_API_URL)
        .then(res => res.json())
        .then(res => {
          // travelDistance
          let DistanceMonuments = res.resourceSets[0].resources[0].results;

          if (DistanceMonuments.length != 0) {
            var minDist = DistanceMonuments[0].travelDistance;
            var index = 0;
            for (let i = 1; i < DistanceMonuments.length; i++) {
              if (DistanceMonuments[i].travelDistance < minDist) {
                minDist = DistanceMonuments[i].travelDistance;
                index = DistanceMonuments[i].destinationIndex;
              }
            }

            var nearestPinCoord11 = T[index];
            NearestPin.set(nearestPinCoord11.orderMonument - 1);

            //   console.log('pin set eli mechilou index ', NearestPin.get());
          }
        });
    }
  }

  /**************** GetNearestPin function ************** */
  function getNearestPin(T) {
    const turf = require('@turf/distance').default;
    let from = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [staticUser.longitude, staticUser.latitude],
      },
    };

    let nearest_text = [];
    let units = 'kilometers';

    for (let i = 0; i < T.length; i++) {
      let minDist = 1000;

      /*********** destination: centre de site************/
      let to = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [T[i].longitude_monument, T[i].latitude_monument],
        },
      };
      let distance = turf(from, to, units);

      /****************** destination : monument ***********************/

      /***************** Fiche Monument POPUP *******************/

      if (distance < minDist) {
        minDist = distance;
        nearest_text = T[i];
      }
    }
    //console.log('coords ', nearest_text);
    //  console.log("nearestPin new", nearest_text);
    if (nearest_text) {
      /*
      pinNAV2.set({
        longitude:  nearest_text.longitude_monument,
        latitude:  nearest_text.latitude_monument,
      });
       */

      longi.set(nearest_text.longitude_monument);
      latu.set(nearest_text.latitude_monumen);
    }

    var filtred = T.filter(monument => {
      return monument.longitude_monument !== longi.get();
    });
    // console.log('longi + latu ', longi, latu);
    // console.log('filtreed ', filtred);
    setNewCircuit(filtred);

    // console.log('NewCircuit length', newCircuit);
    //  console.log('NewCircuit ', newCircuit);
    setAllezVers(!allezVers);
    // return nearest_text ;
  }
  /****************fetch data function ************** */

  const fetchData = async () => {
    try {
      setLoading(true);
      const {data: response} = await axios.get(props.url_api);

      setCircuit(ch => response.data);

      await AsyncStorage.getItem('circuit_vis').then(res => {
        //   res == null ? setNewCircuit(circuit) : setNewCircuit( JSON.parse(res));
        //  console.log('res before new cici', res);
        if (res == null) {
          setNewCircuit(response.data);
          getNearestPinCoords(response.data);
        } else {
          setNewCircuit(JSON.parse(res));
          getNearestPinCoords(JSON.parse(res));
        }
      });
      /*
      AsyncStorage.setItem('circuit_visited', JSON.stringify( newCircuitVisited)).then(res => {
        //   res == null ? setNewCircuit(circuit) : setNewCircuit( JSON.parse(res));
        console.log('res before new cici', res)
        res == null ? setNewCircuitVisited([]) : setNewCircuitVisited( JSON.parse(res));
      });
      console.log("circuit visited from fetchData", newCircuitVisited);
      console.log('new cici', newCircuit)
       */
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  /**************** Generate Random ID ************** */
  function makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /****************Initial Annotaion************** */
  let annotationRef = null;
  let [State, setState] = useState({
    isFetchingAndroidPermission: IS_ANDROID,
    isAndroidPermissionGranted: false,
    activeExample: -1,
  });

  let [location, setLocation] = useState({
    timestamp: 0,
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    heading: 0.0,
    accuracy: 0.0,
    speed: 0.0,
    coords: [],
    route: null,
  });

  const [permission, setPermission] = useState(false);
  useLayoutEffect(() => {
    const task = async () => {
      const per = await hasLocationPermission();
      setPermission(per);
    };
    task();
  }, []);

  /*
   */

  /******************* Get User location ******************************/
  function onUserLocationUpdate(location) {
    setLocation({
      timestamp: location.timestamp,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      speed: location.coords.speed,
    });
  }

  /****************Get Phone Permission ************** */
  async function hasLocationPermission() {
    if (
      Platform.OS === 'web' ||
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const isGranted = await MapboxGL.requestAndroidLocationPermissions();

    //console.log('isGranted', isGranted);
    return isGranted;
  }

  const onUserMarkerPress = () => {
    Alert.alert('You pressed on the user location annotation');
  };

  /*******************  Render Annotations Bubble  ****************************/
  function renderAnnotationsBubble() {
    const items = [];

    for (let i = 0; i < circuit.length; i++) {
      items.push(renderBubble(i));
    }
    //  console.log("items[0]", items[0])
    // setBubble(items);
    // console.log("items [0", items[0])
    return items;
  }

  /*******************  Render  Bubble  ****************************/
  function renderBubble(counter) {
    const id = `pointAnnotation${circuit[counter].nom_monument}`;
    const isGiz = props.order;
    let order;
    isGiz ? (order = `${circuit[counter].orderMonument}`) : (order = counter);

    // console.log('order', order);

    const coordinate = [
      parseFloat(circuit[counter].longitude_monument),
      parseFloat(circuit[counter].latitude_monument),
    ];
    const title = `${circuit[counter].nom_monument}`;
    const key = makeid(10);
    const pro = makeid(8);
    const pro2 = makeid(8);

    const featureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: title,
          properties: {
            id: title,
          },
          geometry: {
            type: 'Point',
            coordinates: coordinate,
          },
        },
      ],
    };
    //console.log("feature collection", featureCollection.geometry)

    return (
      <MapboxGL.ShapeSource
        id={pro2}
        hitbox={{width: 30, height: 30}}
        // onPress={this.onPress}
        shape={featureCollection}>
        {!isGiz && (
          <MapboxGL.CircleLayer
            //sourceID={+counter}
            // belowLayerID={id}
            id={pro}
            style={{
              circleColor: '#e59138',
              circleRadius: 10,
              circleTranslate: [10, -15],
            }}
          />
        )}

        {isGiz && (
          <MapboxGL.SymbolLayer
            id={key}
            style={{
              iconOptional: true,
              textIgnorePlacement: true,
              textField: `${title}`.toUpperCase(),
              textSize: 14,
              textMaxWidth: 70,
              textColor: '#f6a63d',
              textAnchor: 'center',
              textTranslate: [-10, -40],
              textAllowOverlap: true,
            }}
          />
        )}
      </MapboxGL.ShapeSource>
    );
  }
  /*******************  Render Annotations ****************************/

  function renderAnnotation(counter) {
    const id = `pointAnnotation${circuit[counter].nom_monument}`;
    const isGiz = props.order;
    let order;
    isGiz ? (order = `${circuit[counter].orderMonument}`) : (order = counter);
    const coordinate = [
      parseFloat(circuit[counter].longitude_monument),
      parseFloat(circuit[counter].latitude_monument),
    ];
    const title = `${circuit[counter].nom_monument}`;
    const key = makeid(6);
    const color = 'green';
    return (
      <MapboxGL.PointAnnotation
        key={key}
        id={id}
        title={title}
        coordinate={coordinate}
        ref={ref => (annotationRef = ref)}
        onSelected={
          () => {
            setopenFicheMonument(circuit[counter]);
            // setDourbia(!Dourbia)
            //setNextmonument(circuit[counter + 1])

            //     console.log('pin nav && order', firstNAV, order);
            //     console.log('firstNAV <= order', firstNAV <= order);
            //     console.log('firstNAV < order', firstNAV < order);
            sheetRef.current.snapTo(0);
            if (
              firstNAV >= order ||
              NearestPin.get() == order ||
              (firstNAV == 0 && order == 5)
            ) {
              //  console.log('modal open', typeof (firstNAV), typeof(order));
            }
            //   console.log('pin nav && order', firstNAV, order);

            //sheetRef.current.snapTo(0);
          }

          //     console.log("circuit[counter]",circuit[counter])
          //   console.log("openFicheMonument",openFicheMonument)
        }>
        <View style={styles.annotationContainer}>
          <PinOrder
            color={
              firstNAV < order
                ? /*||
              newCircuitVisited.find(element => {
                if (element.orderMonument === NearestPin.get() - 1) {
                  return true;
                }
                return false;
              })
              */
                  'url(#a)'
                : '#0b696b'
            }
            order={order}
          />
        </View>
        <MapboxGL.SymbolLayer
          id="teaCup"
          aboveLayerID="pointCircles"
          style={{
            iconImage: exampleIcon,
            iconSize: 1,
          }}
        />
      </MapboxGL.PointAnnotation>
    );
  }

  function renderAnnotations() {
    const items = [];

    for (let i = 0; i < circuit.length; i++) {
      items.push(renderAnnotation(i));
      //  console.log("items[0]", items[0])
    }

    return items;
  }

  /*************************Location Permission*******************************/
  if (IS_ANDROID && !permission) {
    if (State.isFetchingAndroidPermission) {
      return null;
    }
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.primary.orange}}
        forceInset={{top: 'always'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[styles.noPermissionsText, {fontFamily: 'SegoeUI'}]}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*******************************handle dourbia****************************/
  function handleDourbia(c, f) {
    setFlyTo({
      coords: [c[f].longitude_monument, c[f].latitude_monument],
      zoom: 20,
    });
    setTimeout(function () {
      setDourbiaNavi(true);
      setDourbia(!Dourbia);
      setFlying(!flying);
      setFlyTo({zoom: 13});
    }, 3000);
  }
  /*******************************handle Aller vers****************************/
  function handleAllerVers() {
    setFlyTo({
      coords: [
        circuit[NearestPin.get()].longitude_monument,
        circuit[NearestPin.get()].latitude_monument,
      ],
      zoom: 20,
    });
    setFlying(!flying);
    setFlyTo({zoom: 13});
    setTimeout(function () {
      //   setAllerVersNavi(true);
      setFlying(!flying);
      setFlyTo({zoom: 13});
    }, 3000);
  }
  const thematique = global.thematique;

  /************************* Render Map *******************************/
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {loading && <Loader />}
        {!loading && Dourbia && (
          <View style={{height: '80%'}}>
            <MapboxNavigation
              // mute={true}
              origin={[
                // location.longitude,
                // location.latitude,
                10.3325451882596, 36.8546394504313,
                /*    firstNAV == 0
                  ? 10.3325451882596
                  : parseFloat(circuit[firstNAV - 1].longitude_monument),
                firstNAV == 0
                  ? 36.8546394504313
                  : parseFloat(circuit[firstNAV - 1].latitude_monument),
                  */
              ]}
              destination={[
                parseFloat(circuit[firstNAV].longitude_monument),
                parseFloat(circuit[firstNAV].latitude_monument),
                /*
                firstNAV == 9
                  ? parseFloat(circuit[0].longitude_monument)
                  : parseFloat(circuit[firstNAV].longitude_monument),
                firstNAV == 9
                  ? parseFloat(circuit[0].latitude_monument)
                  : parseFloat(circuit[firstNAV].latitude_monument),
                  */
              ]}
              shouldSimulateRoute
              // showsEndOfRouteFeedback
              onLocationChange={event => {
                const {latitude, longitude} = event.nativeEvent;
              }}
              onRouteProgressChange={event => {
                const {
                  distanceTraveled,
                  durationRemaining,
                  fractionTraveled,
                  distanceRemaining,
                } = event.nativeEvent;
                //      console.log("event change", event.nativeEvent)
                //  console.log("distanceRemaining from event", event.nativeEvent.distanceRemaining)
              }}
              onError={event => {
                const {message} = event.nativeEvent;
              }}
              onCancelNavigation={() => {
                // User tapped the "X" cancel button in the nav UI
                // or canceled via the OS system tray on android.
                // Do whatever you need to here.
                //   setAllezVers(allezVers)
                setDourbia(!Dourbia);
                //   console.log('allez min cancel', allezVers);
                //      console.log('doubia min cancel', Dourbia);
                // navigation.goBack()
              }}
              onArrive={() => {
                // Called when you arrive at the destination.
                //     alert('hi')
                audio.pause();
                setPlaying(false);
                setopenFicheMonument(circuit[firstNAV]);
                //  setNextmonument(circuit[counter+1])
                //     console.log("open Fiche filtered", openFicheMonument)
                if (firstNAV == circuit.length - 1) {
                  setFinCircuit(circuit.length - 1);
                  //   console.log('fin circuit', finCircuit);
                  setFirstNAV(0);
                  setDourbiaNavi(false);
                  //setQ(6);
                  AsyncStorage.setItem('last_nav', '0').then(res => {
                    //   console.log('Q from arrive', questionnaire);
                  });
                } else {
                  setFirstNAV(firstNAV + 1);
                  setFinCircuit(0);

                  AsyncStorage.setItem(
                    'last_nav',
                    (firstNAV + 1).toString(),
                  ).then(res => {
                    //   console.log('res onarrive', res);
                  });
                }

                setDourbia(!Dourbia);
                sheetRef.current.snapTo(0);
              }}
            />
          </View>
        )}
        {!loading && allezVers && (
          <View style={{height: '80%'}}>
            <MapboxNavigation
              origin={[
                // staticUser.longitude,
                // staticUser.latitude,
                //    Userlongi.get(),
                //     Userlatu.get(),
                10.321394, 36.848944,
                // location.longitude,
                // location.latitude,
              ]}
              destination={[parseFloat(longi.get()), parseFloat(latu.get())]}
              shouldSimulateRoute
              // showsEndOfRouteFeedback
              onLocationChange={event => {
                const {latitude, longitude} = event.nativeEvent;
              }}
              onRouteProgressChange={event => {
                const {
                  distanceTraveled,
                  durationRemaining,
                  fractionTraveled,
                  distanceRemaining,
                } = event.nativeEvent;
              }}
              onError={event => {
                const {message} = event.nativeEvent;
              }}
              onCancelNavigation={() => {
                // User tapped the "X" cancel button in the nav UI
                // or canceled via the OS system tray on android.
                // Do whatever you need to here.
                setAllezVers(!allezVers);
                //    setDourbia(!Dourbia)
                //  console.log('allez min cancel2', allezVers);
                //  console.log('doubia min cancel', Dourbia);
                // navigation.goBack()
              }}
              onArrive={() => {
                audio.pause();
                setPlaying(false);
                /*  console.log(
                  'new circuit length onArrive NearestPin',
                  NearestPin.get(),
                );
                console.log('circuit[NearestPin-1]', circuit[NearestPin.get()]);
                */

                setopenFicheMonument(circuit[NearestPin.get()]);

                //  getNearestBing(newCircuit) ;
                getNearestPinCoords(newCircuit);
                if (newCircuit.length === 0) {
                  NearestPin.set(0);
                  setNewCircuit(circuit);
                  setNewCircuitVisited([]);
                  //    setAllerVersNavi(false);
                }

                setAllezVers(!allezVers);
                sheetRef.current.snapTo(0);
              }}
            />
          </View>
        )}
        {!loading && (
          <MapboxGL.MapView
            compassEnabled
            logoEnabled={true}
            compassViewPosition={2}
            onDidFinishRenderingMapFully={() => {
              setMapLoadded(true);
            }}
            style={styles.map}
            attributionEnabled={true}>
            <MapboxGL.UserLocation
              visible={true}
              animated={true}
              androidRenderMode={'normal'}
              renderMode={'native'}
              minDisplacement={0.1}
              showsUserHeadingIndicator={false}
              onUpdate={onUserLocationUpdate}
              onPress={onUserMarkerPress}></MapboxGL.UserLocation>
            <MapboxGL.ShapeSource
              id="user"
              hitbox={{width: 30, height: 30}}
              // onPress={this.onPress}
              shape={{
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    id: 'title',
                    properties: {
                      id: 'title',
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [location.longitude, location.latitude],
                    },
                  },
                ],
              }}>
              <MapboxGL.SymbolLayer
                id="userkey"
                style={{
                  iconOptional: true,
                  textIgnorePlacement: true,
                  textField: 'Vous êtes ici !',
                  textSize: 20,
                  textMaxWidth: 70,
                  textColor: 'blue',
                  textAnchor: 'center',
                  textTranslate: [20, -25],
                  textAllowOverlap: true,
                }}
              />
            </MapboxGL.ShapeSource>
            <MapboxGL.Camera
              zoomLevel={flyTo.zoom}
              // followUserMode={'FollowWithCourse'}
              // followUserLocation={flyTo.followMe}
              animationMode={'flyTo'}
              animationDuration={3000}
              centerCoordinate={flyTo.coords}
            />

            <PathDrawer
              coords={props.coordonnees}
              lineColor={props.LineColor}></PathDrawer>

            {renderAnnotations()}
            {renderAnnotationsBubble()}
          </MapboxGL.MapView>
        )}
        {!loading && Dourbia && (
          <View
            style={{
              height: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ListMonument
              firstNAV={firstNAV}
              circuit={circuit}
              order={openFicheMonument.orderMonument}
              prochainMonument={() => {
                console.log();
                // audio.pause();
                // setPlaying(false);
                setopenFicheMonument(circuit[firstNAV]);
                //  setNextmonument(circuit[counter+1])
                //     console.log("open Fiche filtered", openFicheMonument)
                if (firstNAV == circuit.length - 1) {
                  setFinCircuit(circuit.length - 1);
                  //   console.log('fin circuit', finCircuit);
                  setFirstNAV(0);
                  setDourbiaNavi(false);
                  //setQ(6);
                  AsyncStorage.setItem('last_nav', '0').then(res => {
                    //   console.log('Q from arrive', questionnaire);
                  });
                } else {
                  setFirstNAV(firstNAV + 1);
                  setFinCircuit(0);

                  AsyncStorage.setItem(
                    'last_nav',
                    (firstNAV + 1).toString(),
                  ).then(res => {
                    //   console.log('res onarrive', res);
                  });
                }
                setDourbia(!Dourbia);
                // sheetRef.current.snapTo(0);
              }}
            />
          </View>
        )}

        {!loading && allezVers && (
          <View
            style={{
              height: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ListMonumentAllezVers
              listCircuit={newCircuit}
              newCircuitVisited={newCircuitVisited}
              prochainMonument={() => {
                //   console.log(                  'new circuit length onArrive NearestPin',                  NearestPin.get(),              );
                //  console.log('circuit[NearestPin-1]', circuit[NearestPin.get()]);
                setopenFicheMonument(circuit[NearestPin.get()]);
                //  getNearestBing(newCircuit) ;
                getNearestPinCoords(newCircuit);
                if (newCircuit.length === 0) {
                  NearestPin.set(0);
                  setNewCircuit(circuit);
                  setNewCircuitVisited([]);
                  //    setAllerVersNavi(false);
                }
                setAllezVers(!allezVers);
              }}
            />
            {/* <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableHighlight
                style={styles.playBtn}
                onPress={playPause}
                underlayColor={'#ccd0d5'}>
                <MusicIcons
                  name={playing ? 'music-off' : 'music-note'}
                  size={30}
                  color={'#ffffff'}
                />
              </TouchableHighlight>
              <Text style={styles.monu}>
                Monument à visiter:
                <Text style={styles.monu_actu}>
                  {circuit[NearestPin.get()].nom_monument}
                </Text>
              </Text>
            </View> */}
            {/* <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Button
                //   title={newCircuit.length == 10 ? "Aller vers":  "Continuer" }
                style={styles.skip}
                title={'Passer au monument suivant'}
                color="#e59138"
                onPress={() => {
                  audio.pause();
                  setPlaying(false);
                  //   console.log(                  'new circuit length onArrive NearestPin',                  NearestPin.get(),              );
                  //  console.log('circuit[NearestPin-1]', circuit[NearestPin.get()]);
                  setopenFicheMonument(circuit[NearestPin.get()]);
                  //  getNearestBing(newCircuit) ;
                  getNearestPinCoords(newCircuit);
                  if (newCircuit.length === 0) {
                    NearestPin.set(0);
                    setNewCircuit(circuit);
                    setNewCircuitVisited([]);
                    //    setAllerVersNavi(false);
                  }
                  setAllezVers(!allezVers);
                  sheetRef.current.snapTo(0);
                }}
              />
            </View> */}
          </View>
        )}

        {!Dourbia && !allezVers && mapLoadded && (
          <>
            <View style={styles.btnDourbia}>
              {newCircuit.length == 9 && (
                <Pressable
                  style={{
                    padding: 13,
                    borderRadius: 10,
                    backgroundColor: '#E59138',
                    alignItems: 'center',
                    // marginVertical: 2,
                    width: Dimensions.get('window').width * 0.45,
                    // alignSelf: 'center',
                    height: 60,
                    marginRight: 5,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    handleDourbia(circuit, firstNAV);
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'white',
                      fontFamily: 'SegoeUI',
                    }}>
                    DOURBIA !
                  </Text>
                </Pressable>
              )}
              {!dourbiaNavi && (
                <Pressable
                  style={{
                    padding: 13,
                    borderRadius: 10,
                    backgroundColor: '#E59138',
                    alignItems: 'center',
                    marginVertical: 2,
                    width: Dimensions.get('window').width * 0.45,
                    // alignSelf: 'center',
                    height: 60,
                    marginLeft: 5,
                    justifyContent: 'center',
                  }}
                  onPress={
                    () => {
                      handleAllerVers();
                      getNearestBing(newCircuit);

                      //     setAllezVers(!allezVers)
                      //        getNearestBing(newCircuit)
                    }
                    // console.log('allez min cancel', allezVers)
                  }>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'white',
                      fontFamily: 'SegoeUI',
                    }}>
                    ALLER VERS
                  </Text>
                </Pressable>
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                top: '3%',
                right: '3%',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <TouchableHighlight
                style={styles.playBtn}
                // onPress={playPause}
                onPress={() => setVisibleMusic(true)}
                underlayColor={'#ccd0d5'}>
                <MusicIcons name={'music-note'} size={30} color={'#000000'} />
              </TouchableHighlight>
              <TakePhoto userId={id} />
              {/* <Pressable onPress={() => setShowModal(true)}>
                <Image
                  source={require('../../Components/Images/icones/shop.png')}
                  style={{width: 50, height: 50, marginTop: 5}}
                />
              </Pressable> */}
            </View>
          </>
        )}

        <BottomSheet
          ref={sheetRef}
          snapPoints={[Dimensions.get('window').height * 0.7, 0]}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true} //for swipe
          borderRadius={10}
          renderContent={renderContent}
          // renderHeader={renderHeader}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleMusic}
        onRequestClose={() => {
          setVisibleMusic(false);
        }}>
        <ListMusic
          visibleMusic={visibleMusic}
          setVisibleMusic={setVisibleMusic}
          playPause={playPause}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <ModalDemo
          UserId={id}
          nomcircuit={thematique}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <ModalFeedback UserId={id} setShowModal={setShowModal} />
      </Modal>
      {/* <Modal  animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(false);
        }}>
            <ModalCircuitFinished
             setModalVisible1={setModalVisible1}
             modalVisible1={modalVisible1}
            />
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 60,
    height: 95,
    marginLeft: 150,
  },
  title: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    marginTop: 300,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
  },
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  btnDourbia: {
    // backgroundColor: 'red',
    //  borderWidth: 2,
    position: 'absolute',
    bottom: '5%',
    //left:"25%",
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
    // paddingHorizontal: 32,
    //  borderRadius: 10,
    //   elevation: 3,
    //backgroundColor: '#e59138',
    //marginTop: 25,
    width: '90%',
    height: 60,
    // alignSelf: 'center',
    marginLeft: '3%',
  },
  skip: {
    //  borderColor: "red",
    //  borderWidth: 2,
    // position: 'absolute',
    // top: '1%',
    //left:"25%",
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 32,
    //  borderRadius: 10,
    //   elevation: 3,
    //backgroundColor: '#e59138',
    //marginTop: 25,
    width: '20%',
    height: 50,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    height: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {
      width: -1,
      height: -3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    // marginBottom: 10,
  },
  monu: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  monu_actu: {
    color: '#e59138',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  monu_next: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
    marginBottom: 5,
  },
});
