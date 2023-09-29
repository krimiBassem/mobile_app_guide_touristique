import React, {useLayoutEffect, useState} from 'react';

import {coordonnees_velo_GIZ} from '../../Utils/coordonnees';

import MapDrawer from '../../Components/MapDrawer/MapDrawer';

import {polygones} from '../../Utils/coordonnees';

import * as turf from '@turf/turf';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CircuitPedestre({navigation}, props) {
  const [inPoly, setInPoly] = useState(false);
  let pt = turf.point([10.3226649, 36.8533324]);
  let poly = turf.polygon([polygones]);

  const inPoly2 = turf.booleanPointInPolygon(pt, poly);
  // console.log('navigation velo', navigation);

  useLayoutEffect(() => {}, []);
  /****************fetch coords ************** */

  let cyclableLatLing = `http://217.182.207.129:8000/api/v1/monuments/cyclableLatLing`;

  /************************* Render Circuit Vélo GIZ *******************************/
  return (
    <MapDrawer
      order={true}
      coordonnees={coordonnees_velo_GIZ}
      url_api={cyclableLatLing}
      LineColor="blue"
      lineDasharray={[1, 1]}
      navigation1={navigation}
      
      renderBTN={true}></MapDrawer>
  );
}

const styles = StyleSheet.create({
  btnDourbia: {
    position: 'absolute',
    bottom: '1%',
    left: '25%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#e59138',
    //marginTop: 25,
    width: 200,
    height: 60,
  },
});
