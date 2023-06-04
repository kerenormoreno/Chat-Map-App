import { View, ActivityIndicator } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import colors from "./colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// import { createDrawerNavigator } from "@react-navigation/drawer";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
// import Map from "./screens/Map";
import ForgotPassword from "./screens/ForgotPassword";
import Chat from "./screens/Chat";
import Dets from "./screens/Dets";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});
const Tab = createBottomTabNavigator();

/**
 * For checking if we have a user or not
 */
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};


// ניווט בתוך האפליקצייה
function BottomTabNavigator() {
 return ( 
  
   <Tab.Navigator
     defaultScreenOptions={Home}
     screenOptions={{
       // headerShown: false,
       tabBarStyle: styles.tabBarStyle,
       tabBarActiveTintColor: colors.primary,
       tabBarInactiveTintColor: colors.dark,
     }}>
     <Tab.Screen
       name="Home"
       component={Home}
       options={{
         tabBarIcon: ({ color }) => (
            <MaterialIcons name="self-improvement" size={24} color={color} /> 
              ),
       }}
     />

<Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color }) => (
           <Ionicons name="chatbox" size={24} color={color} />      
         ),
        }}
      />

     <Tab.Screen
       name="Map"
       component={Map}
       options={{
         headerShown: false,
         tabBarIcon: ({ color }) => (
          <Feather name="map" size={24} color={color} />
         ),
       }
      }
     />

<Tab.Screen
       name="Dets"
       component={Dets}
       options={{
         headerShown: false,
         tabBarIcon: ({ color }) => (
          <AntDesign name="exclamationcircleo" size={24} color={color} />      
   ),
       }
      }
     />
    
   </Tab.Navigator>
  
 );
}

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
 
  );
}
// navagition from login to singup
function AuthStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      // setLoading(true);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStack />}
      {/* {user ? <ChatStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "relative",
    borderTopWidth: 0,
    bottom: 15,
    left: 15,
    right: 15,
    
  },

}

);


