import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, AppContext } from './LoginScreen';
import Icon from 'react-native-ionicons';
import NewUserScreen from './NewUserSceen';
import StoreListScreen from './StoreListScreen';
import { TabScreen } from './TabScreen';


function SettingScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
      <Text>Stay signed in</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

//App
function App() {
  const [isLogin, setisLogin] = useState(false);

  return (
    <AppContext.Provider value={{ Login: setisLogin }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin ?
            <>
              <Stack.Screen name="Login" component={LoginScreen}
                options={({ navigation }) => ({
                  headerTitle: () => (
                    <View>
                      <Image
                        style={styles.tinyLogo}
                        source={require('./Vanamo_Logo.png')}
                      />
                    </View>
                  ),
                  headerRight: () => (

                    <Icon
                      onPress={() => navigation.navigate('Setting')}
                      name="settings">
                    </Icon>

                  ),
                })
                } />
              <Stack.Screen name="User" component={NewUserScreen} />
            </>
            :
            <>
              <Stack.Screen name="StoreList" component={StoreListScreen}
               options={({ navigation }) => ({
                headerRight: () => (

                  <Icon
                    onPress={() => navigation.navigate('Setting')}
                    name="settings">
                  </Icon>

                ),
              })
              } />
              <Stack.Screen
                name="Tab"
                component={TabScreen}
                options={({ route }) => ({ title: route.params.name })}
              />

            </>}
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
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
    width: 30,
    height: 30,
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

export default App;