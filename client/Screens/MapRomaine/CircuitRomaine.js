

import React from 'react';



import {coordonnees_romain} from '../../Utils/coordonnees' ;

import MapDrawer from "../../Components/MapDrawer/MapDrawer";




export default function  CircuitRomaine  ({navigation}) {


    /****************fetch coords ************** */

    let romaineLatLing = "https://apidourbya.herokuapp.com/api/v1/monuments/romainLatLing"


    /************************* Render Map Romaine*******************************/
        return (



          <MapDrawer
              order={false}
              coordonnees ={coordonnees_romain}
              url_api ={romaineLatLing}
              LineColor="red"
          ></MapDrawer>



        )

}
