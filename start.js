import { db } from "./firestore.js";
import { doc, setDoc, collection, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
        score: 0,
        bonusscore: 0
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

    if(count >= 4){
        alert('すでに4人のプレイヤーがいます');
        return;
    }

    const id = String(count + 1);
    await createUser(id, user);
    localStorage.setItem('user_id', id);

    location.href = 'select.html';
});
