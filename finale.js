import { db } from "./firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
    users.sort((a,b) => {
        if((a.score + a.bonusscore) > (b.score + b.bonusscore)){
            return -1;
        }
        if((a.score + a.bonusscore) < (b.score + b.bonusscore)){
            return 1;
        }
    });

    document.getElementById('firstname').innerHTML = users[0].name;
    document.getElementById('firstpoint').innerHTML = `${users[0].score + users[0].bonusscore}pt`;
    document.getElementById('secondname').innerHTML = users[1].name;
    document.getElementById('secondpoint').innerHTML = `${users[1].score + users[1].bonusscore}pt`;
    document.getElementById('thirdname').innerHTML = users[2].name;
    document.getElementById('thirdpoint').innerHTML = `${users[2].score + users[2].bonusscore}pt`;
    document.getElementById('fourthname').innerHTML = users[3].name;
    document.getElementById('fourthpoint').innerHTML = `${users[3].score + users[3].bonusscore}pt`;

}