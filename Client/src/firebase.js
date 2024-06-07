// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //since we are using VITE we need to use import.meta.env instead of process.env
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,
  authDomain: "mern-blog-5b971.firebaseapp.com",
  projectId: "mern-blog-5b971",
  storageBucket: "mern-blog-5b971.appspot.com",
  messagingSenderId: "293713000877",
  appId: "1:293713000877:web:6d39bde1dec6c6573ac924"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

