import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC8B8kB_EZkDewgyItVXmdd9m2Oo4MP3t4",
    authDomain: "my-todo-list-firebase.firebaseapp.com",
    projectId: "my-todo-list-firebase",
    storageBucket: "my-todo-list-firebase.appspot.com",
    messagingSenderId: "74071702585",
    appId: "1:74071702585:web:edcdcaa46565abf3a1a1e8"
  };


firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider =new firebase.auth.GoogleAuthProvider();

export{
  db,
  googleAuthProvider, 
  firebase  
}