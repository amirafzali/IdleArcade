$(document).ready(() => {
    let difficulty = "";
    let clicks = 0;
    let level = 0;
    let time = 5;
    let started = false;

    $("#waterGame").hide()

    let lookup = {
        Easy: [5,20,50,80,100],
        Medium: [15,40,60,100,130],
        Hard: [30,50,100,130,180]
    }

    let prize = {
        Easy: [5,10,20,40,100],
        Medium: [10,20,50,110,200],
        Hard: [20,40,120,250,500]
    }

    const endGame = () => {
        $("#gameMessages").hide()
        $("#endMessage").show()
        console.log(difficulty, level)
        if(level == 0){
            $("#winMessage").html(`You won 0 tickets. Did you even play?`)
        } else{
            $("#winMessage").html(`Congrats! You won ${prize[difficulty][level-1]} tickets.`)
            addTickets(prize[difficulty][level-1])
        }
        setTimeout(()=> window.close(), 4000)
    }
    const runGame = () => {
        $("#startSequence").hide()
        $("#gameMessages").show()
        started = true;
        time = 20

        let x = setInterval(() => {
            time-=1;
            if(time == 0) {
                clearInterval(x)
                endGame()
            }
            $("#timeLeftMessage").html(`Time left: ${time} seconds`)

        }, 1000)
    }

    const startGame = () => {
        $("#diffSelection").hide()
        $("#waterGame").show()

        let x = setInterval(() => {
            time-=1;
            if(time == 0) {
                clearInterval(x)
                runGame()
            } 
            $("#initialCounter").html(`Game starts in ${time}...`)

        }, 1000)
    }
    

    let diffs = ['easyButton', 'mediumButton', 'hardButton']
    diffs.forEach(diff => {
        $("#"+diff).click(() => {
            difficulty = $("#"+diff).html()
            console.log(difficulty)
            startGame()
        })
    })

    $("#waterButton").click(() => {
        if(started) {
            clicks+=1
            let vals = lookup[difficulty]
            if(level < vals.length && clicks >= vals[level]) {
                $("#s"+level).addClass('blue')
                level+=1
            }
            $("#statsMessage").html(`Clicks: ${clicks} | Level: ${level}`)
        }
    })
})