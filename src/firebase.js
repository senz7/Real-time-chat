import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCBJOG7BXQLsB3vW-APBRcq20mwFa3h5M",
  authDomain: "online-chat-cc86e.firebaseapp.com",
  projectId: "online-chat-cc86e",
  storageBucket: "online-chat-cc86e.appspot.com",
  messagingSenderId: "879490098893",
  appId: "1:879490098893:web:4ee33cbb7cfb43d5226b84",
  measurementId: "G-CBMPX8HJPC",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
