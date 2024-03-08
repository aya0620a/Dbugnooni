//カードの作成
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

let currentUsers = 0;

let users = [{
    "name": "user1",
    "score": 0
},{
    "name": "user2",
    "score": 0
},{
    "name": "user3",
    "score": 0
},]

const gameboard = document.getElementById("gameboard");

//カードをシャッフルする
const createShuffledCards = () => {
    let shuffledCards = []; // This is the array that will hold the shuffled cards
    for(let i = 0; i < 32; i++){
        shuffledCards.push(cards[i]);
        shuffledCards.push(cards[i]);
    }
    shuffle(shuffledCards);

    return shuffledCards;
}

const onclick = (e) => {
    turn(e);
}

//裏返しのカードを表示
const displayCards = (shuffledCards) => {
    for(let i = 0; i < 32; i++){
        const card = document.createElement("div");
        card.onclick = onclick;
        card.className = "cardback";
        card.id = "card" + i;
        card.number = shuffledCards[i];
        document.getElementById("gameboard").appendChild(card);
    }
}

function shuffle(shuffledCards){
    let j = shuffledCards.length;
    let temp;

    for(let i = 0; i < 32; i++){
        j = Math.floor(Math.random() * (i + 1));
        temp = shuffledCards[j];
        shuffledCards[j] = shuffledCards[i];
        shuffledCards[i] = temp;
    }
}

//画面が表示されたときに実行される
window.onload = function(){
    const shuffledCards = createShuffledCards();

    displayCards(shuffledCards);
}


let flgFirst = true; 
let backTimer;

function turn(e){
    let div = e.target;

    if(backTimer){
        return;
    };
    if(div.innerHTML === ""){
        div.className = "card";
        // div.innerHTML = '<img src="ESFP.png">';
    }else{
        return;
    }
    if(flgFirst){
        firstcard = div;
        flgFirst = false;
    }else{
        if(firstcard.number % 2 == 0){
            users[currentUsers].score++;
            console.log(users[currentUsers].score);
            backTimer = setTimeout(function(){
                div.className = "cardfinish";
                firstcard.className = "cardfinish";
                backTimer = NaN;
                // if(unitCounts === 16){
                //     alert("Game Clear");
                // }
            }, 500);
        }else{
            backTimer = setTimeout(function(){
                div.className = "cardback";
                div.innerHTML = "";
                firstcard.className = "cardback";
                firstcard.innerHTML = "";
                firstcard = null;
                backTimer = NaN;
                currentUsers = (currentUsers + 1) % 3;
            }, 500);
        };
        flgFirst = true;
        console.log(currentUsers);
        console.log(users);
    }


}

