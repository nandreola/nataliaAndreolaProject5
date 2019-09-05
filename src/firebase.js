import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHXFUUUCs4ss7sr2D0K801f63lUPsj6w4",
    authDomain: "nataliaandreolaproject5.firebaseapp.com",
    databaseURL: "https://nataliaandreolaproject5.firebaseio.com",
    projectId: "nataliaandreolaproject5",
    storageBucket: "",
    messagingSenderId: "1053845961758",
    appId: "1:1053845961758:web:89fdca63d9e11232b8420f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;