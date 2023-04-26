import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Chat } from './Chat';
import { Home } from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {

  async function checkUser() {
    const user = await AsyncStorage.getItem("user"); //async storage eke store wela inna(log wela inna) userwa gannawa
    return user;
  }

  const ui = (
 
    <NavigationContainer>
      {/* mulinma view wena kenwa me initialRoute eke denna puluwn */}
      <Stack.Navigator initialRouteName={checkUser!=null?"Home":"Sign In"}> 
      {/* if-else short form --> checkUser null nm->Home ekta yanwa
                                                    nethtan->Sign In ekta yanwa */}
      {/* <Stack.Navigator initialRouteName={"Sign In"}> */}
        <Stack.Screen name='Sign In' component={SignIn} />
        <Stack.Screen name='Sign Up' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>

  );

  return ui;
}

export default App;