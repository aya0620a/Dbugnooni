import { db } from "./firestore.js";
import { collection, doc, getDocs, getDoc , onSnapshot, writeBatch} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

//カードの作成
const cards = [{
    "name": "ENTP",
    "num": 0,
    "img": "ENTPcard.png",
    "class": "cardback"
},{
    "name": "INTP",
    "num": 1,
    "img": "INTPcard.png",
    "class": "cardback"
},{
    "name": "ENTJ",
    "num": 2,
    "img": "ENTJcard.png",
    "class": "cardback"
},{
    "name": "INTJ",
    "num": 3,
    "img": "INTJcard.png",
    "class": "cardback"
},{
    "name": "ENFP",
    "num": 4,
    "img": "ENFPcard.png",
    "class": "cardback"
},{
    "name": "INFP",
    "num": 5,
    "img": "INFPcard.png",
    "class": "cardback"
},{
    "name": "ENFJ",
    "num": 6,
    "img": "ENFJcard.png",
    "class": "cardback"
},{
    "name": "INFJ",
    "num": 7,
    "img": "INFJcard.png",
    "class": "cardback"
},{
    "name": "ISFP",
    "num": 8,
    "img": "ISFPcard.png",
    "class": "cardback"
},{
    "name": "ESFP",
    "num": 9,
    "img": "ESFPcard.png",
    "class": "cardback"
},{
    "name": "ISFJ",
    "num": 10,
    "img": "ISFJcard.png",
    "class": "cardback"
},{
    "name": "ESFJ",
    "num": 11,
    "img": "ESFJcard.png",
    "class": "cardback"
},{
    "name": "ISTP",
    "num": 12,
    "img": "ISTPcard.png",
    "class": "cardback"
},{
    "name": "ESTP",
    "num": 13,
    "img": "ESTPcard.png",
    "class": "cardback"
},{
    "name": "ISTJ",
    "num": 14,
    "img": "ISTJcard.png",
    "class": "cardback"
},{
    "name": "ESTJ",
    "num": 15,
    "img": "ESTJcard.png",
    "class": "cardback"
}];

let currentUsers = 0;

async function loadUsers(){
    const snapShot = await getDocs(collection(db, "users"));
    const users = [];
    snapShot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}

async function loadCurrentUser(){
    const id = localStorage.getItem('user_id');
    const snapShot = await getDoc(doc(db, "users", id));
    const user = snapShot.data();

    return user;
}

let turnFlag = false;

function judgeTurn(){
    const id = localStorage.getItem('user_id');
    const unsubscribe = onSnapshot(doc(db, "status", "drawUserId"), (doc) => {
        const drawUserId = doc.data().id;
        turnFlag = (id === drawUserId);

    });
}

judgeTurn();

let users;

// let users = [{
//     "name": "user1",
//     "mbti": "ENTP",
//     "score": 0,
//     "bonusscore": 0
// },{
//     "name": "user2",
//     "mbti": "INTP",
//     "score": 0,
//     "bonusscore": 0
// },{
//     "name": "user3",
//     "mbti": "ENTJ",
//     "score": 0,
//     "bonusscore": 0
// },{
//     "name": "user4",
//     "mbti": "INTJ",
//     "score": 0,
//     "bonusscore": 0
// }]

const gameboard = document.getElementById("gameboard");

//カードを複製しシャッフルする
const createShuffledCards = () => {
    let shuffledCards = []; 
    for(let i = 0; i < 16; i++){
        let temp1 = {...cards[i]};
        let temp2 = {...cards[i]};
        shuffledCards.push(temp1);
        shuffledCards.push(temp2);
    }
    shuffle(shuffledCards);
    shuffledCards.forEach((card, index) => {
        card.position = index;
    });

    return shuffledCards;
}

//カードをクリックしたときの処理
const onclick = (e) => {
    if(turnFlag) turn(e);
}

//裏返しのカードを表示
const displayCards = (shuffledCards) => {
    for(let i = 0; i < 32; i++){
        const card = shuffledCards[i];
        const div = document.createElement("div");
        div.onclick = onclick;
        div.className = card.class;
        div.id = "card" + i;
        div.number = card.num;
        div.index = i;
        document.getElementById("gameboard").appendChild(div);
    }
}

