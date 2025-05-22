import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDh-_0h35V7Kz9Fi5TjDN7KnTjclkNKqZw",
  authDomain: "qcmcalcbyhealthit.firebaseapp.com",
  projectId: "qcmcalcbyhealthit",
  storageBucket: "qcmcalcbyhealthit.firebasestorage.app",
  messagingSenderId: "695183400619",
  appId: "1:695183400619:web:c5ab737ad0f92d32a861ee",
  measurementId: "G-411BFGX3V6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export { db };
