import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, 
  signInWithPopup, GoogleAuthProvider, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut,onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBG6G9d6yRaLSCLnqlRhXDe2FDHU1XBr3Q",
    authDomain: "ace-fleeting.firebaseapp.com",
    projectId: "ace-fleeting",
    storageBucket: "ace-fleeting.appspot.com",
    messagingSenderId: "205403427962",
    appId: "1:205403427962:web:a1412b008668298fcb97c3"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);



  export const createFleetDatabase = async (collectionKey, objectsToAdd) => {
    try {
      const TaskCollectionRef = collection(db, collectionKey);
      const batch = writeBatch(db);
  
      objectsToAdd.forEach((object) => {
        const newDocRef = doc(TaskCollectionRef); // Creating a new document reference
        batch.set(newDocRef, object);
      });
  
      await batch.commit();
      console.log('Documents added successfully!');
    } catch (error) {
      console.error('Error adding documents: ', error);
    }       
  };

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
    if (!userAuth) return;
    const userDocRef= doc(db, 'users', userAuth.uid);
  

    const userSnapshot = await getDoc(userDocRef);
   

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
          })
        }catch(error){
          console.log('error creating user', error.message)
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
   return await createUserWithEmailAndPassword(auth, email, password); 
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
   return await signInWithEmailAndPassword(auth, email, password); 
  }

  export const signOutUser = async() => await signOut(auth);

  export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback);