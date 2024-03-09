const nextbutoon=document.getElementById('next');
nextbutoon.addEventListener('click',function(){
    let users = [];
    const trlist = document.querySelectorAll('tbody tr');
    let validflag = true;
    trlist.forEach((tr)=>{
        const name = tr.querySelector('input.name').value;
        const mbti = tr.querySelector('input.mbti').value;
        const user = {
            name,
            mbti,
            score: 0
        };

        if(name === '' || mbti === ''){
            validflag = false;
        }
        users.push(user);
    })
    if(!validflag){
        alert('名前とMBTIを入力してください');
        return;
    }
    console.log(users);
    window.history.pushState(users, null, 'game.html')
    location.href = 'game.html';
});
