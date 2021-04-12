$(document).ready(() => {
    $("#show").html(`Score: ${getScore()}`)
    $("#click").click(() => {
        addScore(1)
        $("#show").html(`Score: ${getScore()}`)
        console.log(getScore())
    })
})