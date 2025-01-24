// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-d345a.firebaseapp.com",
  projectId: "realestate-d345a",
  storageBucket: "realestate-d345a.firebasestorage.app",
  messagingSenderId: "362237290135",
  appId: "1:362237290135:web:4aba440052fe6dba80abd2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);