import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// The configuration
const firebaseConfig = {
  apiKey : Constants.manifest.extra.API_KEY,

  authDomain: Constants.manifest.extra.AUTH_DOMAIN,

  projectId: Constants.manifest.extra.PROJECT_ID,

  storageBucket: Constants.manifest.extra.STORAGE_BUCKET,

  messagingSenderId: Constants.manifest.extra.MESSAGING_SENDER_ID,

  APPID: Constants.manifest.extra.APP_ID,

  MEASUREMENTID: Constants.manifest.extra.MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
