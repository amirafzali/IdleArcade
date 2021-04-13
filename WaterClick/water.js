$(document).ready(() => {
    let difficulty = ""

    $("#glass").hide()

    let diffs = ['easyButton', 'mediumButton', 'hardButton']
    diffs.forEach(diff => {
        $("#"+diff).click(() => {
            difficulty = $("#"+diff).html()
            console.log(difficulty)

            $("#difficultyButtons").hide()
            $("#initialTitle").hide()

            $("#glass").show()
        })
    })
})