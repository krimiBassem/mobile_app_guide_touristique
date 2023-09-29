/*
import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
//import sheet from '../examples/styles/sheet';
//import exampleIcon from '../examples/assets/example.png';
import Pin from '../Pin/Pin'
const point = {
    id: "1",
    lat: 36.8546394504313,
    lng: 10.3325451882596
}

const featureCollection = {
    "type": "FeatureCollection",
    "features": [
        {
            type: "Feature",
            id: point.id,
            properties: {
                id: point.id
            },
            geometry: {
                type: "Point",
                coordinates: [point.lng, point.lat],
            },
        }
    ]
}
/*
****************Initial Annotaion**************
*/
/*
let annotationRef = null;

export default class Test extends Component {

    state = {
        count: "1"
    }

    onPress = async () => {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    render() {
        return (
            <MapboxGL.MapView
                style={{flex: 1,}}
            >
                <MapboxGL.Camera
                    zoomLevel={10}
                    centerCoordinate={[point.lng, point.lat]}
                />
                <MapboxGL.PointAnnotation
                    key="key"
                    aboveLayerID="true"
                    id="idd"
                    title="{title}"
                    coordinate={[10.3325451882596, 36.8546394504313]}
                    ref={ref => (annotationRef = ref)}
                >
                    <View >
                        <Pin width={30}
                             height={30}
                        />

                    </View>
                    <MapboxGL.Callout title="hiii" containterStyle={{ flex: 1, background: '#fff' }} />
                </MapboxGL.PointAnnotation>
                <MapboxGL.ShapeSource
                    id="symbolLocationSource"
                    hitbox={{ width: 30, height: 30 }}
                    onPress={this.onPress}
                    shape={{  "type": "FeatureCollection",
                        "features": [
                            {
                                type: "Feature",
                                id: "3",
                                properties: {
                                    id: "3"
                                },
                                geometry: {
                                    type: "Point",
                                    coordinates: [point.lng, point.lat],
                                },
                            }
                        ]}}
                >




                    <MapboxGL.CircleLayer
                        id="notificationCircle"
                        style={{
                            circleColor: "#e59138",
                            circleRadius: 10,
                            circleTranslate: [10, -15]
                        }}
                    />
                    <MapboxGL.SymbolLayer
                        id="notificationCount"
                        style={{
                            iconOptional: true,
                            textIgnorePlacement: true,
                            textField: this.state.count.toString(),
                            textSize: 15,
                            textMaxWidth: 50,
                            textColor: '#FFF',
                            textAnchor: 'center',
                            textTranslate: [10, -15],
                            textAllowOverlap: true
                        }}
                    />
                </MapboxGL.ShapeSource>
            </MapboxGL.MapView>
        );
    }
}
*/

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet, Text, View} from 'react-native';

import Autorisation from '../../Screens/Autorisation/Autorisation';
import CircuitGeneral from '../../Screens/CircuitGeneral/CircuitGeneral';
import CircuitPunique from '../../Screens/MapPunique/CircuitPunique';
import CircuitByzantine from '../../Screens/MapByzantine/CircuitByzantine';
import CircuitRomaine from '../../Screens/MapRomaine/CircuitRomaine';
import CircuitVelo from '../../Screens/CircuitVelo/CircuitVelo';
import CircuitPedestre from '../../Screens/CircuitPedestre/CircuitPedestre';
import CircuitGIZ from '../../Screens/CircuitGIZ/CircuitGIZ';
import ListScreen from '../../Screens/ListCircuit/ListScreen';

import {TourGuideProvider} from 'rn-tourguide';

const Stack = createNativeStackNavigator();

export default function MapNavigation() {
  return (
    <TourGuideProvider {...{borderRadius: 16, androidStatusBarVisible: true}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Autorisation"
            component={Autorisation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitGeneral"
            component={CircuitGeneral}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitPunique"
            component={CircuitPunique}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitByzantine"
            component={CircuitByzantine}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitRomaine"
            component={CircuitRomaine}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitPedestre"
            component={CircuitPedestre}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitVelo"
            component={CircuitVelo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CircuitGIZ"
            component={CircuitGIZ}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ListScreen" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TourGuideProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
