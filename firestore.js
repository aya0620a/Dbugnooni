// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCTDwyZQkEgMiSy4LcyUpn5EiePVAABscc",
authDomain: "debugnooni.firebaseapp.com",
databaseURL: "https://debugnooni-default-rtdb.firebaseio.com",
projectId: "debugnooni",
storageBucket: "debugnooni.appspot.com",
messagingSenderId: "366109892524",
appId: "1:366109892524:web:dd95667db61c7b61106409",
measurementId: "G-PBXXWFYJWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
