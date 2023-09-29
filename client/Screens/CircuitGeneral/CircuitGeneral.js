import React, {useState, useEffect,useLayoutEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Pressable, Button
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';


import MapLibreGL from '@react-native-mapbox-gl/maps';
import {Alert} from 'react-native';
MapboxGL.setAccessToken(
  'sk.eyJ1IjoiYmFsYnlubyIsImEiOiJja3YyZnd1M3cwYzkwMnVzM2V4bjUzdGZ5In0.1h8LTXwbOC_Eqml-3lUMJQ',
);

import {Platform} from 'react-native';

//import turf from '@turf/distance';

import {IS_ANDROID} from '../../Config/permission';
import colors from '../../Config/colors';
import PathDrawer from '../../Components/PathDrawer/PathDrawer';

import {coordonnees_punique} from '../../Utils/coordonnees';
import {coordonnees_bizantin} from '../../Utils/coordonnees';
import {coordonnees_romain} from '../../Utils/coordonnees';
import {coordonnees_cercle} from '../../Utils/coordonnees';
import Geolocation from 'react-native-geolocation-service';
import MapboxNavigation from "@homee/react-native-mapbox-navigation";
import { CopilotStep } from 'react-native-copilot';


export default function CircuitGeneral({navigation}) {
  const [toCarthage, setToCarthage] = useState(false);
  /**************** set nearest point circle to user ************** */
  var minDissToCircle = [] ;
  
  let [ NearestCircle, setNearestCircle] = useState([]) ;
  /****************fetch coords ************** */
  const [loading, setLoading] = useState(true);

  let [staticUser, setStaticUser] = useState({
    latitude: 36.844562,
    longitude: 10.3259761,
    coords: []
  })

  /**************** render dynamic path to site  ************** */
  const [pathSite, setPathToSite] = useState(null);
  useLayoutEffect( () => {
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
        coordinates: [ staticUser.longitude,staticUser.latitude],
      },
    };
    var units = 'kilometers';
    var diss = dis(from, to, units);
    console.log('distance / site from circuit general', pathSite);
    console.log('user coords  from circuit general', location.longitude, location.latitude);
    setPathToSite(diss)
  }, [staticUser]);

  /**************************************/
  useLayoutEffect( async () => {
    setLoading(true)


    await fetchUserLocation()
  }, []);

  const fetchUserLocation = async () => {

    await  Geolocation.getCurrentPosition(
        (position) => {
          console.log("position", position);
          setStaticUser({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          //var UserStaticLocation = position.coords.latitude + "," +  position.coords.longitude
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );
    setLoading(false);
  }
  const state = {
    route:
        {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [
                    10.3259761, 36.844562
                  ],
                  [
                    staticUser.longitude, staticUser.latitude
                  ]
                ]
              }
            }
          ]
        },
  }
  const featureCollection = {
    "type": "FeatureCollection",
    "features": [
      {
        type: "Feature",
        id: "1",
        properties: {
          id: "1"
        },
        geometry: {
          type: "Point",
          coordinates: [10.3259761, 36.844562],
        },
      }
    ]
  }
  const lineStyle = {
    lineLayer: {
      lineColor: 'red',
      lineCap: 'round',
      lineJoin: 'round',
      lineWidth: 4,
    },
  };
  const coordos = coordonnees_punique;
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

    console.log('isGranted', isGranted);
    return isGranted;
  }

  const onUserMarkerPress = () => {
    Alert.alert('You pressed on the user location annotation');
  };
  /********************* User distance / nearest point in  circle ***********************************/
