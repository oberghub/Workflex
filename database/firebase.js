// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9mkHHEerSW8odKlFetRqAcajgfuN37VE",
  authDomain: "workout-mdp.firebaseapp.com",
  projectId: "workout-mdp",
  storageBucket: "workout-mdp.appspot.com",
  messagingSenderId: "351829750970",
  appId: "1:351829750970:web:88020f19f8ac2afd2f7e83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);
