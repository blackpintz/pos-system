import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyALhzzEHt8k_aHl1ARc24EuDLNxwtRZ0-k",
  authDomain: "rose-3bae9.firebaseapp.com",
  databaseURL: "https://rose-3bae9-default-rtdb.firebaseio.com",
  projectId: "rose-3bae9",
  storageBucket: "rose-3bae9.appspot.com",
  messagingSenderId: "508637613984",
  appId: "1:508637613984:web:36c2b16bb9f7ea30c45ec5",
  measurementId: "G-FW2CBH7SVV"
};


  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const database = firebase.database()

  export {firebase, database as default} 