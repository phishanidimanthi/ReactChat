import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ChatHome, SecondScreen } from './MoveScreen';
// import { Profile } from './Profile';
// import { SignIn } from './SignIn';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <NavigationContainer>

      <Tab.Navigator
        // initialRouteName={"Contacts"}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, color: "#6C6F83" },
          tabBarItemStyle: { width: 150 },
          tabBarStyle: { backgroundColor: '#1D213A',  },
          tabBarGap: 60,
          tabBarPressColor: '#000029',
        }}>
 
        <Tab.Screen name="Contacts" component={ChatHome} />
        {/* <Tab.Screen name="Profile" component={Profile} /> */}
        {/* <Tab.Screen name="Settings" component={Settings} /> */}
        <Tab.Screen name="Profile" component={SecondScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );

}
