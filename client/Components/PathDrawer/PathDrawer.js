import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';






function PathDrawer   (props)  {
  function  makeId  ( length)  {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
   const id = makeId(5) ;
 //  console.log("id", id)
    const styles = {

        lineLayer: {
            lineColor: props.lineColor,
            lineCap: 'round',
            lineJoin: 'round',
            lineWidth: 4,
            lineDasharray: [3,3]

        }
    }


        return (



                    <MapboxGL.ShapeSource
                        id={id}
                        belowLayerID={true}
                        lineMetrics={true}
                        shape={{
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates:
                                            props.coords

                                ,
                            },
                        }}>
                        <MapboxGL.LineLayer

                            id={id}
                            style={styles.lineLayer}
                       //     aboveLayerID="true"
                        />
                    </MapboxGL.ShapeSource>



        );

}

export default PathDrawer;
