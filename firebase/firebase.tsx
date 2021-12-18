import firebase from 'firebase/app'
import 'firebase/database'

require('dotenv').config()
console.log()

const config = {
  apiKey: process.env.NEXT_PUBLIC_api_key,
  authDomain: process.env.NEXT_PUBLIC_domain,
  databaseURL: process.env.NEXT_PUBLIC_dbURL,
  projectId: process.env.NEXT_PUBLIC_id,
  storageBucket: process.env.NEXT_PUBLIC_bucket,
  messagingSenderId: "508637613984",
  appId: "1:508637613984:web:36c2b16bb9f7ea30c45ec5",
  measurementId: "G-FW2CBH7SVV"
};


  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const database = firebase.database()

  export {firebase, database as default} 