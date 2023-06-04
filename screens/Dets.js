/**
 * @abstract Our home app screen
 */

import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { SimpleLineIcons } from "@expo/vector-icons";
import Signup from "./Signup";

const backImage = require("../assets/gali.png");


const Dets = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };


  return (
    <View style={styles.container}>

      <Image source={backImage} style={styles.backImage} />
      <View>
      <Text style={styles.textS}>name: {auth?.currentUser?.displayName}</Text>
      <Text style={styles.textS}>email: {auth?.currentUser?.email}</Text>
      <Text style={styles.textS}>age: {auth?.currentUser?.age}</Text>
      

      </View>
      
      <TouchableOpacity onPress={onSignOut} style={{ marginTop: 20 , bottom: -100 }}>
        <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
   
    </View>
  );
};

export default Dets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
 textS:
 {
    top: -50 ,
    fontWeight: "bold", 
    color: "black", 
    fontSize: 25,
    textAlign: "center",
    marginTop:10,

 },

  backImage:{
    top: '-17%' ,
    width: 200,
    height: 200,
    borderRadius: 100 ,
  }
});