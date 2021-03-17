import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD49vgMAQQHfKc31a_1mSoptKjJEPSPa70",
    authDomain: "bt3103-week-6-7da9c.firebaseapp.com",
    projectId: "bt3103-week-6-7da9c",
    storageBucket: "bt3103-week-6-7da9c.appspot.com",
    messagingSenderId: "697392191034",
    appId: "1:697392191034:web:0e07c5579d87566b344703",
    measurementId: "G-42NQ9V9JJY"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;


