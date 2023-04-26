import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Image, Pressable, Alert, Button, ImageBackground, PlatformColor } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn({navigation}) { 

    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
  
    const ui = (
      <SafeAreaView style={styles.signInMain}>
  
        <Image source={{ uri: "https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" }} 
                      style={styles.signInImage} />
  
        <View style={styles.signInView1}>
          <Icon style={styles.signInIcon1} name='mobile' />
          <TextInput
            style={styles.signInInput1}
            autoCorrect={false}
            inputMode={'numeric'}
            maxLength={10}
            placeholder={"Mobile number" }
            placeholderTextColor={"#2D2D76"}
            onChangeText={setMobile} 
          />
        </View>
  
        <View style={styles.signInView1} >
          <Icon style={styles.signInIcon1} name='lock' />
          <TextInput
            style={styles.signInInput1}
            secureTextEntry={true}
            placeholder={"Password"}
            placeholderTextColor={"#2D2D76"}
            onChangeText={setPassword} 
          />
        </View>

        <Pressable style={styles.signInButton1} onPress={signInProcess}>
          <Text style={styles.signInButtonText1}>Sign In</Text>
        </Pressable>

        <Pressable style={styles.signInButton2} onPress={signUpProcess}>
          <Text style={styles.signInButtonText1}>New user? Go to Sign Up</Text>
        </Pressable>

      </SafeAreaView>
    );
    return ui;
    function signInProcess() { 

      var jsRequestObject = { mobile: mobile, password: password };
      var jsonRequestText = JSON.stringify(jsRequestObject);
  
      var formData = new FormData();
      formData.append("jsonRequestText", jsonRequestText); 
  
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () { 
        if (request.readyState == 4 && request.status == 200) { 
          var jsonResponseText = request.responseText;
          var jsResponseObject = JSON.parse(jsonResponseText);
  
          if (jsResponseObject.msg == "Error") { 
            Alert.alert("Message", "Invalid Details"); 
          } else {
            var userObject = jsResponseObject.user;
            Alert.alert("Message", "Hello...  \n" + userObject.name ); 
  
            AsyncStorage.setItem("user", JSON.stringify(userObject)); 
            AsyncStorage.setItem("user", JSON.parse(userObject));
            navigation.navigate("Home"); 

          }
        }
      };
  
      request.open("POST", "http://10.0.2.2/ReactChat/signIn.php", true); 
      request.send(formData); 
    }

    function signUpProcess(){
      navigation.navigate("SignUp");
    }
  }
  
  const styles = StyleSheet.create({
    signUpSelect: {
        width: "80%",
        height: 40,
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        fontSize: 20,
      },
      
      signInButtonText1: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E3E3FB",
      },
      signInButton1: {
        width: "80%",
        height: 40,
        color: "white",
        backgroundColor: "#0C0C9D",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      },
      signInButton2: {
        width: "80%", 
        height: 40,
        color: "white",
        backgroundColor: "#010189",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      },
      signInView1: {
        flexDirection: "row",
        alignItems: "center"
      },
      signInIcon1: {
        fontSize: 24,
        position: "absolute",
        color: '#B9B9BC',
        start: 15,
      },
      signInInput1: {
        width: "80%",
        height: 50,
        fontSize: 24,
        color: '#A7A7C5',
        borderRadius: 10,
        borderColor: "#252577",
        borderWidth: 1,
        paddingStart: 35,
      },
      signInMain: {
        flex: 1,
        backgroundColor:"#01011E",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      },
      signInImage: {
        width: 100,
        height: 100,
        marginBottom:45,
        borderRadius: 50,
      },

});