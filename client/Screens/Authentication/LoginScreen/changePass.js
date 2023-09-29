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
  const PasswordChange = ({navigation, route}) => {
    const [password, setPassword] = useState('');
    const {email} = route.params;

    const changePassword =async ()=>{
    //   console.log(email);
      
      await axios.put(`${baseURL}/user/updatePasse/${email}` ,{password_utilisateur:password}).then((res)=>{
      console.log('resss',res);
        navigation.navigate('SignIn')
    }).catch(error => console.log(error));
    }
    return (
      <View>
        <View style={{paddingTop:40}}>
          <Text style={{fontSize:28}}>change your Password</Text>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} />
          <Button
            title="Press me"
            color="#f194ff"
            onPress={() => changePassword()}
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
  export default PasswordChange;
  