const firebaseConfig = {
  apiKey: "AIzaSyC4cUjbkisSv74V6_Y2zTlM7IE9fk-g_NY",
  authDomain: "collegefinder-d72c3.firebaseapp.com",
  projectId: "collegefinder-d72c3",
  storageBucket: "collegefinder-d72c3.appspot.com",
  messagingSenderId: "671069111916",
  appId: "1:671069111916:web:1c635513f2d5eb24b67a49"
};

// Initialize Firebase (CORRECT WAY)
firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();