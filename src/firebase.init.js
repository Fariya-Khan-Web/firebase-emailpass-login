// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3heaQXZ06G8t_KWSmd6QqHb7bHAsB6rc",
  authDomain: "email-pass-login-8ca6f.firebaseapp.com",
  projectId: "email-pass-login-8ca6f",
  storageBucket: "email-pass-login-8ca6f.firebasestorage.app",
  messagingSenderId: "354180410022",
  appId: "1:354180410022:web:0f7cca016b83d732262267"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;