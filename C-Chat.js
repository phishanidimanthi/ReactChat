import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Chat({route, navigation}) {  //anith eke idn gena data tika ganna route eka danwa
 
    const [chatText, setChatText] = useState();
    // const [id, setId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);

  
    // async function m() { //async fun eken log wela inna kenge id eka gannawa
    //   var userJsonText = await AsyncStorage.getItem("user");
    //   var userJSObject = JSON.parse(userJsonText);
    //   // Alert.alert("Name", userJSObject.name);
    //   setId(userJSObject.id); //e id eka setter ekka store karnwa
    // }
    // m();
      
    async function sendRequest(){

    const form = new FormData();
    var userJsonText = await AsyncStorage.getItem("user");
    var userJSObject = JSON.parse(userJsonText);
    form.append('id1', userJSObject.id);
    form.append("id2", route.params.id);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        setChatHistory(responseArray);
      }
    };
  
    //e id eka anith side ekta yawanwa
    request.open("POST", "http://10.0.2.2/ReactChat/load_chat.php", true);
    request.send(form);
  } 

  async function saveChat() {
    var userJsonText = await AsyncStorage.getItem('user');
    var fromUserObject = JSON.parse(userJsonText);

    var requestObject = {
      from_user_id: fromUserObject.id,
      to_user_id: route.params.id,
      message: chatText,
    };

    const formData = new FormData();
    formData.append("requestJSON", JSON.stringify(requestObject));

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {

      }
    };

    request.open("POST", "http://10.0.2.2/ReactChat/save_chat.php", true);
    request.send(formData);

  }

    const ui = (
      <SafeAreaView style={styles.chat}>
        <Text style={styles.chatText1}>Chat</Text>
        <Image source={{ uri: route.params.img }} 
        style={styles.itemImage}  />

        <Text style={styles.chatText2}>{route.params.name}</Text>
        <FlatList data={chatHistory} renderItem={chatItem} style={styles.chatList} />
  
        <View style={styles.chatSendView}>
          <TextInput style={styles.chatInput1} autoCorrect={false} placeholder={"Type here..."} onChangeText={setChatText} />
          <TouchableOpacity onPress={saveChat}>
            <Icon name='send' style={styles.chatIcon1} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );

    function start(){
      setInterval(sendRequest,5000);
    }
    useEffect(start,[]);

    return ui;
  
  }

  function chatItem({ item }) {
    const itemUI = (
      <View style={item.side == "right" ? styles.chatViewRight : styles.chatViewLeft}>
        <Text>{item.msg}</Text>
        <View style={styles.chatView1}>
          <Text style={styles.chatText3}>{item.time}</Text>
          {item.side == "right" ? (
          <Icon name="check" size={14} style={item.status == "seen" ? styles.chatIconSeen : styles.chatIconSent
        } 
        /> 
        ) : null}
        </View>
      </View>
    );
    return itemUI;
}

  const styles = StyleSheet.create ({
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
    chatSendView: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
      },
      chatInput1: {
        width: "80%",
        height: 40,
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        paddingLeft: 10,
        borderColor: "#6F6F6F",
      },
      chatIcon1: {
        paddingHorizontal: 10,
        color: "green",
        fontSize: 24,
      },
      chatText3: {
        fontSize: 10,
        color: "#2b2b2b",
      },
      chatIconSeen: {
        paddingLeft: 10,
        color: "green",
      },
      chatIconSent: {
        paddingLeft: 10,
        color: "red",
      },
      chatList: {
        width: "100%",
        paddingVertical: 10,
      },
      chatViewLeft: {
        backgroundColor: "#cde8f3",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: "flex-start",
        marginLeft: 10,
      },
      chatViewRight: {
        backgroundColor: "#cde8f3",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: "flex-end",
        marginRight: 10,
      },
      chatView1: {
        flexDirection: "row",
        alignItems: "center",
      },
      chat: {
        flex: 1,
        alignItems: "center",
      },
      chatText1: {
        fontSize: 28,
        paddingVertical: 15,
        color: "#17103f",
        fontFamily: "DancingScript",
      },
      chatText2: {
        fontSize: 22,
        color: "#242424",
        fontWeight: "bold",
        paddingVertical: 10,
      },
      
  });