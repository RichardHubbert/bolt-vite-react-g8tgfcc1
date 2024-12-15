import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_g-Vz70BFWg_0qfPmkpkgU81GsiFw4ZM",
  authDomain: "survey-designer-e19e3.firebaseapp.com",
  projectId: "survey-designer-e19e3",
  storageBucket: "survey-designer-e19e3.firebasestorage.app",
  messagingSenderId: "719958744160",
  appId: "1:719958744160:web:d1b233d0ecb4baa08c7705"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);