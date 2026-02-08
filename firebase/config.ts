
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAV0_CKrjiNFqP8vRhjoeoVL9027Hh7y8",
  authDomain: "obaogig.firebaseapp.com",
  projectId: "obaogig",
  storageBucket: "obaogig.firebasestorage.app",
  messagingSenderId: "5775973169",
  appId: "1:5775973169:web:6c81433df08962c727ee10",
  measurementId: "G-YB4NT1Z5FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with the app instance
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
