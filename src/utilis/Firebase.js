import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, setDoc, query, collection, writeBatch} from 'firebase/firestore'


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