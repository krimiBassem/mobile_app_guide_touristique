import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Dimensions,
    // Button,
    ScrollView,
    Pressable,
    ToastAndroid,
    Modal,
    Input,
  } from 'react-native';
  import React, {useState, useEffect, useContext, useRef} from 'react';
  import axios from 'axios';
  import BASE_URL from '../../../assests/baseUrl';
  import {Snackbar, Button} from '@react-native-material/core';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  const CELL_COUNT = 6;
  
  const Test2 = ({navigation, route}) => {
    const {verificationCode} = route.params;
    const {email} = route.params;
  
    const [incorrect, setIncorrect] = useState(false);
    const [code, setCode] = useState(null);
    const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      code,
      setCode,
    });
    const verifiyCode = async () => {
        console.log(verificationCode,code);
      if(code==verificationCode){
        console.log('true');
        navigation.navigate('ChangePass',{email})
      }
    };
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Verification</Text>
  
        <View style={{paddingTop: 20}}>
          <Image
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/flat-design-security-set-one/24/padlock-round-broken-512.png',
            }}
            style={{
              left: 87,
              Top: 30,
              width: Dimensions.get('window').width * 0.35,
              height: Dimensions.get('window').width * 0.35,
              borderRadius: 400 / 2,
            }}
          />
          <Text style={{textAlign: 'center', fontSize: 20}}>
            Please enter the verification code
          </Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            We send to your email adresse
          </Text>
  
          <CodeField
            // ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={() => {
                  getCellOnLayoutHandler(index);
                }}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        {incorrect ? (
          <Text style={{paddingTop: 10, color: 'red', fontSize: 20}}>
            Code incorrect
          </Text>
        ) : null}
  
        <View style={{paddingTop: 30, paddingLeft: 83}}>
          <Button
            style={{backgroundColor: '#E59138', width: 150}}
            variant="text"
            title="VERIFIY"
            color="white"
            compact
            onPress={() => {
              verifiyCode();
            }}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    root: {flex: 1, padding: 40, paddingTop: 70},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });
  export default Test2;