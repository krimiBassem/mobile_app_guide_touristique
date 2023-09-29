import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const sponsorsSection = require('../../Components/Images/sponsors/new_sponsor.png');
const logoDourbia = require('../../Components/Images/logo/logoDourbia1.png');
const monumentIcon = require('../../Components/Images/monumentIcon.png');

const HomeScreen = ({navigation}) => {
  const [timePassed, setTimePassed] = useState(false);
  useEffect(() => {
    setTimeout(async () => {
      await EncryptedStorage.getItem('showdemovideo').then(res => {
        if (!res) {
          navigation.navigate('Demo');
        } else {
          navigation.navigate('ListCircuit');
        }
      });
    }, 4000);
    // if (timePassed) {

    // }
  });

  width = Dimensions.get('screen').width;
  return (
    <TouchableOpacity
      onPress={async () => {
        await EncryptedStorage.getItem('showdemovideo').then(res => {
          if (!res) {
            navigation.navigate('Demo');
          } else {
            navigation.navigate('ListCircuit');
          }
        });
      }}
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      {/* <StatusBar /> */}
      {/* <View
        style={{
          flex: 1,
          //   backgroundColor: 'red',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={sponsorsSection}
          style={{
            width: width,
            height: '75%',
          }}
        />
      </View> */}
      <View style={styles.bottomContainer}>
        <View>
          <Image source={logoDourbia} style={styles.logoDourbia} />
        </View>
        {/* <View>
          <Image source={monumentIcon} style={styles.logoMonument} />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoDourbia: {
    alignSelf: 'center',
    marginTop: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#E6913E',
    width: Dimensions.get('window').width,
  },
  logoMonument: {
    marginTop: 10,
    width: Dimensions.get('window').width - 30,
    marginBottom: 5,
  },
});

export default HomeScreen;
