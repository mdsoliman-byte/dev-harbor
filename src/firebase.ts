import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk2LhDHBEl2TK2Xru54II_RTE8TSoMz0M",
  authDomain: "portfolio-15aa6.firebaseapp.com",
  projectId: "portfolio-15aa6",
  storageBucket: "portfolio-15aa6.firebasestorage.app",
  messagingSenderId: "173560042696",
  appId: "1:173560042696:web:59523f57fb56d06e2801fd",
  measurementId: "G-PPGN5G6WSQ"
};

import { collection, doc, setDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const setConfig = async (config: any) => {
  try {
    const configCollection = collection(db, 'config');
    const configDoc = doc(configCollection, 'serviceConfig');
    await setDoc(configDoc, config);
    console.log('Service configuration saved to Firebase');
  } catch (error) {
    console.error('Error saving service configuration to Firebase:', error);
  }
};

export { db, setConfig };
