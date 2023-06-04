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


const Home = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.white}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={backImage}
          style={{
            borderRadius: '100',
            width: 40,
            height: 40,
            marginRight: 15,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", color: "black", fontSize: 25 }}>
      {auth?.currentUser?.displayName} Welcome Home
      </Text>
      <TouchableOpacity onPress={onSignOut} style={{ marginTop: 20 }}>
        <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
  
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
  mapButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});