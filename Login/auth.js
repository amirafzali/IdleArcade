$(document).ready(() => {
    console.log('s')
    $("#registerForm").hide()
    $("#resetForm").hide()



    $("#registerButton").click((e) => {
        e.preventDefault();
        $("#loginForm").hide()
        $("#registerForm").show()
    })

    $("#backToLogin").click((e) => {
        e.preventDefault();
        $("#registerForm").hide()
        $("#loginForm").show()
    })

    $("#resetPasswordButton").click((e) => {
        e.preventDefault();
        $("#loginForm").hide()
        $("#resetForm").show()
    })
})
