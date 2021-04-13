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
        document.getElementById("mainScreenScoreInt").innerHTML = getState().score.toFixed(0)
        document.getElementById("mainScreenBalanceInt").innerHTML = getState().balance.toFixed(0)
    }

    $("#authButton").hide()
    
    updateValues()
    setInterval(toggleAuth, 2000)

    setInterval(() => {
        addTickets(getTPS())
        updateValues()
    }, 1000)
    

    $("#machine").on('click', e => {
        arcadeMachineClick();
    });

    $("#reset").on('click', e => {
        resetState();
        updateValues()
        location.reload()
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