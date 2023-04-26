import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Chat } from './Chat';
import { Home } from './Home';
import { Profile } from './Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function ChatHome() {

  const uiHome = (

    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#2D2D47',
        headerStyle: { backgroundColor: '#17171A' },
        statusBarColor: '#1D213A',
        headerTitle: "Chat",
      }}

    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
      {/* <Stack.Screen name='Profile' component={Profile} /> */}
    </Stack.Navigator>

  );

  return uiHome;
}

export { ChatHome };

function SecondScreen() {

  const uiSignIn = (

    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#2D2D47',
        headerStyle: { backgroundColor: '#17171A' },
        statusBarColor: '#1D213A',
        headerTitle: "Profile",
      }}

    >
      <Stack.Screen name='detils' component={Profile} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>

  );

  return uiSignIn;
}
export {SecondScreen};