//カードをシャッフルする
function shuffle(shuffledCards){
    for(let i = 0; i < 32; i++){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffledCards[j];
        shuffledCards[j] = shuffledCards[i];
        shuffledCards[i] = temp;
    }
}

function isHost(){
    const id = localStorage.getItem('user_id');
    return id === "3";
}

function getShuffledCards(snapShot){
    const shuffledCards = [];
    snapShot.forEach((doc) => {
        shuffledCards.push(doc.data());
    });
    shuffledCards.sort((a, b) => a.position - b.position);

    return shuffledCards;
}

let shuffledCards;

//画面が表示されたときに実行される
window.onload = async function(){
    users = await loadUsers();
    let username = document.getElementById("nextplayer");
    username.innerHTML = `${users[currentUsers].name}さんの番です`;

    if(isHost()){
        const shuffledCards = createShuffledCards();
        const batch = writeBatch(db);
        for(let i = 0; i < shuffledCards.length; i++){
            const cardId = String(i);
            const card = shuffledCards[i];
            const cardRef = doc(db, "cards", cardId);
            batch.set(cardRef, card);
        }
        await batch.commit();
    }

    const unsubscribe = onSnapshot(collection(db, "cards"), (querySnapshot) => {
        shuffledCards = getShuffledCards(querySnapshot);
        displayCards(shuffledCards);
    });
}

//カードを一枚引いたかどうかの判定
let flgFirst = true; 

//最初に引いたカード
let firstcard;

//連続処理防止
let backTimer;

//裏返しの処理
function turn(e){
    let div = e.target;

    if(backTimer){
        return;
    };
    if(div.innerHTML === ""){
        div.className = "cardface";
        shuffledCards[div.index].class = "cardface";
        div.innerHTML = `<img src="img/${cards[div.number].img}">`; 
    }else{
        return;
    }
    if(flgFirst){
        firstcard = div;
        flgFirst = false;
    }else{
        if(firstcard.number === div.number){
            users[currentUsers].score++;
            // console.log(users[currentUsers].score);
            backTimer = setTimeout(function(){
                div.className = "cardfinish";
                shuffledCards[div.index].class = "cardfinish";
                firstcard.className = "cardfinish";
                shuffledCards[firstcard.index].class = "cardfinish";
                div.innerHTML = "";
                firstcard.innerHTML = "";
                //絶対一緒だから、+1*2
                if(users[currentUsers].mbti === cards[firstcard.number].name){
                    users[currentUsers].bonusscore += 2;
                }
                backTimer = NaN;
                if(shuffledCards.every(card=>card.class === "cardfinish")){
                    history.pushState(users, null, 'result.html');
                    location.href = 'result.html';
                }
            }, 1000);
        }else if((firstcard.number%8) === (div.number%8)){
            users[currentUsers].score+=2;
            console.log(users[currentUsers].score);
            backTimer = setTimeout(function(){
                div.className = "cardfinish";
                shuffledCards[div.index].class = "cardfinish";
                firstcard.className = "cardfinish";
                shuffledCards[firstcard.index].class = "cardfinish";
                div.innerHTML = "";
                firstcard.innerHTML = "";
                if(users[currentUsers].mbti === cards[firstcard.number].name){
                    users[currentUsers].bonusscore += 1;
                }
                if(users[currentUsers].mbti === cards[div.number].name){
                    users[currentUsers].bonusscore += 1;
                }
                backTimer = NaN;
                if(shuffledCards.every(card=>card.class === "cardfinish")){
                    history.pushState(users, null, 'result.html');
                    location.href = 'result.html';
                }
            }, 1000);
        }else{
            backTimer = setTimeout(function(){
                div.className = "cardback";
                shuffledCards[div.index].class = "cardback";
                div.innerHTML = "";
                firstcard.className = "cardback";
                shuffledCards[firstcard.index].class = "cardback";
                firstcard.innerHTML = "";
                firstcard = null;
                backTimer = NaN;
                // currentUsers = (currentUsers + 1) % usersuu;

                let username = document.getElementById("nextplayer");
                username.innerHTML = `${users[currentUsers].name}さんの番です`;
            }, 1000);
        };
        flgFirst = true;
    }
}

