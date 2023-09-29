import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';

import MapLibreGL from '@react-native-mapbox-gl/maps';
import {Alert} from 'react-native';
MapboxGL.setAccessToken(
  'sk.eyJ1IjoiYmFsYnlubyIsImEiOiJja3YyZnd1M3cwYzkwMnVzM2V4bjUzdGZ5In0.1h8LTXwbOC_Eqml-3lUMJQ',
);
import baseUrl from '../../assests/baseUrl';

import {Platform} from 'react-native';



import {IS_ANDROID} from '../../Config/permission';
import colors from '../../Config/colors';
import PathDrawer from '../../Components/PathDrawer/PathDrawer';

import {circuit_Kolna_Nemchiw_bizerte} from '../../Utils/coordonnees';
import Loader from '../../Screens/ActivityIndicator/Loader';
import {intersection_30km_Route} from '../../Utils/coordonnees';
import {coordonnees_cercle} from '../../Utils/coordonnees';
import Geolocation from 'react-native-geolocation-service';
import Simplepin from '../../Components/Pin/SimplePin';
import exampleIcon from '../../Components/Images/svg.png';
import PinPedestre from '../../Components/Pin/PinPedestre';
import PinCyclable from '../../Components/Pin/PinCyclable';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assests/baseUrl';
import PinKolnaNemchiw from '../../Components/Pin/PinKolnaNemchiw';
import KolnaImage from '../../assests/PinKilnaNemchiw.png';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function CircuitBizerte({navigation, route}) {
  /**************** set nearest point circle to user ************** */
  /**************** set nearest point circle to user ************** */
  var minDissToCircle = [];
  const [toCarthage, setToCarthage] = useState(false);

  let [NearestCircle, setNearestCircle] = useState([]);
  const [mapLoadded, setMapLoadded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [circuitGIZ, setCircuitGIZ] = useState([]);

  /********** Fetching data from Thematique table **********/






  /****************fetch coords ************** */

  let [staticUser, setStaticUser] = useState({
    latitude: 0,
    longitude: 0,
    coords: [],
  });

  useEffect(() => {
    fetchUserLocation();
  //  console.log('sdnsdmfj;n');
  }, []);

  const fetchUserLocation = async () => {
    await Geolocation.watchPosition(
      position => {
        // console.log('position', position);
        setStaticUser(staticUser => ({
          ...staticUser,
          latitude: position.coords.latitude,
          //  latitude: location.latitude,
          longitude: position.coords.longitude,
          //  longitude: location.longitude,
        }));

        //var UserStaticLocation = position.coords.latitude + "," +  position.coords.longitude
        /******************Nearest circle *************************/


        /*************************************************************/
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 1500, maximumAge: 1000},
    );

  };

  const centerMap = [9.87928648962827 , 37.28252095280493] ;
  const featureCollectionPieton = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '2',
        properties: {
          id: '2',
        },
        geometry: {
          type: 'Point',
          coordinates: centerMap,
        },
      },
    ],
  };

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
  useEffect(() => {
    const task = async () => {
      const per = await hasLocationPermission();
      setPermission(per);
    };
    task();
  }, [false]);

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

    //    console.log('isGranted', isGranted);
    return isGranted;
  }

  const onUserMarkerPress = () => {
    Alert.alert('You pressed on the user location annotation');
  };
  /********************* User distance / nearest point in  circle ***********************************/


  /******************** Render Map ************************************/
  if (IS_ANDROID && !permission) {
    if (State.isFetchingAndroidPermission) {
      return null;
    }
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.primary.orange}}
        alterInset={{top: 'always'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.noPermissionsText}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {loading && (
       <Loader/>
        )}
        {!loading  && (
            <MapboxGL.MapView
              onDidFinishRenderingMapFully={() => {
                setMapLoadded(true);
              }}
              compassEnabled={true}
              style={styles.map}
              logoEnabled={true}
              attributionEnabled={true}
              //     styleURL={map.light}
              // styleURL="mapbox://styles/mapbox/light-v10"
              //    styleURL = 'MapboxGL.StyleURL.Light'
              //   showUserLocation={true}
              centerCoordinate={[location.longitude, location.latitude]}>
              <MapboxGL.UserLocation
                visible={true}
                animated={true}
                androidRenderMode={'compass'}
                renderMode={'native'}
                minDisplacement={0.1}
                showsUserHeadingIndicator={true}
                onUpdate={onUserLocationUpdate}
                onPress={onUserMarkerPress}></MapboxGL.UserLocation>
              <MapboxGL.Camera
                zoomLevel={13}
                followUserMode={'normal'}
                //  followUserLocation
                animationMode={'flyTo'}
                animationDuration={7000}
                centerCoordinate={centerMap}
              />
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
                    textColor: '#f6a63d',
                    textAnchor: 'center',
                    textTranslate: [20, -25],
                    textAllowOverlap: true,
                  }}
                />
              </MapboxGL.ShapeSource>
              <PathDrawer
                coords={circuit_Kolna_Nemchiw_bizerte}
                lineColor="#e59138"
                lineDasharray={[3, 3]}></PathDrawer>

              { mapLoadded && (
                <View>
                  <MapboxGL.ShapeSource
                    id="destinationPieton"
                    hitbox={{width: 100, height: 100}}
                    // onPress={alert("hi theere")}
                    shape={featureCollectionPieton}>
                    <MapboxGL.SymbolLayer
                      id="notificationCountPieton"
                      minZoomLevel={10}
                      style={{
                        iconOptional: true,
                        textIgnorePlacement: true,
                        textField: 'Appuyez  pour commencer',
                        textSize: 20,
                        textMaxWidth: 50,
                        textColor: '#e59138',
                        textAnchor: 'center',
                        textTranslate: [0, 40],
                        textAllowOverlap: true,
                      }}>
                      <TouchableOpacity

                      //  onPress={alert('hoooo')}
                      />
                    </MapboxGL.SymbolLayer>
                  </MapboxGL.ShapeSource>
                  {mapLoadded && (
                    <MapboxGL.PointAnnotation
                      key={'key'}
                      id={'bizerte'}
                      title={'circuit bizerte'}
                      coordinate={centerMap}
                      ref={ref => (annotationRef = ref)}
                      onSelected={() => navigation.navigate('Introduction')}>
                      <PinKolnaNemchiw />
                    </MapboxGL.PointAnnotation>
                  )}
                </View>
              )}

            </MapboxGL.MapView>
          )}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tinyLogo: {
    zIndex: 1000,
    width: 60,
    height: 70,
    // marginLeft: 150,
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
  buttons: {
    width: 80,
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    top: '1%',
    left: '70%',
    zIndex: 10,
  },
  warnning: {
    //right: "10%",
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 100,
    //backgroundColor:"#F5FCFF",
    backgroundColor: 'rgba(224, 224, 228,0.5)',
    position: 'absolute',
    //top:"20%",
    zIndex: 10,
    borderRadius: 15,
  },
  btnDourbia: {
    //  borderColor: "red",
    //  borderWidth: 2,
    position: 'absolute',
    top: '1%',
    //left:"25%",
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 32,
    //  borderRadius: 10,
    //   elevation: 3,
    //backgroundColor: '#e59138',
    //marginTop: 25,
    width: '100%',
    height: 50,
  },
});
