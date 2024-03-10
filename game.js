import { db } from "./firestore.js";
import { collection, doc, getDocs, getDoc, setDoc, onSnapshot, writeBatch, updateDoc} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

function getUsers(snapShot){
    const users = [];
    snapShot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}

async function loadUsers(){
    const snapShot = await getDocs(collection(db, "users"));
    return getUsers(snapShot);
}

function shuffle(shuffledCards){
    for(let i = 0; i < 32; i++){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffledCards[j];
        shuffledCards[j] = shuffledCards[i];
        shuffledCards[i] = temp;
    }
}

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

const onclick = (e) => {
    if(turnFlag) turn(e);
}

function showCard(div, card, i){
    div.onclick = null;
    div.innerHTML = "";
    div.className = card.class;
    div.id = "card" + i;
    div.number = card.num;
    div.index = i;

    if(card.class === "cardback"){
        div.onclick = onclick;
    }
    if(card.class === "cardface"){
        div.innerHTML = `<img src="img/${card.img}">`;
    }
}

function showCards(shuffledCards){
    const gameboard = document.getElementById("gameboard");
    for(let i = 0; i < shuffledCards.length; i++){
        const div = gameboard.children[i];
        const card = shuffledCards[i];
        showCard(div, card, i);
    }
}

function createCards(){
    const gameboard = document.getElementById("gameboard");
    for(let i = 0; i < 32; i++){
        const div = document.createElement("div");
        gameboard.appendChild(div);
    }
}

function isHost(){
    const id = localStorage.getItem('user_id');
    return id === "1";
}

function getShuffledCards(snapShot){
    const shuffledCards = [];
    snapShot.forEach((doc) => {
        shuffledCards.push(doc.data());
    });
    shuffledCards.sort((a, b) => a.position - b.position);

    return shuffledCards;
}

async function nextUser() {
    const drawUserIdNumber = Number(drawUserId) - 1;
    const nextUserIdNumber = (drawUserIdNumber + 1) % users.length;
    const userId = String(nextUserIdNumber + 1);
    await setDoc(doc(db, "status", "drawUserId"), { id: String(userId) });
}

function getDrawUser() {
    const drawUserIdNumber = Number(drawUserId) - 1;
    return users[drawUserIdNumber];
}

function showDrawUser() {
    let username = document.getElementById("nextplayer");
    username.innerHTML = `${getDrawUser().name}さんの番です`;
}

let users;
let drawUserId;
let turnFlag = false;

//画面が表示されたときに実行される
window.onload = async function(){
    users = await loadUsers();

    onSnapshot(collection(db, "users"), (querySnapshot) => {
        users = getUsers(querySnapshot);
    });

    createCards();
    const id = localStorage.getItem('user_id');
    onSnapshot(doc(db, "status", "drawUserId"), (doc) => {
        drawUserId = doc.data().id;
        turnFlag = (id === drawUserId);
        showDrawUser();
    });

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

    onSnapshot(collection(db, "cards"), (querySnapshot) => {
        const shuffledCards = getShuffledCards(querySnapshot);
        if (shuffledCards.length === 0) return;

        showCards(shuffledCards);
        if(shuffledCards.every(card=>card.class === "cardfinish")){
            history.pushState(users, null, 'result.html');
            location.href = 'result.html';
        }
    });
}

//カードを一枚引いたかどうかの判定
let flgFirst = true; 

//最初に引いたカード
let firstcard;

//連続処理防止
let backTimer;

async function face(div) {
    const cardId = String(div.index);
    await updateDoc(doc(db, "cards", cardId), {
        class: "cardface"
    });
}

async function finish(div) {
    const cardId = String(div.index);
    await updateDoc(doc(db, "cards", cardId), {
        class: "cardfinish"
    });
}

async function back(div) {
    const cardId = String(div.index);
    await updateDoc(doc(db, "cards", cardId), {
        class: "cardback"
    });
}

async function addScore(user, score) {
    const newScore = user.score + score;
    await updateDoc(doc(db, "users", drawUserId), {
        score: newScore
    });
}

async function addBonusScore(user, bonusscore) {
    const newScore = user.bonusscore + bonusscore;
    await updateDoc(doc(db, "users", drawUserId), {
        bonusscore: newScore
    });
}

//裏返しの処理
async function turn(e){
    let div = e.target;
    const drawUser = getDrawUser();

    if(backTimer){
        return;
    };
    if(div.innerHTML === ""){
        await face(div);
    }else{
        return;
    }
    if(flgFirst){
        firstcard = div;
        flgFirst = false;
    }else{
        if(firstcard.number === div.number){
            await addScore(drawUser, 1);  
            backTimer = setTimeout(async function(){
                await finish(div);
                await finish(firstcard);
                //絶対一緒だから、+1*2
                if(drawUser.mbti === cards[firstcard.number].name){
                    await addBonusScore(drawUser, 2);
                }
                backTimer = NaN;
            }, 5000);
        }else if((firstcard.number%8) === (div.number%8)){
            await addScore(drawUser, 2);
            backTimer = setTimeout(async function(){
                await finish(div);
                await finish(firstcard);
                if(drawUser.mbti === cards[firstcard.number].name){
                    await addBonusScore(drawUser, 1);
                }
                if(drawUser.mbti === cards[div.number].name){
                    await addBonusScore(drawUser, 1);
                }
                backTimer = NaN;
            }, 5000);
        }else{
            backTimer = setTimeout(async function(){
                await back(div);
                await back(firstcard);
                firstcard = null;
                backTimer = NaN;
                await nextUser();
            }, 5000);
        };
        flgFirst = true;
    }
}

