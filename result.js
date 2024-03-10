import { db } from "./firestore.js";
import { collection, getDocs, doc, writeBatch, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
        history.pushState(users, null, "bonus.html");
        location.href = 'bonus.html';
    }, 10000);

    const batch = writeBatch(db);
    for(let i = 0; i < 32; i++){
        batch.delete(doc(db, "cards", String(i)));
    }
    await batch.commit();

    await setDoc(doc(db, "status", "drawUserId"), { id: "1" });
}
