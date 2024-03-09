let users = window.history.state;

window.onload = function(){
    let tmpuser = '';
    users.forEach((users)=>{
        
        for(let i = 1; i < users.length; i++){
            if((users[i].score + users[i].bonusscore) > (users[i-1].score + users[i-1].bonusscore)){
                tmpuser = users[i-1];
                users[i-1] = users[i];
                users[i] = tmpuser; 
            }
        }
    });

    // console.log(users);
    document.getElementById('firstname').innerHTML = users[0].name;
    document.getElementById('firstpoint').innerHTML = `${users[0].score + users[0].bonusscore}pt`;
    document.getElementById('secondname').innerHTML = users[1].name;
    document.getElementById('secondpoint').innerHTML = `${users[1].score + users[1].bonusscore}pt`;
    document.getElementById('thirdname').innerHTML = users[2].name;
    document.getElementById('thirdpoint').innerHTML = `${users[2].score + users[2].bonusscore}pt`;
    document.getElementById('fourthname').innerHTML = users[3].name;
    document.getElementById('fourthpoint').innerHTML = `${users[3].score + users[3].bonusscore}pt`;

}