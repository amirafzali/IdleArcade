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

    const arcadeMachineClick = () => {
        addTickets(getMultiplier('click'));
        updateValues()
    }

    const updateValues = () => {
        console.log('s')
        document.getElementById("mainScreenScoreInt").innerHTML = getState().score
        document.getElementById("mainScreenBalanceInt").innerHTML = getState().balance
    }

    updateValues()

    $("#machine").on('click', e => {
        arcadeMachineClick();
    });

    $("#reset").on('click', e => {
        resetState();
        updateValues()
    });

    $("#openReportBug").on('click', e => {
        window.open("../Bug/BugReport.html");
    });

    $("#openFaq").on('click', e => {
        window.open("../FAQ/FAQ.html");
    });

    $("#openLeaderboard").on('click', e => {
        window.open("../Leaderboards/leaderboards.html");
    });

    $("#logout").on('click', e => {
        //resetState();
    });

    function playMinigame() {

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