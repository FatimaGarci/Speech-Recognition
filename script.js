const msgEl = document.getElementById('msg');

const radomNum = getRandomNumber();
//creat a random number for the game
function getRandomNumber(){
    return Math.floor(Math.random()* 100) +1;
}
console.log('Number:', radomNum);

//Initialize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//initalize a new instante of the window.SpeechRecognition  object
let recognition = new window.SpeechRecognition();

//start recognition and game 
recognition.start();

recognition.addEventListener('result', onSpeak);
// recognition.addEventListener('result', onSpeak());


function onSpeak (e){
    const msg = e.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}

function writeMessage(msg){
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span class="box">${msg}<span> `;
}

function checkNumber(msg){
    const num = +msg;
    //Check if a valid number
    if (Number.isNaN(num)){
        msgEl.innerHTML += `<div> Tha is not a valid number </div>`;
        return;
    }
    //Check if number is in range
    if (num > 100 || num < 1){
        msgEl.innerHTML += `<div>Your number must between 1 and 100</div>`;
        return;
    }
    if(num === radomNum){
        document.body.innerHTML = `
        <h2> Congrats!! You guess the nummber! <br><br>
        It was ${num} </h2>
        <button class="play-again" id="play-again">Play again</button>`;
    }else if (num > radomNum){
        msgEl.innerHTML += `<div>GO LOWER</div>`;
    } else {
        msgEl.innerHTML += `<div>GO HIGHER</div>`;
    }
}

//Allow user to continue to guess - End Speech Recongnition
recognition.addEventListener('end', ()=> recognition.start());

//Make the play button work
document.body.addEventListener('click', e =>{
    if (e,target.id == 'play-again'){
        window.location.reload();
    }
});