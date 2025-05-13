import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace these placeholder values with your actual Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAcj4NLumSJOI1pG5BZpZ9kkkYeeXo264U',
  authDomain: 'lifestation-810e9.firebaseapp.com',
  projectId: 'lifestation-810e9',
  storageBucket: 'lifestation-810e9.appspot.com',
  messagingSenderId: '5988746918',
  appId: '1:5988746918:web:b4010bdd7e48bd51f95667',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
