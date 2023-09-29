import React, {useLayoutEffect, useState} from 'react';

import {circuit_Kolna_Nemchiw} from '../../Utils/coordonnees';

import MapDrawer from '../../Components/MapDrawer/MapDrawer';

import * as turf from '@turf/turf';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Circuit5Juin({navigation}) {
  useLayoutEffect(() => {}, []);
  /****************fetch coords ************** */

  let cyclableLatLing = `https://apidourbya.herokuapp.com/api/v1/monuments/kolna_nemchiw_LatLing`;

  /************************* Render Circuit Vélo GIZ *******************************/
  return (
    <MapDrawer
      order={true}
      coordonnees={circuit_Kolna_Nemchiw}
      url_api={cyclableLatLing}
      LineColor="#e59138"
      lineDasharray={[1, 1]}
      renderBTN={true}
      navigation1={navigation}></MapDrawer>
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
