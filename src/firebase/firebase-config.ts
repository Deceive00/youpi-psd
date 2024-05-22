// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "youpi-92b43.firebaseapp.com",
  projectId: "youpi-92b43",
  storageBucket: "youpi-92b43.appspot.com",
  messagingSenderId: "313366489691",
  appId: "1:313366489691:web:3a3c2f99c41b407da02d7e",
  measurementId: "G-QY4W1NYYZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);