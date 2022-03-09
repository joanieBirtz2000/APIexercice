
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

const Tab = createBottomTabNavigator();

function TabScreen() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Product') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Photo') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
  
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Photo" component={PhotoScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }
  
  function ProductScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ProductScreen</Text>
      </View>
    );
  }
  
  function PhotoScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>PhotoScreen</Text>
      </View>
    );
  }
  
  export {TabScreen};