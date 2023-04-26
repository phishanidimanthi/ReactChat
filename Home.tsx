import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Image, FlatList, TouchableOpacity, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({ navigation }) {

  const [searchText, setSearchText] = useState("");

  const [items, setItems] = useState([]);

  async function loadFriendList(text) {

    const userJSONText = await AsyncStorage.getItem('user');
    const formData = new FormData();
    formData.append('userJSONText', userJSONText);
    formData.append("text", text);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItems(JSON.parse(request.responseText));
      }
    };
    request.open("POST", "http://10.0.2.2/ReactChat/load_users.php", true);
    request.send(formData);
  }
  function start() {
    loadFriendList("");
  }

  useEffect(start, []);

  const ui = (
    <SafeAreaView style={styles.home}>
      <View style={styles.homeView1}>
        <TextInput style={styles.homeInput1} autoCorrect={false} placeholder='Seach Chat' placeholderTextColor={"#6C6F83"} onChangeText={loadFriendList} />
      </View>
      <FlatList data={items} renderItem={itemUI} />
    </SafeAreaView>
  );
  return ui;

  function itemUI({ item }) {
    const ui = (
      <Pressable onPress={m}>
        <View style={styles.item}>
          <Image source={{ uri: "http://10.0.2.2/ReactChat/" + item.pic }}
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
    return ui;

    function m() {
      const obj = {
        "name": item.name,
        "id": item.id,
        "img": "http://10.0.2.2/ReactChat/" + item.pic,
      };
      navigation.navigate("Chat", obj); 

    }
  }

}


const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#01011E",

  },
  homeInput1: {
    height: 45,
    borderStyle: "solid",
    borderWidth: 1,
    width: "90%",
    borderRadius: 20,
    fontSize: 20,
    color: "#6C6F83",
    paddingLeft: 15,
    paddingRight: 45,
    borderColor: "#2b2b2b",
  },
  homeView1: {
    marginTop: 20,
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
