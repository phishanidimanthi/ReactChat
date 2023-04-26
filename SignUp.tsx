import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Alert, Button, ScrollView, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';

export function SignUp({ navigation }) {

  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [country, setCountry] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [countries, setCountries] = useState([]);

  const ui = (
    <SafeAreaView style={styles2.signUpMain}>
      <ScrollView style={styles2.scrollView}>
      <View>
      <Image source={{ uri: "https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" }} 
                      style={styles2.signInImage} />
      </View>
        <View style={styles2.view1}>
          <Text style={styles2.text1}>Mobile</Text>
        </View>
        <View style={styles2.view1}>
          <TextInput style={styles2.input1} autoCorrect={false} maxLength={10} keyboardType={"numeric"} onChangeText={setMobileNumber} />
        </View>

        <View style={styles2.view1}>
          <Text style={styles2.text1}>Name</Text>
        </View>
        <View style={styles2.view1}>
          <TextInput style={styles2.input1} autoCorrect={false} onChangeText={setName} />
        </View>

        <View style={styles2.view1}>
          <Text style={styles2.text1}>Password</Text>
        </View>
        <View style={styles2.view1}>
          <TextInput style={styles2.input1} autoCorrect={false} secureTextEntry={true} onChangeText={setPassword} />
        </View>

        <View style={styles2.view1}>
          <Text style={styles2.text1}>Verify Password</Text>
        </View>
        <View style={styles2.view1}>
          <TextInput style={styles2.input1} autoCorrect={false} secureTextEntry={true} onChangeText={setVerifyPassword} />
        </View>

        <View style={styles2.view1}>
          <Text style={styles2.text1}>Country</Text>
        </View>
        <View style={styles2.view1}>
          <SelectDropdown
            data={countries}
            onSelect={setCountry}
          />
        </View>
        <View style={styles2.view1} >
          <Button color="#27278A"  title="Select Profile Picture" onPress={selectProfilePicture} />
        </View>
        <View style={styles2.btnView}>
          <Button color="#080846" title='Sign Up' onPress={signUpRequest} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function loadCountries() { 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var countryArray = JSON.parse(request.responseText);
        setCountries(countryArray);
      }
    };

    request.open("GET", "http://10.0.2.2/ReactChat/load_countries.php", true);
    request.send();
  }

  loadCountries();

  async function selectProfilePicture() { 
    const options = { 
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options); 

    if (result.didCancel) { 
      Alert.alert("Message", "No Image");
    } else { 

      const imageObject = {
        "uri": result.assets[0].uri,
        "name": "profile.png",
        "type": "image/png",
      };
      setProfileImage(imageObject);
    }
  }

  function signUpRequest() {

    var form = new FormData();
    form.append("mobile", mobileNumber);
    form.append("name", name);
    form.append("password", password);
    form.append("verifyPassword", verifyPassword);
    form.append("country", country);
    form.append("profilePicture", profileImage);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        Alert.alert("Sign Up Complete...", request.responseText);
        navigation.navigate("SignIn");
      }
    };

    request.open("POST", "http://10.0.2.2/ReactChat/signUp.php", true);
    request.send(form);
  }

  return ui;

}

const styles2 = StyleSheet.create({
  view1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginStart: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  signInImage: {
    width: 100,
    height: 100,
    marginBottom:45,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 150,
    marginTop: 35,
  },
  text1: {
    fontSize: 20,
    paddingEnd: 10,
    color: "#27278A",
    alignItems: "flex-start"
  },
  input1: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#252577",
    color: '#A7A7C5',
    borderRadius: 10,
    borderStyle: "solid",
    paddingStart: 10,
    alignItems: "flex-end"
  },
  dropCountryText: {
    fontSize: 50,
  },
  btnView: {
    alignItems: "center",
    marginTop: 20,
    fontSize:40,
    marginBottom: 20,
    marginStart: 60,
    marginEnd: 60,
    backgroundColor: '#080846',
  },
  signUpMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#01011E",
  },
  scrollView:{
    width: "100%",
    marginHorizontal: 20,
  }
});