$(document).ready(() => {
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

    $("#authButton").hide()

    setInterval(toggleAuth, 2000)

    

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

    $("#authButton").on('click', e => {
        if(auth.currentUser) {
            auth.signOut().then(() => {
                $("#authButton").html("Login")
            }).catch(e => {
                location.reload()
            })
        } else {
            window.open("../Login/auth.html");
        }
    });

    function toggleAuth() {
        console.log('s')
        $("#authButton").show()
        if(auth.currentUser) {
            $("#authButton").html("Logout")
        } else {
            $("#authButton").html("Login")
        }
    }
});