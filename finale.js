let users = window.history.state;

window.onload = async function(){
    
    users.sort((a,b) => {
        if((a.score + a.bonusscore) > (b.score + b.bonusscore)){
            return -1;
        }
        if((a.score + a.bonusscore) < (b.score + b.bonusscore)){
            return 1;
        }
    });

    document.getElementById('firstname').innerHTML = users[0].name;
    document.getElementById('firstpoint').innerHTML = `${users[0].score + users[0].bonusscore}pt`;
    document.getElementById('secondname').innerHTML = users[1].name;
    document.getElementById('secondpoint').innerHTML = `${users[1].score + users[1].bonusscore}pt`;
    document.getElementById('thirdname').innerHTML = users[2].name;
    document.getElementById('thirdpoint').innerHTML = `${users[2].score + users[2].bonusscore}pt`;
    document.getElementById('fourthname').innerHTML = users[3].name;
    document.getElementById('fourthpoint').innerHTML = `${users[3].score + users[3].bonusscore}pt`;

    const batch = writeBatch(db);
    batch.delete(doc(db, "users", "1"));
    batch.delete(doc(db, "users", "2"));
    batch.delete(doc(db, "users", "3"));
    batch.delete(doc(db, "users", "4"));
    await batch.commit();

}