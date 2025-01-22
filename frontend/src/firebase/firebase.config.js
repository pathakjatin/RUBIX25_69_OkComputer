// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCstE83d3FwOlfdih4mZeom-ektcJU00xQ",
  authDomain: "collab-forge.firebaseapp.com",
  projectId: "collab-forge",
  storageBucket: "collab-forge.firebasestorage.app",
  messagingSenderId: "230463145483",
  appId: "1:230463145483:web:5fd2e57175fad40fbaa90e",
  measurementId: "G-7BPRWE9G98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { auth, db };