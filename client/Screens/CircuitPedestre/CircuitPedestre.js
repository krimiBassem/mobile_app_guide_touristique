import React from 'react';

import {coordonnees_pedestre_GIZ} from '../../Utils/coordonnees';

import MapDrawer from '../../Components/MapDrawer/MapDrawer';

export default function CircuitPedestre({navigation}) {
  /****************fetch coords ************** */

  let pedestreLatLing =
    'http://217.182.207.129:8000/api/v1/monuments/pedestreLatLing';

  /************************* Render Circuit Pedestre GIZ *******************************/
  return (
    <MapDrawer
      order={true}
      coordonnees={coordonnees_pedestre_GIZ}
      url_api={pedestreLatLing}
      LineColor="red"
      renderBTN={true}
      navigation1={navigation}></MapDrawer>
  );
}
