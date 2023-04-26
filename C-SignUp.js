import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Alert, Button, ScrollView } from 'react-native';
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
        <View style={styles2.view1}>
          <Button color="#7e7f7e" title="Select Profile Picture" onPress={selectProfilePicture} />
        </View>
        <View style={styles2.btnView}>
          <Button color="#1f6139" title='Sign Up' onPress={signUpRequest} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function loadCountries() { // php eken ena request eka arn e array eka mekta set karnwa
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

  async function selectProfilePicture() { //btn eke onPress ekta function ekk hadnwa
    const options = { //profile eka select karnwa widiya denwaw
      mediaType: 'photo',
      // "cameraType":"back",
    };

    const result = await launchImageLibrary(options); //

    if (result.didCancel) { //img ekk select karla nethtan?
      Alert.alert("Message", "No Image");
    } else { //img ekk select karla nm?

      //upload karna img eke details tika ganna obj ekk hadanwa
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
        navigation.navigate("Sign In");
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
    alignSelf: 'flex-start'
  },
  text1: {
    fontSize: 20,
    paddingEnd: 10,
    color: "#2c5656",
    // fontStyle:"bold",
    alignItems: "flex-start"
  },
  input1: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
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
    fontSize:20,
    marginBottom: 20,
  },
  signUpMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f3d7",
  },
  scrollView:{
    width: "100%",
    marginHorizontal: 20,
  }
});