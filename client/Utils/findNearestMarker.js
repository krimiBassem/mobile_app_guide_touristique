export default function findNearestMarker(coords) {
    const turf = require('@turf/distance').default;
    var from = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [10.510702, 36.494649921199915  ]
        }
    };

    let nearest_text = [] ;
    let units = 'kilometers';
    for (let i = 0; i < coords.length-1; i++) {
        var minDist = 1000;

        var to = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": coords[i]
            }
        };
        let distance = turf(from, to, units);

        console.log("distance / site ", distance)
        //    console.log("user coords ", location.longitude,location.latitude)

        //  markerDist = objects[i].getGeometry().distance(coords);
        if (distance < minDist) {
            minDist = distance;
             nearest_text = coords[i];

            console.log("nearest_text ", nearest_text)
        }
    }
    console.log("coords ", nearest_text)
     return nearest_text ;
}



 async function  getDistanceOneToOne(lat1, lng1, lat2, lng2)
{
    const Location1Str = lat1 + "," + lng1;
    const Location2Str = lat2 + "," + lng2;
    const GOOGLE_API_KEY = 'AIzaSyBRZZNJs4Id9ZMw7z0WYBO1c0MTM8icrto'
    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

    let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${GOOGLE_API_KEY}`; // you need to get a key
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;

    let fetchResult =  await fetch(finalApiURL); // call API
    let Result =  await fetchResult.json(); // extract json
    let  Distance = 0;
      Distance = Result.rows[0].elements[0].distance;
      console.log("Distance", Distance)
}


function fetchResult () {
    fetch(MAPBOX_URL).then((res) =>
        res.json()
    )
        .then((res) => {
                console.log("res", res.routes[0].distance) // call API
                setDistance(res.routes[0].distance)
            }
        )
}


 function getDistanceMatrix(userLocation, tabCircuit) {

    //  const userLocation = 37.287918 + "," + 9.850601;


    let GRAPHHOPPER_API = `https://graphhopper.com/api/1/matrix?from_point=${userLocation}`;
    const GRAPHHOPPER_API_KEY = '78fd87be-7426-4fd0-8097-3c376e88c579';
    for (let i = 0; i < tabCircuit.length - 1; i++) {
        const Distance =
            tabCircuit[i].latitude_monument +
            ',' +
            tabCircuit[i].longitude_monument;


        GRAPHHOPPER_API = GRAPHHOPPER_API + '&to_point=' + Distance;


    }
    let GRAPHHOPPER_API_URL =
        GRAPHHOPPER_API +
        `&type=json&profile=car&debug=true&out_array=distances&key=${GRAPHHOPPER_API_KEY}`;

    console.log('GRAPHHOPPER_API_URL', GRAPHHOPPER_API_URL);

    let fetchResult = fetch(GRAPHHOPPER_API_URL)
        .then(res => res.json())
        .then(res => {
            console.log('res.distances', res.distances);
            //   setDistance(res.distances);

            let   DistanceMonuments = res.distances[0];
            console.log('DistanceMonuments finale', res.distances[0]);

            // if( DistanceMonuments.length != 0) {}
            var minDist = DistanceMonuments[0];
            for (let i = 1; i < res.distances[0].length; i++) {
                if (res.distances[0][i] < minDist) {
                    minDist = res.distances[0][i];
                }
            }
            console.log('nearest_minDist ', minDist);
            //     console.log('distance finale', distanceCoord);
            var index = res.distances[0].indexOf(minDist)
            console.log('index nearestPinCoord', index);
            var  nearestPinCoord11 = tabCircuit[index] ;


//            var dnearestPinDistance = minDist ;
            //   console.log('nearestPinDistance', dnearestPinDistance);
            console.log('nearestPinCoord', nearestPinCoord11);

              return nearestPinCoord11 ;
        });
}
