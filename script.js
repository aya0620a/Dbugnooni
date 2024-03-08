function start(){
    alert("Hello World!");
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const gameboard = document.getElementById("gameboard");

window.onload = function(){
    let shuffledCards = []; // This is the array that will hold the shuffled cards
    for(let i = 0; i < 32; i++){
        shuffledCards.push(cards[i]);
        shuffledCards.push(cards[i]);
    }
    shuffle(shuffledCards);

    for(let i = 0; i < 32; i++){
        const card = document.createElement("div");
        card.className = "cardback";
        card.id = "card" + i;
        card.number = shuffledCards[i];
        card.src = "cardback.png";
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

    alert("Hello World!")
    localStorage.setItem('key','mbti')
    message = localStorage.getItem('key')
    alert(message)
}

const nextbutoon=document.getElementById('next');
nextbutoon.addEventListener('click',function(){
    location.href="index3.html"
})




