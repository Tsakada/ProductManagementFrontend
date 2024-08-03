// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-BB2v8H2gl5qeAA1TntqXHfz2631BNdM",
    authDomain: "productmanagement-ae524.firebaseapp.com",
    projectId: "productmanagement-ae524",
    storageBucket: "productmanagement-ae524.appspot.com",
    messagingSenderId: "239836829077",
    appId: "1:239836829077:web:45effefb38b30efc44529c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
