import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const forNavigation =  global.navigationFromComponent;

const ListCircuitThematiques = ({
  circuitFiltred,
  circuitDetail,
  // monumentDetail,
}) => {

  useEffect(()=>{
    console.log(circuitFiltred);
  })
  return (
    <View>
      {/* {circuitFiltred.length > 0 ? ( */}
      <FlatList
        style={styles.notificationList}
        enableEmptySections={true}
        data={circuitFiltred}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              {item.nom_monument   ? (
                <TouchableOpacity
                  onPress={() => {
                   
                    // monumentDetail(item.nomCircuit);
                    if(item.nomCircuit==="Circuit Cyclable"){
                      circuitDetail(item.idCircuit,item.nomCircuit);
                    }else{
                      circuitDetail(item.idCircuit,item.nomCircuit);
                    }
                    

                  }}>
                  <View style={styles.notificationBox}>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: 'https://www.voyage-tunisie.info/wp-content/uploads/2018/03/Dougga.jpg',
                      }}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.description}>
                        {item.nom_monument}
                      </Text>
                      <Text style={styles.descriptions}>{item.nomCircuit}</Text>
                      <Text style={styles.descriptions}>{item.epoque}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}

              {item.nom_thematique ? (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item.nom_thematique.substr(8));
                    circuitDetail(item.idCircuit,item.nom_thematique);
                  }}>
                  <View style={styles.notificationBox}>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: 'https://www.voyage-tunisie.info/wp-content/uploads/2018/03/Dougga.jpg',
                      }}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.description}>
                        {item.nom_thematique}
                      </Text>
                      <Text style={styles.descriptions}>
                        On présente {item.numberOfMonuments} Monuments
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
      {/* ) : (
        <Text>Aucun circuit ne correspond aux critères sélectionnés</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#9E9E9E',
  },
  icon: {
    width: 80,
    height: 80,
  },
  description: {
    fontSize: 18,
    color: '#000000',
    marginStart: 30,
  },
  descriptions: {
    fontSize: 16,
    color: '#707070',
    marginStart: 30,
  },
  msgNotif: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListCircuitThematiques;
