import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, collection, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getUser(){
    const name = document.querySelector('input#username').value;
    const mbti = document.querySelector('input#usermbti').value;

    if(name === '' || mbti === ''){
        alert('名前とMBTIを入力してください');
        return;
    }
    
    const user = {
        name,
        mbti,
        score: 0
    };

    return user;
}

async function getUserCount() {
    const snapShot = await getCountFromServer(collection(db, "users"));
    const count = snapShot.data().count;
    return count;
}

async function createUser(id, user) {
    await setDoc(doc(db, "users", id), user);
}

const buton=document.getElementById('start');
buton.addEventListener('click', async function(){
    const user = getUser();
    if(!user) return;

    const count = await getUserCount();
    const id = String(count + 1);

    await createUser(id, user);

    location.href = 'select.html';
});
