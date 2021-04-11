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


    function resetFields() {
        let allFields = ['loginEmail', 'registerEmail', 'resetEmail', 'loginPassword', 'registerPassword', 'registerUsername', 'registerConfirm']
        allFields.forEach(id => {
            $("#"+id).val("")
        })
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

    function formSubmits() {
        let x = ['loginButton', 'registerFormButton', 'resetButton']
        x.forEach((tag) => {
            $("#"+tag).click(() => {
                console.log(email)
                console.log(password)
                console.log(confirm)
                console.log(username)
            })
        });
    }
})
