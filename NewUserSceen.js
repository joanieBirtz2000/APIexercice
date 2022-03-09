import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// New user
function NewUserScreen({ navigation }) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const txtHandlerEmail = (enteredEmail) => {
      setEmail(enteredEmail);
    };
  
    const txtHandlerPassword = (enteredPassword) => {
      setPassword(enteredPassword);
    };
  
  
  
    const storeUser = async () => {
  
      let user = {
        email: email,
        password: password,
      };
  
      try {
        //await AsyncStorage.setItem('user', JSON.stringify(user));
        await SecureStore.setItemAsync('user', JSON.stringify(user));
      } catch (e) {
        // saving error
      }
    };
  
    const onPress = () => {
      storeUser();
      navigation.navigate('Login');
    };
  
    return (
      <View style={styles.containerCenterMargin}>
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={txtHandlerEmail} />
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={txtHandlerPassword} />
        <TouchableOpacity style={styles.buttonAddUser} onPress={onPress}>
          <Text style={styles.textLogin}>ADD USER</Text>
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
  export default NewUserScreen;