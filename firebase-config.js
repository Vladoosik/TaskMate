import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUSFOYnwvmnQaI95MAvuB6y91KThFCp4w",
  authDomain: "taskmate-7ab2d.firebaseapp.com",
  projectId: "taskmate-7ab2d",
  storageBucket: "taskmate-7ab2d.firebasestorage.app",
  messagingSenderId: "1075208889306",
  appId: "1:1075208889306:web:ca9fd6bea7f456a9dad6e3",
  measurementId: "G-N3W37PZY97",
};

export const app = initializeApp(firebaseConfig, {});
export const auth = initializeAuth(app);
export const db = getFirestore(app);
