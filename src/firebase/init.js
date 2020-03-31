import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC6dLYGs_drUQA8gmawlh47QZ4AWwCwQeI",
    authDomain: "employees-management-acd40.firebaseapp.com",
    databaseURL: "https://employees-management-acd40.firebaseio.com",
    projectId: "employees-management-acd40",
    storageBucket: "employees-management-acd40.appspot.com",
    messagingSenderId: "333355976730",
    appId: "1:333355976730:web:131bd6df3a88f22082a9a3",
    measurementId: "G-QFGSW9Z6C0"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

//export firestore database
export default firebaseApp.firestore()