import { getFirestore } from "firebase/firestore";
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQTpXuel_BzU88XS1a8YS2cbDXCVWQuLI",
  authDomain: "cssoft-pj.firebaseapp.com",
  projectId: "cssoft-pj",
  storageBucket: "cssoft-pj.appspot.com",
  messagingSenderId: "815256170507",
  appId: "1:815256170507:web:0449d3fafa83f580a6d70e",
  measurementId: "G-HSWHL4SEE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export default db;
