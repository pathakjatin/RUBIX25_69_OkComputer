// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";  // Import the Storage service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCstE83d3FwOlfdih4mZeom-ektcJU00xQ",
  authDomain: "collab-forge.firebaseapp.com",
  projectId: "collab-forge",
  storageBucket: "collab-forge.firebasestorage.app",  // This is for Firebase Storage
  messagingSenderId: "230463145483",
  appId: "1:230463145483:web:5fd2e57175fad40fbaa90e",
  measurementId: "G-7BPRWE9G98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

// Export the Firebase services
export const googleProvider = new GoogleAuthProvider();
export { auth, db, storage };  // Export storage to use in other files
