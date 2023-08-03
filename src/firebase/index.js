// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA47DvuY16tReABDzOE-E8MOAhOJxtMtLI",
  authDomain: "fir-react-auth-6b6fb.firebaseapp.com",
  projectId: "fir-react-auth-6b6fb",
  storageBucket: "fir-react-auth-6b6fb.appspot.com",
  messagingSenderId: "1041332032286",
  appId: "1:1041332032286:web:02f22fa459563a6e3d2f0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);