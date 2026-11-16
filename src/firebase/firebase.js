import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDC2UChNyG6qEf2wHILn3BNaaC8VIcDjvc",
  authDomain: "netflix-clone-51121.firebaseapp.com",
  projectId: "netflix-clone-51121",
  storageBucket: "netflix-clone-51121.firebasestorage.app",
  messagingSenderId: "197813645513",
  appId: "1:197813645513:web:7fb5ea6c478eb8bf391d18",
  measurementId: "G-MKQP40P7WL"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)