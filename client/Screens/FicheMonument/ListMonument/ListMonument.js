// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   FlatList,
//   Button,
// } from 'react-native';

// export default Posts = () => {
// const [data, setData] = useState([
//   {
//     id: 1,
//     title: 'COLLINE DE BYRSA',
//     time: '1 days a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653138172/Dourbia/Colline%20de%20Byrsa/vue-ruines-du-quartier-punique-colline-byrsa-cathedrale-saint-louis-carthage-tunisie_108146-79_uozgcz.jpg',
//   },
//   {
//     id: 2,
//     title: 'QUARTIER PUNIQUE',
//     time: '2 minutes a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653138011/Dourbia/Quartier%20Hannibal/tunisie_90258-227_fnsstr.jpg',
//   },
//   {
//     id: 3,
//     title: 'THEATRE',
//     time: '3 hour a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653142962/Dourbia/Theatre/IMG_20220515_142547_xvsnjz.jpg',
//   },
//   {
//     id: 4,
//     title: 'VILLAS ROMAINES',
//     time: '4 months a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1662567251/Dourbia/Villa%20Romaine/villas_romaines_vgx7bj.jpg',
//   },
//   {
//     id: 5,
//     title: 'QUARTIER MAGON',
//     time: '5 weeks a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653137869/Dourbia/Quartier%20Magon/1200px-Quartier_Magon_2_a56div.jpg',
//   },
//   {
//     id: 6,
//     title: "THERMES D'ANTONIN",
//     time: '6 year a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1654333935/Dourbia/Parc%20des%20thermes%20d%27Antonin/IMG_20220515_121843_tlsm5s.jpg',
//   },
//   {
//     id: 7,
//     title: 'PORTS PUNIQUE',
//     time: '7 minutes a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653138444/Dourbia/Ports%20Puniques/Ports_militaires_6_o5oasb.jpg',
//   },
//   {
//     id: 8,
//     title: 'MUSEE OSEANOGRAPHIQUE',
//     time: '8 days a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653138826/Dourbia/Mus%C3%A9e%20Oc%C3%A9anographique/musee_oceanographique3_spljku.jpg',
//   },
//   {
//     id: 9,
//     title: 'LE TOPHET',
//     time: '9 minutes a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653137786/Dourbia/Tophet/tophet_de_carthage3_rbn0dz.jpg',
//   },
//   {
//     id: 10,
//     title: 'BEIT EL HIKMA',
//     time: '9 minutes a go',
//     image:
//       'https://res.cloudinary.com/dourdourdour/image/upload/v1653138552/Dourbia/Beit%20El%20Hikma/beit_el_hekma_2_djjjiz.jpg',
//   },
// ]);
//   return (
//     <View style={{marginTop: 20}}>
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//         {data &&
//           data.map(el => (
//             <View
//               key={el.id}
//               style={{
//                 width: 90,
//                 height: 80,
//                 marginLeft: 5,
//                 marginRight: 5,
//                 borderRadius: 10,
//               }}>
//               <View>
//                 <Image
//                   source={{
//                     uri: el.image,
//                   }}
//                   style={{
//                     width: 90,
//                     height: 80,
//                     marginLeft: 5,
//                     marginRight: 5,
//                     borderRadius: 10,
//                     backgroundColor: 'rgba(46, 138, 138, 0.2)',
//                   }}
//                 />
//               </View>
//             </View>
//           ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//   },
//   list: {
//     backgroundColor: '#E6E6E6',
//   },
//   separator: {
//     marginTop: 1,
//   },
//   /******** card **************/
//   card: {
//     margin: 0,
//     borderRadius: 2,
//     borderWidth: 1,
//     borderColor: '#DCDCDC',
//     backgroundColor: '#DCDCDC',
//   },
//   cardHeader: {
//     paddingVertical: 17,
//     paddingHorizontal: 16,
//     borderTopLeftRadius: 1,
//     borderTopRightRadius: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cardContent: {
//     paddingVertical: 12.5,
//     paddingHorizontal: 16,
//     //overlay efect
//     flex: 1,
//     height: 200,
//     width: null,
//     position: 'absolute',
//     zIndex: 100,
//     left: 0,
//     right: 0,
//     backgroundColor: 'transparent',
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 15,
//     paddingBottom: 0,
//     paddingVertical: 7.5,
//     paddingHorizontal: 0,
//   },
//   cardImage: {
//     flex: 1,
//     height: 150,
//     width: null,
//   },
//   /******** card components **************/
//   title: {
//     fontSize: 22,
//     color: '#ffffff',
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
//   time: {
//     fontSize: 13,
//     color: '#ffffff',
//     marginTop: 5,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
//   /******** social bar ******************/
//   socialBarContainer: {
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//     flex: 1,
//   },
//   socialBarSection: {
//     justifyContent: 'flex-start',
//     flexDirection: 'row',
//     flex: 1,
//   },
//   socialBarlabel: {
//     marginLeft: 8,
//     alignSelf: 'flex-start',
//     justifyContent: 'center',
//     color: '#ffffff',
//   },
//   socialBarButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LockIcon from 'react-native-vector-icons/Foundation';
import CheckComponent from './Components/CheckComponent';
import ProgressBar from './Components/ProgressBar';

