// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBS7O-2O9m9PffmCToVg9avUrvRlnShiE",
  authDomain: "rnx-video-chat.firebaseapp.com",
  projectId: "rnx-video-chat",
  storageBucket: "rnx-video-chat.firebasestorage.app",
  messagingSenderId: "821092443984",
  appId: "1:821092443984:web:6595b2584aa93d01376e55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
