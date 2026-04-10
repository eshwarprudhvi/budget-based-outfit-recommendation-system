// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDamch7x4zEZqm18cn_qlR365d4EW3_BiQ",
  authDomain: "outfit-recommendation-3ace5.firebaseapp.com",
  projectId: "outfit-recommendation-3ace5",
  storageBucket: "outfit-recommendation-3ace5.firebasestorage.app",
  messagingSenderId: "1027807046391",
  appId: "1:1027807046391:web:ad70cde767a73301ad41f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
