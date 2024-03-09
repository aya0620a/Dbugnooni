function start(){
    alert("Hello World!")
    localStorage.setItem('key','mbti')
    message = localStorage.getItem('key')
    alert(message)
}

// window.onload = function(){
//     const heading = document.querySelector('win');

//     const keyframes={
//         opacity:[0,1],
//         translate:['0,50px',0],
//     };
//     const options={
//         duration:2000,
//         easing:'ease',
//     };
//     heading.animate(keyframes,options);
// }
