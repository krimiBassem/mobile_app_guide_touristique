

import React from 'react';



import {coordonnees_punique} from '../../Utils/coordonnees' ;

import MapDrawer from "../../Components/MapDrawer/MapDrawer";




export default function  CircuitPunique  ({navigation}) {


    /****************fetch coords ************** */

    let puniqueLatLing = "https://apidourbya.herokuapp.com/api/v1/monuments/puniqueLatLing"


    /************************* Render Map Punique*******************************/
    return (



        <MapDrawer
            order={false}
            coordonnees ={coordonnees_punique}
            url_api ={puniqueLatLing}
            LineColor="purple"
        ></MapDrawer>



    )

}
