import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC3QLAn77JYqryUDvsZz-JQU9dfa0qc1NI",
    authDomain: "nutricare-ff68e.firebaseapp.com",
    projectId: "nutricare-ff68e",
    storageBucket: "nutricare-ff68e.appspot.com",
    messagingSenderId: "96735929426",
    appId: "1:96735929426:web:d6101dc2fb77c01be3ab8b"
  };

  
// Init firebase
const app = initializeApp(firebaseConfig);

// Init services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
