
function start(){
    alert("Hello World!");
    localStorage.setItem('key','mbti')
    message = localStorage.getItem('key')
    alert(message)
}

const nextbutoon=document.getElementByIde('next');
nextbutoon.addEventListener('click',function(){
    location.href="index3.html"
})
