import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBH2DW6M-M6Y62UqdBOnq3RhJdqnXEs5-s",
    authDomain: "crwn-clothing-db-6a839.firebaseapp.com",
    projectId: "crwn-clothing-db-6a839",
    storageBucket: "crwn-clothing-db-6a839.appspot.com",
    messagingSenderId: "135137139",
    appId: "1:135137139:web:ac0669a7dc6ce6474e2706"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);