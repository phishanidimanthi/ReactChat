import React, { useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet, Touchable, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Profile({ navigation }) {

    const [profile, setprofilePicture] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    async function loadData() {
        var user1JSONText = await AsyncStorage.getItem("user");
        var userJSObject = JSON.parse(user1JSONText);
        setprofilePicture(userJSObject.profile_url);
        setName(userJSObject.name);
        setMobile(userJSObject.mobile);
    }
    loadData();

    async function logOut(){
        navigation.navigate("SignIn");
        var user1JSONText = await AsyncStorage.getItem("user");
        var userJSObject = JSON.parse(user1JSONText);
        setprofilePicture(userJSObject.profile_url);
        setName(userJSObject.name.null);
        setMobile(userJSObject.mobile.null);
    }


    const ui = (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.imgView}>
                <Image source={{ uri: "http://10.0.2.2/ReactChat/" + profile }}
                    style={styles.signInImage} />
            </View>

            <View style={styles.view1}>
                <Icon name='user' style={styles.profileIcon} />
                <Text style={styles.textView1}>Name</Text>
            </View>

            <View style={styles.view1}>
                <Text style={styles.textView2}>{name}</Text>
            </View>

            <View style={styles.view1}>
                <Icon name='phone' style={styles.profileIcon} />
                <Text style={styles.textView1}>Phone</Text>
            </View>
            <View style={styles.view1}>
            <Text style={styles.textView2}>{mobile}</Text>
            </View>

            <Pressable style={styles.logOutView} onPress={logOut}>
                <Text style={styles.logOutText} >Logout </Text>
            </Pressable>
            <Image source={{uri: "https://clipground.com/images/logout-clipart-19.jpg"}} 
                style={styles.logOutImg}/>
        </SafeAreaView>
    );
    return ui;

    function editName() {
        const ui = (
            <View>
                <Text>Hello</Text>
            </View>
        );
        return ui;
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#01011E',
    },
    imgView: {
        alignItems: 'center',
        marginTop: 110,
    },
    signInImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    view1: {
        flexDirection: 'row',
        marginStart: 50,
        marginTop: 30,
    },
    textView1: {
        marginStart: 50,
        marginEnd: 30,
        fontSize: 20,
        fontFamily: "RobotoCondensed",
        color: '#727276',

    },
    textView2: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: "RobotoCondensed",
        color: '#98989B',
        marginStart: 110,
        marginTop: -40,
    },
    view2: {
        flexDirection: 'row',
        marginStart: 50,
        marginTop: 50,

    },
    profileIcon: {
        paddingHorizontal: 10,
        color: "#B9B9BC",
        fontSize: 30,
        marginStart: 15,
    },
    logOutImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginStart: 50,
        marginTop: -55,
        marginLeft: 110,
    },
    logOutView: {
        width: "80%", 
        height: 65,
        backgroundColor: "#02023B",
        borderColor: "#030395",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 110,
        marginLeft: 40,
    },
    logOutText: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "RobotoCondensed",
        color: "#A7A7BB",
        marginLeft: 60,
    },
});