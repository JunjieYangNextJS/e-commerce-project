import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAjDDlt-TS08BTSSj4V4b7vP5iAuEpcr2M",
  authDomain: "my-e-commerce-site-631bc.firebaseapp.com",
  projectId: "my-e-commerce-site-631bc",
  storageBucket: "my-e-commerce-site-631bc.appspot.com",
  messagingSenderId: "816487740195",
  appId: "1:816487740195:web:c6f469bfaea180420a9296",
  measurementId: "G-1RHDSFM156",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const increment = firebase.firestore.FieldValue.increment(1);

export { db, auth, provider, increment };
