function start(){
    alert("Hello World!");
}
//スタート画面でボタンを押したときの処理
const button = document.getElementById('button');
button.addEventListener('click',function(){
    location.href = "index2.html";
})