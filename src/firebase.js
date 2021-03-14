import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSzhEbIsfDBy6xBgBXXM0NDfvGVklX0lY",
    authDomain: "satisfactory-a7a0f.firebaseapp.com",
    projectId: "satisfactory-a7a0f",
    storageBucket: "satisfactory-a7a0f.appspot.com",
    messagingSenderId: "476904004984",
    appId: "1:476904004984:web:99ed3df8cb41cc33b83c8d"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();