// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQN0NNy_QZ4zf6Ib2ZUpQ22aEzAydbPZ4",
  authDomain: "lam-discoballgame.firebaseapp.com",
  projectId: "lam-discoballgame",
  storageBucket: "lam-discoballgame.appspot.com",
  messagingSenderId: "584799945384",
  appId: "1:584799945384:web:4803d6df35a7c99fa8389d",
  measurementId: "G-1CY7X7Y36L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);