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

let users = window.history.state;

const usersuu = users.length;

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

    return shuffledCards;
}

//カードをクリックしたときの処理
const onclick = (e) => {
    turn(e);
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

let shuffledCards;

//画面が表示されたときに実行される
window.onload = function(){
    let username = document.getElementById("nextplayer");
    username.innerHTML = `${users[currentUsers].name}さんの番です`;
    shuffledCards = createShuffledCards();

    displayCards(shuffledCards);
}

//カードを一枚引いたかどうかの判定
let flgFirst = true; 

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
            console.log(users[currentUsers].score);
            backTimer = setTimeout(function(){
                div.className = "cardfinish";
                shuffledCards[div.index].class = "cardfinish";
                firstcard.className = "cardfinish";
                shuffledCards[firstcard.index].class = "cardfinish";
                div.innerHTML = "";
                firstcard.innerHTML = "";
                backTimer = NaN;
                // if(unitCounts === 16){
                //     alert("Game Clear");
                // }
            }, 500);
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
                backTimer = NaN;
                // if(unitCounts === 16){
                //     alert("Game Clear");
                // }
            }, 500);
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
                currentUsers = (currentUsers + 1) % usersuu;
                let username = document.getElementById("nextplayer");
                username.innerHTML = `${users[currentUsers].name}さんの番です`;
            }, 500);
        };
        flgFirst = true;
        console.log("currentUsers: " + currentUsers);
        console.log(users);
    }
}

