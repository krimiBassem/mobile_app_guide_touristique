
import React, {useState} from 'react';
import { StyleSheet, View,Button } from 'react-native';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';
import MapboxGL from '@react-native-mapbox-gl/maps';


MapboxGL.setAccessToken('sk.eyJ1IjoiYmFsYnlubyIsImEiOiJja3liZXA0cXkwZWVxMm5yaXk5dzFjZWdiIn0.goiAhUR-OesXvmbmjXY7jg');
export default function MapDirection() {

    const [shouldShow, setShouldShow] = useState(true);


    return(
        <View style={styles.page}>
            <View style={styles.container}>
                <Button
                    title="Hide/Show Component"
                    onPress={() => setShouldShow(!shouldShow)}
                />

                {shouldShow ? (
                        <MapboxGL.MapView style={styles.map} >
                            <MapboxGL.PointAnnotation
                                key="key2"
                                id="id2"
                                title='Test'
                                // draggable={true}
                                snippet={'hello'}
                                //   selected={false}
                                onSelected={()=>{
                                    setShouldShow(!shouldShow)
                                }}
                                coordinate={[ 10.327047,36.854047]}>
                            </MapboxGL.PointAnnotation>
                        </MapboxGL.MapView>
                    ) :
                    <MapboxNavigation
                        origin={[10.327047,36.854047]}
                        destination={[10.330967505396075,36.85460127030251]}
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
                            setShouldShow(!shouldShow)


                        }}
                        onArrive={() => {
                            // Called when you arrive at the destination.
                        }}
                    />
                }

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'tomato'
    },
    map: {
        flex: 1
    }
});
