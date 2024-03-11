import { db } from "./firestore.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

function getUsers(snapShot){
    const users = [];
    snapShot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}

function showUsers(users){
    const trlist = document.querySelectorAll('tbody tr');
    for(let i=0; i<trlist.length; i++){
        trlist[i].querySelector('span.name').textContent = "";
        trlist[i].querySelector('span.mbti').textContent = "";
    }
    for(let i=0; i<users.length; i++){
        trlist[i].style.display = "table-row";
        trlist[i].querySelector('span.name').textContent = users[i].name;
        trlist[i].querySelector('span.mbti').textContent = users[i].mbti;
    }
}
const q = collection(db, "users");
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users = getUsers(querySnapshot);
    showUsers(users);

    if(users.length === 4){
        unsubscribe();
        // setTimeout(() => {
        //     location.href = 'game.html';
        // }, 3000);
    }
});

console.log(localStorage.getItem('user_id'));