import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
      } from 'firebase/auth';
import {getFirestore, 
        doc, 
        getDoc, 
        setDoc, 
        collection, 
        writeBatch,
        query,
        getDocs
      } from 'firebase/firestore';

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

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
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
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error crearing the user', error.message);
      }
    }
    //IF USER DATA EXISTS: return userDocRef
    return userDocRef;
  };

  //SIGN UP WITH E-MAIL AND PASSWORD
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //LOGIN WITH E-MAIL AND PASSWORD
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  };

  //SIGN OUT
  export const signOutUser = async () => await signOut(auth);

  //PROMIS BESED FLOW FOR SAGA
  export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
      const unsubscribe = onAuthStateChanged(
        auth, 
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      );
    });
  };
  
  //OBSERVER
  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

  //UPLOAD SHOP DATA TO FIRESTORE
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
  };

  //GET SHOP DATA FROM FIRESTORE
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  }

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();