const TestModal = ({
  firstNAV,
  circuit,
  prochainMonument,
  order,
}) => {
  const renderItem = ({item,navigation}) => {
    return (
      <TouchableOpacity
        onPress={prochainMonument}
        disabled={item.orderMonument !== firstNAV + 2 && true}
        style={{
          width: 150,
          alignItems: 'center',
          marginLeft: 10,
          marginRight: 10,
        }}>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={
            item.orderMonument === firstNAV + 1
              ? styles.nextMonument
              : styles.otherMonument
          }
          // item[firstNAV].qr_code ? styles.nextMonument :
          source={{
            uri: item.qr_code,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                firstNAV < item.orderMonument && 'rgba(184,184,184,0.63)',
              borderRadius: 10,
              width: 150,
            }}>
            {/* <LockIcon
              // name="lock"
              name={!(firstNAV < item.orderMonument) && 'check'}
              color={'#ffffff'}
              size={20}
              style={{position: 'absolute', top: 5, right: 15}}
            /> */}
            {!(firstNAV < item.orderMonument) && <CheckComponent />}
            <Text style={styles.itemText}>
              {item.nomMonument.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
        {item.orderMonument === firstNAV + 1 ? (
          <Text style={styles.notifText}>Monument à visiter</Text>
        ) : item.orderMonument === firstNAV + 2 ? (
          <Text style={styles.notifText}>Prochain monument</Text>
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={{flex: 1, marginBottom: 5}}
        scrollEnabled={true}
        // onContentSizeChange={this.onContentSizeChange}
      >
        <FlatList
          // focusable={newCircuitVisited ? true : undefined}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={circuit}
          style={styles.container}
          renderItem={renderItem}
          // numColumns={numColumns}
          scrollEnabled={true}
        />
      </ScrollView>
      <ProgressBar order={order} />
    </SafeAreaView>
  );
};

export default TestModal;

const styles = StyleSheet.create({
  container: {
    margin: 7.5,
    // backgroundColor: 'black'
  },
  backgroundImage: {
    // flex: 1,
    height: 80,
    // backgroundColor: 'black',
    margin: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 13,
    color: '#FFFFFF',
    // color: '#E59138',
    textAlign: 'justify',
    // lineHeight: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  nextMonument: {
    borderColor: '#E59138',
    borderWidth: 4,
    borderRadius: 10,
  },
  otherMonument: {
    borderRadius: 10,
  },
  notifText: {
    fontSize: 13,
    // color: '#FFFFFF',
    color: '#E59138',
    textAlign: 'justify',
    // lineHeight: 30,
    fontWeight: 'bold',
  },
});
