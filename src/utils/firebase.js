// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsj_eZ6Xo7hLEmm3eSyAwjX_-bbRL7KCw",
  authDomain: "netflix-gpt-b3fa7.firebaseapp.com",
  projectId: "netflix-gpt-b3fa7",
  storageBucket: "netflix-gpt-b3fa7.appspot.com",
  messagingSenderId: "414316131002",
  appId: "1:414316131002:web:75881364ef417b7cccc883",
  measurementId: "G-ZZ56LNLFNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();