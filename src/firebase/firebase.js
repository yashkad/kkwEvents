// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoKTZrrMY2lC086AkQXmJi4_a0eqVmHo0",
  authDomain: "project-kkw.firebaseapp.com",
  projectId: "project-kkw",
  storageBucket: "project-kkw.appspot.com",
  messagingSenderId: "633936516509",
  appId: "1:633936516509:web:0b1cf7b3665d4cd14d8b74",
  measurementId: "G-5YY000KBX3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const storageRef = ref(storage);
const analytics = getAnalytics(app);
