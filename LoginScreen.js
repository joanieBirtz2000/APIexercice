import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
// import {AppContext} from './App';

const AppContext = React.createContext();

function LoginScreen({ navigation }) {

  const context = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const txtHandlerEmail = (enteredEmail) => {
    setEmail(enteredEmail);
  };

  const txtHandlerPassword = (enteredPassword) => {
    setPassword(enteredPassword);
  };



  const readUser = async () => {
    try {
      const jsonValue = await SecureStore.getItemAsync('user');
      if (jsonValue !== null) {
        // We have data!!
        console.log(JSON.parse(jsonValue));
        return jsonValue;
      }
    } catch (error) {

    }
  };
  // bug login a faire
  const login = () => {
    let user = readUser();
    // if (email == user.email && password == user.password) {
      context.Login(true)
    // }
  };


  return (
    <View style={styles.containerCenter}>
      {/* <Icon name="person"></Icon> */}
      <Image
        style={styles.tinyLogo}
        source={require('./Vanamo_Logo.png')}
      />
      <TextInput style={styles.textInput} placeholder="Email" onChangeText={txtHandlerEmail} />
      <TextInput style={styles.textInput} placeholder="Password" onChangeText={txtHandlerPassword} />
      <TouchableOpacity onPress={() => navigation.navigate('User')}>
        <Text style={styles.textNewUser}>Nouvel utilisateur ?</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.buttonLogin} onPress={() => context.Login(true)}> */}
      <TouchableOpacity style={styles.buttonLogin} onPress={login}>
        <Text style={styles.textLogin}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  containerCenterMargin: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    marginBottom: 30,
    marginTop: 25,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 15,
    width: 300,
    marginBottom: 5,
    borderRadius: 10,
  },
  buttonLogin: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    backgroundColor: 'rgb(123, 129, 156)',
    color: 'black',
  },
  buttonAddUser: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    backgroundColor: 'rgb(123, 129, 156)',
    color: 'black',
    marginTop: 20,
  },
  textLogin: {
    fontSize: 15,
  },
  textNewUser: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export { LoginScreen, AppContext };
