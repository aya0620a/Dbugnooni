import { db } from "./firestore.js";
import { collection, getDocs, doc, writeBatch } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadUsers(){
    const users = [];
    const snapShot = await getDocs(collection(db,"users"));

    snapShot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}

window.onload = async function(){
    const users = await loadUsers();
    users.sort((a, b) => b.score - a.score);

    document.getElementById('firstname').innerHTML = users[0].name;
    document.getElementById('firstpoint').innerHTML = `${users[0].score}pt`;
    document.getElementById('secondname').innerHTML = users[1].name;
    document.getElementById('secondpoint').innerHTML = `${users[1].score}pt`;
    document.getElementById('thirdname').innerHTML = users[2].name;
    document.getElementById('thirdpoint').innerHTML = `${users[2].score}pt`;
    document.getElementById('fourthname').innerHTML = users[3].name;
    document.getElementById('fourthpoint').innerHTML = `${users[3].score}pt`;

    setTimeout(function(){
        location.href = 'bonus.html';
    }, 10000);
}
