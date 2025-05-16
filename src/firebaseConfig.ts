// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Tquy5HD65Ai_Oe547DZq69HvHwdV7jk",
  authDomain: "cyberalert-47855.firebaseapp.com",
  projectId: "cyberalert-47855",
  storageBucket: "cyberalert-47855.firebasestorage.app",
  messagingSenderId: "254269815378",
  appId: "1:254269815378:web:03e68540ff8f0bf446bd8b",
  measurementId: "G-BV0WN9SWZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
