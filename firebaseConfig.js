// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCGdauBJEr4uEIx_hCJYi_gI8Atljrm1II",
  authDomain: "fir-chat-a8dfe.firebaseapp.com",
  projectId: "fir-chat-a8dfe",
  storageBucket: "fir-chat-a8dfe.appspot.com",
  messagingSenderId: "545603515345",
  appId: "1:545603515345:web:9702a0246955ec49e666f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');