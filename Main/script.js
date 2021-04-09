var score = 0; 
var balance = 0;
var leaderBoard = false;
var faq = false;
var logout = false;
var reportBug = false;
var minigame = false;

function start() {
    score = 0; //load from database
    balance = 0; //load from database

    leaderBoard = false;
    faq = false;
    logout = false;
    reportBug = false;
    minigame = false;
    
    //var addScore = gets click data from arcade machine
    //addScore(addScore, score);
}

function addScore(addScore, score) {
    score = addScore + score;
  }

function playMinigame() {
    //call minigame controller 
    //var addScore = gets click data from minigame controller
    //addScore(addScore, score);
}

function logout() {

}

function openReportBug() {

}

function openFaq() {

}

function openLeaderboard() {

}