/*

   coordonnees_cercle.forEach( e=> {
    // console.log("cercle e:", e)
     const dis = require('@turf/distance').default;
     let from = {
       type: 'Feature',
       properties: {},
       geometry: {
         type: 'Point',
         coordinates: [e[0], e[1]],
       },
     };
     let to = {
       type: 'Feature',
       properties: {},
       geometry: {
         type: 'Point',
         coordinates: [location.longitude, location.latitude],
       },
     };
     let units = 'kilometers';
     let diss = dis(from, to, units);
     minDissToCircle.push([diss, e])

       }

   )
  setNearestCircle(minDissToCircle.sort()[0]) ;
  console.log("cercle nbre point:", coordonnees_cercle.length)
  console.log("min diss array:", NearestCircle)
  */
  /********************* User distance / site ***********************************/
  /*
    var from = turf.point([ 10.3325451882596, 36.8546394504313]);
    var to = turf.point([location.latitude,location.longitude]);
  //  var options = {units: 'miles'};

    var distance = turf.distance(from, to);
    console.log("distance / site ", distance)
*/


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
        {loading &&


        <View style={styles.spinner}>

          <Text style={styles.title}>Chargement en cours...</Text>
          <ActivityIndicator size="large" color="white" />
        </View>
        }
        {!loading &&  ( !toCarthage ? (
        <MapboxGL.MapView
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={false}
          //     styleURL={map.light}
          styleURL="mapbox://styles/mapbox/light-v10"
          //   styleURL = 'MapboxGL.StyleURL.Light'
          //   showUserLocation={true}
          centerCoordinate={[location.longitude, location.latitude]}>
          <MapboxGL.UserLocation
            visible={true}
            animated={true}
            androidRenderMode={'normal'}
            renderMode={'native'}
            minDisplacement={0.1}
            showsUserHeadingIndicator={false}
            onUpdate={onUserLocationUpdate}
            onPress={onUserMarkerPress}>
            <MapboxGL.Callout title="Vous êtes ici !" />
          </MapboxGL.UserLocation>

          <MapboxGL.ShapeSource
              id="user"
              hitbox={{ width: 30, height: 30 }}
              // onPress={this.onPress}
              shape={ {
                "type": "FeatureCollection",
                "features": [
                  {
                    type: "Feature",
                    id: "title",
                    properties: {
                      id: "title"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [staticUser.longitude, staticUser.latitude],
                    },
                  }
                ]
              }}
          >
            <MapboxGL.SymbolLayer
                id='userkey'
                style={{
                  iconOptional: true,
                  textIgnorePlacement: true,
                  textField: `Vous êtes ici !`,
                  textSize: 20,
                  textMaxWidth: 70,
                  textColor: '#f6a63d',
                  textAnchor: 'center',
                  textTranslate: [20, -25],
                  textAllowOverlap: true,

                }}
            />
          </MapboxGL.ShapeSource>

          <MapboxGL.Camera
            zoomLevel={13}
            followUserMode={'normal'}
            //  followUserLocation
            animationMode={'flyTo'}
            animationDuration={7000}
            centerCoordinate={[10.3325451882596, 36.8546394504313]}
          />
          <PathDrawer
            coords={coordonnees_punique}
            lineColor="purple"></PathDrawer>
          <PathDrawer
            coords={coordonnees_bizantin}
            lineColor="gold"></PathDrawer>
          <PathDrawer coords={coordonnees_romain} lineColor="red"></PathDrawer>



          <MapboxGL.ShapeSource
              id="destination"
              hitbox={{ width: 100, height: 100 }}
             // onPress={navigation.navigate("CircuitPunique")}
                shape={featureCollection}>

            <MapboxGL.SymbolLayer
            //    onPress={alert("hi thre")}
                id="notificationCount"
                minZoomLevel={10}
                style={{
                  iconOptional: true,
                  textIgnorePlacement: true,
                  textField: "circuit punique",
                  textSize: 20,
                  textMaxWidth: 50,
                  textColor: 'purple',
                  textAnchor: 'center',
                  textTranslate: [22, -22],
                  textAllowOverlap: true
                }}
            >

              </MapboxGL.SymbolLayer>
          </MapboxGL.ShapeSource>
          {
            (pathSite > 30)  &&
                <View>
                  <PathDrawer coords={coordonnees_cercle} lineColor="#e59138"></PathDrawer>
                  <MapboxGL.ShapeSource id='line1' shape={state.route}>
                    <MapboxGL.LineLayer id='linelayer1' style={{lineColor: '#e59138', lineWidth: 5, lineDasharray:[1,1]}} />
                  </MapboxGL.ShapeSource>


                </View>


          }

        </MapboxGL.MapView>
        ):
            <MapboxNavigation
                origin={[staticUser.longitude,staticUser.latitude]}
                destination={[10.3325451882596, 36.8546394504313]}
                shouldSimulateRoute
                showsEndOfRouteFeedback

                onLocationChange={(event) => {
                  const { latitude, longitude } = event.nativeEvent;
                }}
                onRouteProgressChange={(event) => {
                  const {
                    distanceTraveled,
                    durationRemaining,
                    fractionTraveled,
                    distanceRemaining,
                  } = event.nativeEvent;
                }}
                onError={(event) => {
                  const { message } = event.nativeEvent;
                }}
                onCancelNavigation={() => {
                  // User tapped the "X" cancel button in the nav UI
                  // or canceled via the OS system tray on android.
                  // Do whatever you need to here.
                  setToCarthage(!toCarthage)


                }}
                onArrive={() => {
                  // Called when you arrive at the destination.
                  alert('hi')
                }}
            />

        )

        }

        { !toCarthage && (
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() =>
                navigation.navigate('CircuitGIZ')}>
              <Text style={{flex: 1, color: "cyan"}}> CircuitGIZ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                navigation.navigate('CircuitPunique')}>
              <Text style={{flex: 1, color: "purple"}}> Punique</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                navigation.navigate('CircuitByzantine')}>
              <Text style={{flex: 1, color: "green"}}> byza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                navigation.navigate('CircuitRomaine')}>
              <Text style={{flex: 1, color: "gold"}}> Roma</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                navigation.navigate('CircuitVelo')}>
              <Text style={{flex: 1, color: "blue"}}> Circuit velo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                navigation.navigate('CircuitPedestre')}>
              <Text style={{flex: 1, color: "red"}}> Circuit pedestre</Text>
            </TouchableOpacity>
          </View>
        )
        }
        {
          ( (pathSite > 30 && !toCarthage) &&
          <View style={{ width: '90%',position:'absolute',left: '10%', bottom:"1%", zIndex:10,flexDirection: "column",alignItems: "center",height:'30%'}}>
            <View  style={styles.warnning}>
              <Text > Vous êtes hors périmètre!
                Envie de commencer l'expérience?
                Veuillez rester à proximité
                du site archéologique (Max 30km)
              </Text>
            </View>

            <View style={{ alignItems: 'center',justifyContent: 'center', top: "60%"}} >
              <View style={styles.btnDourbia}  >
           
                  <Button
                      title="Navigation"
                      color="#e59138"
                      onPress={() => setToCarthage(!toCarthage)}
                  />
             




                <Button
                    title="Voir les circuits"
                    color="#e59138"
                    onPress={() => navigation.navigate('ListScreen')}
                />


              </View>
            </View>
          </View>


        )
        }
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
    color: 'white',
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
    backgroundColor: 'black'
  },
  buttons: {
    width:80,
    backgroundColor:"#F5FCFF",
    position:'absolute',
    top:"1%",left:"70%",
    zIndex:10

  },
  warnning: {
    //right: "10%",
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: "center",
    width:'80%',
    height:100,
    //backgroundColor:"#F5FCFF",
    backgroundColor: 'rgba(224, 224, 228,0.5)',
    position:'absolute',
    //top:"20%",
    zIndex:10,
    borderRadius:15,


  },
  circuitsButton: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#e59138',
    marginTop: 25,
    width: 150,
    height: 60
  },
  textButton: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'white',
  },
  btnDourbia: {
    //  borderColor: "red",
    //  borderWidth: 2,
    position:'absolute',
    top:"1%",
    //left:"25%",
    zIndex:10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 32,
    //  borderRadius: 10,
    //   elevation: 3,
    //backgroundColor: '#e59138',
    //marginTop: 25,
    width: '100%',
    height: 50
  },
});
