import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Import getDatabase

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBK2pCmtWpVd0L4Y4DWuEvJ1dGi4ByIz4s',
  authDomain: 'aircraft-monitoring-syst-dc5dc.firebaseapp.com',
  databaseURL: 'https://aircraft-monitoring-syst-dc5dc-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'aircraft-monitoring-syst-dc5dc',
  storageBucket: 'aircraft-monitoring-syst-dc5dc.appspot.com',
  messagingSenderId: '320070089409',
  appId: '1:320070089409:web:662f5a82fcee4d9e00b240',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Get reference to Realtime Database

export { app, auth, database };
