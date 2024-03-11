window.onload = async function(){
    const users = history.state;
    users.sort((a, b) => b.score - a.score);

    document.getElementById('firstname').innerHTML = users[0].name;
    document.getElementById('firstpoint').innerHTML = `${users[0].score}pt ++${users[0].bonusscore}pt`;
    document.getElementById('secondname').innerHTML = users[1].name;
    document.getElementById('secondpoint').innerHTML = `${users[1].score}pt ++${users[1].bonusscore}pt`;
    document.getElementById('thirdname').innerHTML = users[2].name;
    document.getElementById('thirdpoint').innerHTML = `${users[2].score}pt ++${users[2].bonusscore}pt`;
    document.getElementById('fourthname').innerHTML = users[3].name;
    document.getElementById('fourthpoint').innerHTML = `${users[3].score}pt ++${users[3].bonusscore}pt`;

    setTimeout(function(){
    history.pushState(users, null, 'finale.html');
    location.href = 'finale.html';
    }, 5000);
}
