import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDb6gNcvfrY_N0EfZagxoUvEfMqKlUeIkI",
  authDomain: "chat-49898.firebaseapp.com",
  projectId: "chat-49898",
  storageBucket: "chat-49898.appspot.com",
  messagingSenderId: "103081381935",
  appId: "1:103081381935:web:55087713a0430dc592b6da",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
