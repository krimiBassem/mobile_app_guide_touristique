import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    Image,
    
    TouchableOpacity,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  
  const ModalCircuitFinished = ({setModalVisible, modalVisible, nomcircuit, UserId}) => {
  
  
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{position: 'absolute', top: 10, right: 8}}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#E59138',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>X</Text>
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 16,
                fontFamily: 'SegoeUI',
                color: '#474747',
              }}>
              <Text
                style={[
                  styles.modalText,
                  {
                    marginTop: 20,
                    fontWeight: 'bold',
                  },
                ]}>
                {'dourbia'.toUpperCase()}
              </Text>{' '}
              : Commencer votre visite par le premier monument du circuit.
            </Text>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 16,
                marginTop: 15,
                fontFamily: 'SegoeUI',
                color: '#474747',
              }}>
              <Text
                style={[
                  styles.modalText,
                  {fontWeight: 'bold', color: '#EFAE4D'},
                ]}>
                {'aller vers'.toUpperCase()}
              </Text>
              : Vous emmène au monument le plus proche de votre localisation
              actuelle.
            </Text>
          </View>
          <Pressable
            style={styles.panelButton}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.textStyle}>{'passer'.toUpperCase()}</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  export default ModalCircuitFinished;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 22,
      backgroundColor: 'rgba(184,184,184,0.63)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: Dimensions.get('window').width * 0.9,
    },
    modalText: {
      marginBottom: 15,
      color: '#e59138',
      textDecorationLine: 'underline',
      textDecorationColor: '#E59138',
      textDecorationStyle: 'solid',
      fontSize: 16,
      fontFamily: 'SegoeUI',
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#E59138',
      alignItems: 'center',
      marginVertical: 2,
      width: Dimensions.get('screen').width * 0.4,
      alignSelf: 'center',
      marginTop: 20,
      textDecorationLine: 'underline',
      textDecorationColor: '#ffffff',
      textDecorationStyle: 'solid',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'SegoeUI',
      fontSize: 14,
    },
  });
  