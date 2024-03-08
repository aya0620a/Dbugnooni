
function start(){
    alert("Hello World!");
    localStorage.setItem('key','mbti')
    message = localStorage.getItem('key')
    alert(message)
}