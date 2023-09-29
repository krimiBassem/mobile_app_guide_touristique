import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import baseURL from '../../../assests/baseUrl';
const PasswordForgotten = ({navigation, route}) => {
  const [email, setEmail] = useState('');

  const checkEmail =async ()=>{
    console.log(email);
    
    await axios.post(`${baseURL}/user/sendVerificationEmail`,{email_utilisateur:email}).then((res)=>{
    navigation.navigate('Test2',{verificationCode:res.data.message,email})
    }).catch(error => console.log(error));
  }
  return (
    <View>
      <View style={{paddingTop:40}}>
        <Text style={{fontSize:28}}>put you email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />
        <Button
          title="Press me"
          color="#f194ff"
          onPress={() => checkEmail()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default PasswordForgotten;
