import { db } from "./firestore.js";
import { collection, doc, getDocs, writeBatch } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

window.onload = async function(){
    

    let result = document.getElementById('result');
    let maxscore = 0;
    let maxuser = '';
    let tmpuser = '';
    let users=[];

    const snapshot = await getDocs(collection(db,"users"));
    snapshot.forEach((doc)=>{
        users.push(doc.data())
    })

    users.forEach((user)=>{
        
        for(let i = 1; i < users.length; i++){
            if(users[i].score > users[i-1].score){
                tmpuser = users[i-1];
                users[i-1] = users[i];
                users[i] = tmpuser; 
            }
        }
    });
    // console.log(users);
    document.getElementById('firstname').innerHTML = users[0].name;
    document.getElementById('firstpoint').innerHTML = `${users[0].score}pt`;
    document.getElementById('secondname').innerHTML = users[1].name;
    document.getElementById('secondpoint').innerHTML = `${users[1].score}pt`;
    document.getElementById('thirdname').innerHTML = users[2].name;
    document.getElementById('thirdpoint').innerHTML = `${users[2].score}pt`;
    document.getElementById('fourthname').innerHTML = users[3].name;
    document.getElementById('fourthpoint').innerHTML = `${users[3].score}pt`;

    history.pushState(users, null, 'bonus.html');

    setTimeout(function(){
        location.href = 'bonus.html';
    }, 10000);



}

