

import React from 'react';



import {coordonnees_bizantin} from '../../Utils/coordonnees' ;

import MapDrawer from "../../Components/MapDrawer/MapDrawer";




export default function  CircuitByzantine  ({navigation}) {


    /****************fetch coords ************** */

    let byzantineLatLing = "https://apidourbya.herokuapp.com/api/v1/monuments/byzantinLatLing"


    /************************* Render Map Bizantine*******************************/
        return (



          <MapDrawer
              order={false}
              coordonnees ={coordonnees_bizantin}
              url_api ={byzantineLatLing}
              LineColor="orange"
          ></MapDrawer>



        )

}
