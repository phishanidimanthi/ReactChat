import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Image, Pressable, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn({navigation}) { //windows atre maru wenna 'navigation' obj eka denwa

    //mobile psw dekta state create karnwa
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
  
    const ui = (
      <SafeAreaView style={styles.signInMain}>
  
        <Image source={{ uri: "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png" }} style={styles.signInImage} />
  
        <View style={styles.signInView1}>
          <Icon style={styles.signInIcon1} name='mobile' />
          <TextInput
            style={styles.signInInput1}
            autoCorrect={false}
            inputMode={'numeric'}
            maxLength={10}
            placeholder={"Mobile number"}
            onChangeText={setMobile} //state eke thinwa setMobile eka call karnwa
          // meka call unma (mobile kiyna eke monwhari type karma) mobile kiyna variable eka update wenwa
          />
        </View>
  
        <View style={styles.signInView1} >
          <Icon style={styles.signInIcon1} name='lock' />
          <TextInput
            style={styles.signInInput1}
            secureTextEntry={true}
            placeholder={"Password"}
            onChangeText={setPassword} //state eke thinwa setPassword eka call karnwa
          />
        </View>
  
        {/*  onPress ekta apita ona function ekkta call karnwa. (inner function ekk widiyta) */}
        <Pressable style={styles.signInButton1} onPress={signInProcess}>
          <Text style={styles.signInButtonText1}>Sign In</Text>
        </Pressable>

        <Pressable style={styles.signInButton2} onPress={signUpProcess}>
          <Text style={styles.signInButtonText1}>New user? Go to Sign Up</Text>
        </Pressable>

      </SafeAreaView>
    );
    return ui;
    function signInProcess() { // onPress ekta call karna inner function eka
      // Alert.alert("Message",mobile+", "+password); 
  
      var jsRequestObject = { mobile: mobile, password: password }; //Js object ekta use dena mobile num ekai psw ekai gannawa
      var jsonRequestText = JSON.stringify(jsRequestObject); //Js object eka JSON obj ekk widiyta convert karnwa
  
      var formData = new FormData(); //formdata ekk create karnwa
      formData.append("jsonRequestText", jsonRequestText); // JSON obj eka formdata ekkata gannawa
  
      var request = new XMLHttpRequest(); //Requst ekk create karnwa
      request.onreadystatechange = function () { //request ekta state ekagannawa
        if (request.readyState == 4 && request.status == 200) { //state eka me widiyta redy nm
          var jsonResponseText = request.responseText; //request eka gannawa
          var jsResponseObject = JSON.parse(jsonResponseText);
          // Alert.alert("Response",responseText); //reponse eka view wenwa
  
          if (jsResponseObject.msg == "Error") { //signIn.php eke error kiyna ekta me error == nm,
            Alert.alert("Message", "Invalid Details"); //me msg eka view wenwa
          } else {
            var userObject = jsResponseObject.user;
            Alert.alert("Message", "Hello...  \n" + userObject.name); //else nm meka view wenwa
  
            AsyncStorage.setItem("user", JSON.stringify(userObject)); //Async Storage ekk create karnwa user details tike app ekema store karanna
            //user pbj eka string ekk karla set karnwa
            navigation.navigate("Home"); //navigate wenna ona thena denwa ona thenadi (home ekta navigate wenwa)

          }
        }
      };
  
      request.open("POST", "http://10.0.2.2/ReactChat/signIn.php", true); // POST method eken AJAX harha req eke url eka open karnwa
      request.send(formData); //request eka send karnwa
    }

    function signUpProcess(){
      navigation.navigate("Sign Up");
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
        color: "white",
      },
      signInButton1: {
        width: "80%",
        height: 40,
        color: "white",
        backgroundColor: "#001125",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      },
      signInButton2: {
        width: "80%",
        height: 40,
        color: "white",
        backgroundColor: "#118930",
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
        start: 15,
      },
      signInInput1: {
        width: "80%",
        height: 50,
        fontSize: 24,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        paddingStart: 35,
      },
      signInMain: {
        flex: 1,
        backgroundColor:"#f9f3d7",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      },
      signInImage: {
        width: 100,
        height: 100,
        marginBottom:20,
        borderRadius: 50,
      },

});