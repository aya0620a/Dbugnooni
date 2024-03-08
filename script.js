function start(){
    alert("Hello World!")
    localStorage.setItem('key','mbti')
    message = localStorage.getItem('key')
    alert(message)
}

const nextbutoon=document.getElementByIde('next');
nextbutoon.addEventListener('click',function(){
    location.href="index3.html"
})


//スタート画面でボタンを押したときの処理
const button = document.getElementById('button');
button.addEventListener('click',function(){
    location.href = "index2.html";
})

