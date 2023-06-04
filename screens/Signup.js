import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import {
  collection,
  
  orderBy,
  query,
  
} from "firebase/firestore";
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth, database } from "../config/firebase";
// import { collection, doc, setDoc ,  where, getDocs, collectionRef, orderBy } from "firebase/firestore"; 



const backImage = require("../assets/splash.png");
const backImage2 = require("../assets/zc.png");



export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");


  const handleSignup = () => {
    if (email !== "" && password !== "") {

      createUserWithEmailAndPassword(auth, email, password)
      
      .then(userDetails => {
        const user = userDetails.user;

        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: null
    
        }).then(() => navigation.navigate('Home'))
      })

        .catch((err) => Alert.alert("Error in Signup", err.message));
    }
  };





  

  return (
    <View style={styles.container}>
      <Image source={backImage2} style={styles.backImage2} /> 
      <View style={styles.whiteSheet} />
      
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="words"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="words"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          autoCapitalize="words"
          value={age}
          onChangeText={(text) => setAge(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          autoFocus={true}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

     
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Already have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#5A6092", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
        
              <Image source={backImage} style={styles.backImage} />
        
    </View>
    
  );



  


}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#5A6092",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "20%",
    height: 70,
    position: "absolute",
    top: 770 ,
    left: 27,
    // alignSelf : "center"
    // resizeMode: "cover",
  },

  backImage2: {
    width: "30%",
    height: 180,
    position: "absolute",
    top: 15 ,
    right: 0 , 
    // alignSelf : "center"
    // resizeMode: "cover",
  },

  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    top: 180 ,
    // justifyContent: "center",
    marginHorizontal: 30,

  },
  button: {
    backgroundColor: "#5A6092",
    height: 68,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
});