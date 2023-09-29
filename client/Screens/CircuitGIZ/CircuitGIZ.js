import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Pressable,
  Dimensions,
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

//import turf from '@turf/distance';

import {IS_ANDROID} from '../../Config/permission';
import colors from '../../Config/colors';
import PathDrawer from '../../Components/PathDrawer/PathDrawer';

import {coordonnees_pedestre_GIZ} from '../../Utils/coordonnees';
import {coordonnees_velo_GIZ} from '../../Utils/coordonnees';

import {intersection_30km_Route} from '../../Utils/coordonnees';
import {coordonnees_cercle} from '../../Utils/coordonnees';
import Geolocation from 'react-native-geolocation-service';
import Simplepin from '../../Components/Pin/SimplePin';
import exampleIcon from '../../Components/Images/svg.png';
import PinPedestre from '../../Components/Pin/PinPedestre';
import PinCyclable from '../../Components/Pin/PinCyclable';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';

import baseURL from '../../assests/baseUrl';
// import { useState  as State2}  from '@hookstate/core';
export default function CircuitGIZ({navigation}) {
  const navigationFromComponent = string => {
    switch (string) {
      case 'Circuit Cyclable':
        return navigation.navigate('Cyclable');
        break;
      case 'Circuit Pedestre':
        return navigation.navigate('Pedestre');
      default:
        break;
    }
  };
  global.navigationFromComponent = navigationFromComponent;
  /**************** set nearest point circle to user ************** */
  /**************** set nearest point circle to user ************** */
  var minDissToCircle = [];
  const [toCarthage, setToCarthage] = useState(false);

  let [NearestCircle, setNearestCircle] = useState([10.02519, 36.73741]);

  const [mapLoadded, setMapLoadded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [circuitGIZ, setCircuitGIZ] = useState([]);

  /********** Fetching data from Thematique table **********/

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/giz`);

      setCircuitGIZ(response.data.data);
    } catch (err) {
      console.error(err, 'API Problem');
    }
  };
  useLayoutEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, []);
  /****************fetch coords ************** */

  let [staticUser, setStaticUser] = useState({
    latitude: 0,
    longitude: 0,
    coords: [],
  });

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        //     console.log("position", position);
        setStaticUser({
          // latitude: 36.82290347188283,
          latitude: location.latitude,
          //  longitude: 10.670117976839656,
          longitude: location.longitude,
        });
        //var UserStaticLocation = position.coords.latitude + "," +  position.coords.longitude
        /******************Nearest circle *************************/
        const turf = require('@turf/distance').default;
        let from = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        };

        let nearest_circle_point = [];
        let units = 'kilometers';
        let minDist = 1000;
        for (let i = 0; i < intersection_30km_Route.length; i++) {
          /*********** destination: centre de site************/
          let to = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [
                intersection_30km_Route[i].LON,
                intersection_30km_Route[i].LAT,
              ],
            },
          };
          let distanceCercle = turf(from, to, units);

          if (distanceCercle < minDist) {
            minDist = distanceCercle;
            nearest_circle_point = intersection_30km_Route[i];

            console.log('min dist', minDist);
            console.log('distanceCercle dist', distanceCercle);

            //   console.log('nearest_circle_point ', nearest_circle_point);
            console.log('static user coord ', staticUser);
          }

          setNearestCircle([
            nearest_circle_point.LON,
            nearest_circle_point.LAT,
          ]);
          console.log('nearest_circle_point 2 ', nearest_circle_point);
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    setLoading(false);
  };

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
          coordinates: [10.330597875959908, 36.84840237129573],
        },
      },
    ],
  };
  const featureCollectionVelo = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '1',
        properties: {
          id: '1',
        },
        geometry: {
          type: 'Point',
          coordinates: [10.329141137859361, 36.85250180939111],
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

  const dis = require('@turf/distance').default;
  var from = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [10.3325451882596, 36.8546394504313],
    },
  };
  var to = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    },
  };
  var units = 'kilometers';
  var pathSite = dis(from, to, units);
  //console.log('distance / site ', pathSite);
  //console.log('user coords ', location.longitude, location.latitude);
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
          <View style={styles.spinner}>
            <Text style={styles.title}>Chargement en cours...</Text>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        {!loading &&
          (!toCarthage ? (
            <MapboxGL.MapView
              onDidFinishRenderingMapFully={() => {
                setMapLoadded(true);
              }}
              style={styles.map}
              logoEnabled={false}
              attributionEnabled={false}
              //     styleURL={map.light}
              //  styleURL="mapbox://styles/mapbox/light-v10"
              //   styleURL = 'MapboxGL.StyleURL.Light'
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
                onPress={onUserMarkerPress}>
                <MapboxGL.Callout title="Vous êtes ici !" />
              </MapboxGL.UserLocation>
              <MapboxGL.Camera
                zoomLevel={13}
                followUserMode={'normal'}
                //  followUserLocation
                animationMode={'flyTo'}
                animationDuration={7000}
                centerCoordinate={[10.3325451882596, 36.8546394504313]}
              />
              <PathDrawer
                coords={coordonnees_pedestre_GIZ}
                lineColor="red"
                lineDasharray={[3, 3]}></PathDrawer>
              <PathDrawer
                coords={coordonnees_velo_GIZ}
                lineColor="blue"
                lineDasharray={[3, 3]}></PathDrawer>
              {/* pour hors perimetre */}
              {pathSite <= 500000000 && (
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
                        textField: 'circuit pédestre',
                        textSize: 20,
                        textMaxWidth: 50,
                        textColor: 'red',
                        textAnchor: 'center',
                        textTranslate: [0, 40],
                        textAllowOverlap: true,
                      }}>
                      <TouchableOpacity

                      //  onPress={alert('hoooo')}
                      />
                    </MapboxGL.SymbolLayer>
                  </MapboxGL.ShapeSource>

                  <MapboxGL.PointAnnotation
                    key={'key'}
                    id={'pedsetre'}
                    title={'circuit pedestre'}
                    coordinate={[10.330597875959908, 36.84840237129573]}
                    ref={ref => (annotationRef = ref)}
                    onSelected={() =>
                      navigation.navigate('Introduction', {
                        thematique: circuitGIZ[2].nom_thematique,
                        description: circuitGIZ[2].description_thematique,
                        id_thematique: circuitGIZ[2].id,
                      })
                    }>
                    <View style={styles.annotationContainer}>
                      <PinPedestre />
                    </View>
                  </MapboxGL.PointAnnotation>

                  <MapboxGL.ShapeSource
                    id="destinationVelo"
                    hitbox={{width: 100, height: 100}}
                    // onPress={alert("hi theere")}
                    shape={featureCollectionVelo}>
                    <MapboxGL.SymbolLayer
                      //    onPress={alert("hi thre")}
                      id="notificationCountVelo"
                      minZoomLevel={10}
                      style={{
                        iconOptional: true,
                        textIgnorePlacement: true,
                        textField: 'circuit cyclable',
                        textSize: 20,
                        textMaxWidth: 50,
                        textColor: 'blue',
                        textAnchor: 'center',
                        textTranslate: [0, 40],
                        textAllowOverlap: true,
                      }}>
                      <TouchableOpacity

                      //  onPress={alert('hoooo')}
                      />
                    </MapboxGL.SymbolLayer>
                  </MapboxGL.ShapeSource>
                  <MapboxGL.PointAnnotation
                    key={'keyV'}
                    id={'velo'}
                    title={'circuit Cyclable'}
                    coordinate={[10.329141137859361, 36.85250180939111]}
                    ref={ref => (annotationRef = ref)}
                    onSelected={() =>
                      navigation.navigate('Introduction', {
                        thematique: circuitGIZ[0].nom_thematique,
                        description: circuitGIZ[0].description_thematique,
                        id_thematique: circuitGIZ[0].id,
                      })
                    }>
                    <View style={styles.annotationContainer}>
                      <PinCyclable />
                    </View>
                  </MapboxGL.PointAnnotation>
                </View>
              )}
              {pathSite > 50 && (
                <View>
                  <PathDrawer
                    coords={coordonnees_cercle}
                    lineColor="#e59138"></PathDrawer>
                  {/* <MapboxGL.ShapeSource id="line1" shape={state.route}>
                    <MapboxGL.LineLayer
                      id="linelayer1"
                      style={{
                        lineColor: 'red',
                        lineWidth: 5,
                        lineDasharray: [2, 2],
                      }}
                    />
                  </MapboxGL.ShapeSource> */}
                </View>
              )}
            </MapboxGL.MapView>
          ) : (
            <MapboxNavigation
              origin={[staticUser.longitude, staticUser.latitude]}
              destination={NearestCircle}
              // shouldSimulateRoute
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
                setToCarthage(!toCarthage);
              }}
              onArrive={() => {
                // Called when you arrive at the destination.
                setToCarthage(!toCarthage);
              }}
            />
          ))}

        {pathSite > 50 && !toCarthage && mapLoadded && (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              // left: '10%',
              bottom: '1%',
              zIndex: 10,
              flexDirection: 'column',
              alignItems: 'center',
              height: '30%',
            }}>
            <View style={styles.warnning}>
              <Text>
                {' '}
                Vous êtes hors périmètre! Envie de commencer l'expérience?
                Veuillez rester à proximité du site archéologique (Max 30km)
              </Text>
            </View>

            <View style={styles.btnDourbia}>
              <Pressable
                style={{
                  padding: 13,
                  borderRadius: 10,
                  backgroundColor: '#E59138',
                  alignItems: 'center',
                  marginVertical: 2,
                  width: Dimensions.get('window').width * 0.4,
                  // alignSelf: 'center',
                  height: 50,
                }}
                onPress={() => setToCarthage(!toCarthage)}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Navigation
                </Text>
              </Pressable>
              <Pressable
                style={{
                  padding: 13,
                  borderRadius: 10,
                  backgroundColor: '#E59138',
                  alignItems: 'center',
                  marginVertical: 2,
                  width: Dimensions.get('window').width * 0.4,
                  // alignSelf: 'center',
                  height: 50,
                }}
                onPress={() => navigation.navigate('ListCircuit')}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Voir les circuits
                </Text>
              </Pressable>
              {/* <Button
                  title="Navigation"
                  color="#e59138"
                  onPress={() => setToCarthage(!toCarthage)}
                /> */}

              {/* <Button
                  title="Voir les circuits"
                  color="#e59138"
                  onPress={() => navigation.navigate('ListCircuit')}
                /> */}
            </View>
          </View>
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
    bottom: '5%',
    //left:"25%",
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingVertical: 5,
    // paddingHorizontal: 32,
    //  borderRadius: 10,
    //   elevation: 3,
    //backgroundColor: '#e59138',
    //marginTop: 25,
    alignSelf: 'center',
    width: '90%',
    height: 50,
  },
});
