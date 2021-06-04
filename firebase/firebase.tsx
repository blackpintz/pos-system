import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyDRN1qwil5t5TOp5eod5nlg4dKyv6mWxX8",
  authDomain: "crrntx.firebaseapp.com",
  databaseURL: "https://crrntx-default-rtdb.firebaseio.com",
  projectId: "crrntx",
  storageBucket: "crrntx.appspot.com",
  messagingSenderId: "663316229088",
  appId: "1:663316229088:web:8c3d7bff87ffd306abd985",
  measurementId: "G-K1HZ9G2PV0"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const database = firebase.database()

  export {firebase, database as default} 