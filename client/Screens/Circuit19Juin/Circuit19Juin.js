import React, {useLayoutEffect, useState} from 'react';

import {circuit_Kolna_Nemchiw_bizerte} from '../../Utils/coordonnees';

import MapDrawer from '../../Components/MapDrawer/MapDrawer';


import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Circuit19Juin({navigation}) {
  useLayoutEffect(() => {}, []);
  /****************fetch coords ************** */

  let bizerteLatLing = `https://apidourbya.herokuapp.com/api/v1/monuments/kolna_nemchiw_bizerte_LatLing`;

  /************************* Render Circuit Kolna Nemchiw Bizerte *******************************/
  return (
    <MapDrawer
      order={true}
      coordonnees={circuit_Kolna_Nemchiw_bizerte}
      url_api={bizerteLatLing}
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
