import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword
      } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

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

  //SIGN IN/LOGIN WITH GOOGLE
const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log (userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //CHECK IF USER DATA EXISTS
    //IF USER DATA DOES NOT EXIST: create/set document with data from userAuth in my collection
    if(!userSnapshot.exists()) {
      const {displayName, email} =userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error crearing the user', error.message);
      }
    }
    //IF USER DATA EXISTS: return userDocRef
    return userDocRef;
  };

  //SIGN IN/LOGIN WITH E-MAIL AND PASSWORD
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();


