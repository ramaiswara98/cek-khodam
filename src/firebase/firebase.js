// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHliRav3hPoiYynRnWCEoYFc1FKlnVfyY",
  authDomain: "cekkhodam-86fe6.firebaseapp.com",
  projectId: "cekkhodam-86fe6",
  storageBucket: "cekkhodam-86fe6.appspot.com",
  messagingSenderId: "1043990751065",
  appId: "1:1043990751065:web:36943d0179221a33220e48",
  measurementId: "G-6S9ZHHTMNS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);