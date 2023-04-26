import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Image, FlatList, TouchableOpacity, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Pressable } from 'react-native/Libraries/Components/Pressable/Pressable';
// import { Alert } from 'react-native/Libraries/Alert/Alert';

export function Home({navigation }) {
  
  const [searchText, setSearchText] = useState("");

  const [items, setItems] = useState([
    // {
    //   pic: 'https://i.huffpost.com/gadgets/slideshows/359340/slide_359340_4004644_free.jpg',
    //   name: 'Sahan Perera',
    //   msg: "Welcome",
    //   time: '9:23 PM',
    //   count: '9',
    // },
  ]); //constant ekk hadnwa

  async function loadFriendList(text) {

    const userJSONText = await AsyncStorage.getItem('user'); //1. asyncStorage eken store karla thina userta adala JSON text eka gannawa
    const formData = new FormData();
    formData.append('userJSONText', userJSONText); // 2. form data eka create karla JSON txt eka server ekta yawanwa
    formData.append("text",text);

    var request = new XMLHttpRequest(); //4. server ekta gihin response ekk enakn baln innawa
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItems(JSON.parse(request.responseText));
        //5. setItems eka call karnwa
      }
    };
    request.open("POST", "http://10.0.2.2/ReactChat/load_users.php", true); //3. JSON txt eka POST method eken server ekta yawnwa
    request.send(formData);
  }
  function start(){
    loadFriendList("");
  }
  
  useEffect(start,[]);

  const ui = (
    <SafeAreaView style={styles.home}>
      <Text style={styles.homeText1}>Message</Text>
      <View style={styles.homeView1}>
        <TextInput style={styles.homeInput1} autoCorrect={false} onChangeText={loadFriendList} />

        {/* <TouchableOpacity onPress={loadFriendList} >
          <Icon name="search" size={25} color="#5C5C61" style={styles.homeInput1Image} />
        </TouchableOpacity> */}
      </View>
      <FlatList data={items} renderItem={itemUI} />
      {/* chat UI eke copies ganna list ekk hadna widiya 1. , data kiyna ekta array ekk, renderItem kiyna ekta function eke nama */}
    </SafeAreaView>
  );
  return ui;

  //eka ekkenge chat eka view karnwa
  function itemUI({ item }) { /* itemUI kiyna function ek ahadanwa 2. */
    const ui = ( /* meka athulta design eka danwa 3.  */
      <Pressable onPress={m}>
        <View style={styles.item}>
          <Image source={{ uri: "http://10.0.2.2/ReactChat/" + item.pic }}  //kelinma server eke thina img eka gannawa
            style={styles.itemImage}
          />
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.msg}</Text>
          </View>
          <View style={styles.itemView2}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>

      </Pressable>
    );
    return ui; /* ui eka return karnwa 4. */

    function m() {
      const obj = {
        "name": item.name,
        "id": item.id,
        "img": "http://10.0.2.2/ReactChat/" + item.pic,
      };
      navigation.navigate("Chat", obj); //navigate wenna ona thena denwa ona thenadi (home ekta navigate wenwa
    }
  }

}


const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center", //text eka row eke center karnwa
  },
  homeText1: { //home-text kiyla danne be, eka css widiyta wge ena nisa 
    fontSize: 28,
    paddingVertical: 15, //athulen ida thiyanwa
    color: "#17103f",
    fontFamily: "DancingScript",
  },
  homeInput1: {
    height: 35,
    borderStyle: "solid",
    borderWidth: 1,
    width: "90%",
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 45,
    borderColor: "#2b2b2b",
  },
  homeView1: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeInput1Image: {
    position: "absolute",
    end: 20,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  itemText1: {
    color: "#303030",
    fontSize: 20,
    fontWeight: "bold",
  },
  itemText2: {
    color: "#757468",
    fontSize: 16,
  },
  itemText3: {
    fontSize: 14,
    color: "#6F6F6F",
    paddingBottom: 5,
  },
  itemText4: {
    fontSize: 14,
    color: "white",
  },
  itemShape1: {
    width: 24,
    height: 24,
    backgroundColor: "#0B1FF7",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  itemView1: {
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "60%",
  },
  itemView2: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "15%",
  },
});
