$(document).ready(() => {
    var score; 
    var balance;
    var leaderBoard = false;
    var faq = false;
    var logout = false;
    var reportBug = false;
    var minigame = false;

    $(function(){
        $("#ticketShop").load("../Shop/shop.html"); 
    });

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

    function addScore() {
        score += 1;
        document.getElementById("mainScreenScoreInt").innerHTML = `<span id="mainScreenScoreInt">${score}</span>`;
    }

    $("#machine").on('click', e => {
        arcadeMachineClick();
    });

    $("#reset").on('click', e => {
        resetState();
    });

    $("#openReportBug").on('click', e => {
        window.open("../Bug/BugReport.html");
    });

    $("#openFaq").on('click', e => {
        resetState();
    });

    $("#openLeaderboard").on('click', e => {
        resetState();
    });

    $("#logout").on('click', e => {
        resetState();
    });

    window.open("/Main/main.html");


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
});