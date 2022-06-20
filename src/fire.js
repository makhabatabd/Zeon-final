import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN0tsRy6wobSMiPF44xxbXBAEwbD8bsT8",
  authDomain: "zeon-d4902.firebaseapp.com",
  projectId: "zeon-d4902",
  storageBucket: "zeon-d4902.appspot.com",
  messagingSenderId: "1089803403643",
  appId: "1:1089803403643:web:aa109f3dfba35a3bdd7dde",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
