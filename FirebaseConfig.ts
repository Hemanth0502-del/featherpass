// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRxa6uLdsBqIp0lI7b5rUye5vCrMvfQ_o",
  authDomain: "featherpass02.firebaseapp.com",
  projectId: "featherpass02",
  storageBucket: "featherpass02.firebasestorage.app",
  messagingSenderId: "191490488518",
  appId: "1:191490488518:web:7bddf41bfe35a10d16bfc7",
  measurementId: "G-MCE42X4TJW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
const analytics = getAnalytics(app);