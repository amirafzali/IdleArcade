var score = 0;
var gameOver = false;
const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
const scoreNode = document.getElementById('scoreInt');
var mole;

function startGame() {
    console.log("test");
    score = 0;
    gameOver = false;

    var startBtn = document.querySelector('.startBtn');
    startBtn.classList.add('hide');
    popOut();
    setTimeout(function() {
        gameOver = true;
        //send the score to the main game
        for (var i=0; i < holes.length; i++) {
            holes[i].classList.add('hide');
        }
        document.getElementById('gameover').classList.remove('hide');
    }, 
    //the timeout of the game in milliseconds
    10000);
}

function popOut() {
    const time = Math.random() * (1000-500) + 500;
    mole = moles[Math.floor((Math.random()*9))];
    mole.classList.add('pop');
    setTimeout(() => {
      mole.classList.remove('pop');
      if (!gameOver) {
          popOut();
      }
    }, time);
  }

function addScore() {
    mole.classList.remove('pop');
    score += 1;
    scoreNode.innerHTML = score;
}

function returnToMain(){
    console.log("Return");
}

