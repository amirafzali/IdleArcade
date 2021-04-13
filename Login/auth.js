$(document).ready(() => {
    console.log('s')
    $("#registerForm").hide()
    $("#resetForm").hide()

    let email = "";
    let password = "";
    let username = "";
    let confirm = "";

    resetFields()
    setupRedirects()
    inputChanges()
    formSubmits()

    setTimeout(() => {
        if(auth.currentUser) window.close();
    }, 2000)

    function resetFields() {
        let allFields = ['loginEmail', 'registerEmail', 'resetEmail', 'loginPassword', 'registerPassword', 'registerUsername', 'registerConfirm']
        allFields.forEach(id => {
            $("#"+id).val("")
        })

        $("#feedback").hide()
        email = ""
        password = ""
        username = ""
        confirm = ""
    }
    
    function setupRedirects() {
        const gotoLogin = () => {
            resetFields()
            $("#loginForm").show()
            $("#registerForm").hide()
            $("#resetForm").hide()
            
        }
    
        $("#registerButton").click((e) => {
            e.preventDefault();
            resetFields()
            $("#loginForm").hide()
            $("#registerForm").show()
        })
    
        $(".backToLogin").click((e) => {
            e.preventDefault();
            gotoLogin()
        })
    
        $("#resetPasswordButton").click((e) => {
            e.preventDefault();
            resetFields()
            $("#loginForm").hide()
            $("#resetForm").show()
        })
    }

    function inputChanges() {
        let emailForms = ['loginEmail', 'registerEmail', 'resetEmail']
        let passwordForms = ['loginPassword', 'registerPassword']
    
        emailForms.forEach(id => {
            $("#"+id).bind('change paste keyup', () => {
                email = $("#"+id).val() 
            })
        })
    
        passwordForms.forEach(id => {
            $("#"+id).bind('change paste keyup', () => {
                password = $("#"+id).val() 
            })
        })
    
        $("#registerUsername").bind('change paste keyup', () => {
            username = $("#registerUsername").val() 
        })
    
        $("#registerConfirm").bind('change paste keyup', () => {
            confirm = $("#registerConfirm").val() 
        })
    }

    function setError(message) {
        $("#feedback").removeClass("alert-success")
        $("#feedback").addClass("alert-danger")
        $("#feedback").html(message)
        $("#feedback").show()
    }

    function setSuccess(message) {
        $("#feedback").removeClass("alert-danger")
        $("#feedback").addClass("alert-success")
        $("#feedback").html(message)
        $("#feedback").show()
    }

    function formSubmits() {
        $("#loginButton").click(async (e) => {
            let res = await login(email, password)
            if(res.error) {
                setError(res.error)
            } else {
                setSuccess("Successfully logged in!")
                window.close();
            }            
        })

        $("#registerFormButton").click(async (e) => {
            let res = await registerUser(email,username,password,confirm)
            if(res.error) {
                setError(res.error)
            } else {
                setSuccess('Account successfully created!')
            }   
        })

        $("#resetButton").click(async (e) => {
            let res = await resetPassword(email)
            if(res.error) {
                setError(res.error)
            } else {
                setSuccess("Reset email sent. Please check your email!")
            }   
        })
    }
})
