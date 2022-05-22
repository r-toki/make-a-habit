import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDPNRZICBrLoUOCNEnsCh4k_nRxKOkWpT0',
  authDomain: 'make-a-habit-fd3f5.firebaseapp.com',
  projectId: 'make-a-habit-fd3f5',
  storageBucket: 'make-a-habit-fd3f5.appspot.com',
  messagingSenderId: '165578706095',
  appId: '1:165578706095:web:a95f32bc1d82d9c852585a',
  measurementId: 'G-8DEQ32LR47',
};

export const initializeFirebaseApp = () => {
  initializeApp(config);

  if (!import.meta.env.PROD) {
    connectAuthEmulator(getAuth(), 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
  }
};
