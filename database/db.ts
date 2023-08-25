// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC385f5QiSwlwSu1HuXXtqCbblFG98Z7vw",
  authDomain: "assignment-project-b9e2f.firebaseapp.com",
  databaseURL: "https://assignment-project-b9e2f-default-rtdb.firebaseio.com",
  projectId: "assignment-project-b9e2f",
  storageBucket: "assignment-project-b9e2f.appspot.com",
  messagingSenderId: "553258919378",
  appId: "1:553258919378:web:661e9d199f575634ea540b",
  measurementId: "G-N9C1VJKYLX",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(fire);

export const storage = getStorage(fire);

export const auth = getAuth(fire);

export default fire;