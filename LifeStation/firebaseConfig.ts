import { initializeApp, FirebaseOptions } from 'firebase/app';
import { initializeAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these placeholder values with your actual Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  projectId: 'PROJ_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});
export const db = getFirestore(app);