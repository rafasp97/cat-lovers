// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaHeNk5xpmfPyax1fWRECkkrpQ0fpqQ-U",
  authDomain: "catlovers-977c6.firebaseapp.com",
  projectId: "catlovers-977c6",
  storageBucket: "catlovers-977c6.appspot.com",
  messagingSenderId: "1006388532643",
  appId: "1:1006388532643:web:deab50716eeb9199b7b616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }; 