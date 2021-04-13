$(document).ready(() => {

    let buffer = [0, 0, 0, 0, 0]
    let count = 0

    $(function(){
        $("#ticketShop").load("../Shop/shop.html"); 
    });    

    const arcadeMachineClick = () => {
        addTickets(getMultiplier('click'));
        count++
        updateValues()
    }

    const updateValues = () => {
        let avg = (buffer.reduce((tot,e) => tot+e)/buffer.length)
        console.log(avg)
        document.getElementById("mainScreenScoreInt").innerHTML = getState().score.toFixed(0)
        document.getElementById("mainScreenBalanceInt").innerHTML = getState().balance.toFixed(0)
        document.getElementById("mainScreenTPSInt").innerHTML = (getTPS()+avg).toFixed(1) + " Tickets Per Second"
    }

    const updateTPS = () => {
        buffer.shift()
        buffer.push(count)
        count = 0
    }

    $("#authButton").hide()
    $("#popup").hide()

    setMinigamePath("")
    
    updateValues()
    setInterval(toggleAuth, 2000)

    setInterval(() => {
        addTickets(getTPS())
        updateTPS()
        updateValues()
    }, 1000)

    setInterval(async () => {
        if(auth.currentUser) {
            let email = auth.currentUser.email;
            let doc = await db.collection('users').doc(email).get()
            if(doc.exists && getScore() > doc.data().score) {
                await db.collection('users').doc(email).update({'score': Number(getScore().toFixed(0))})
            }
        }
    }, 30000)


    setInterval(() => {
        if(!getMinigamePath()) {
            let paths = ["../whackAMole/whackAMole.html", "../WaterClick/water.html", 
                        "../brickBreaker/index.html", "../FortuneWheel/wheel.html", "../Runner/index.html"]
            let path = paths[Math.floor(Math.random()*paths.length)]
            setMinigamePath(path)
            $("#popup").show()
        }
    }, 60*1000)


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

    $("#popupYes").click(() => {
        if(getMinigamePath()) {
            $("#popup").hide()
            window.open(getMinigamePath())
            setMinigamePath("")
        }
    })
    $("#popupNo").click(() => {
        $("#popup").hide()
        setMinigamePath("")
    })

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