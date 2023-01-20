var patterns = {
    telephone: /^[\d]{10}$/,
    username: /^[a-z\d]{5,12}$/,
    password: /^[\w]{8,20}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}

const input = document.querySelectorAll('input');

var anyFieldInValid = true

function validate(field, regex){
    if(regex.test(field.value)){
        field.className = 'valid';

        anyFieldInValid = false
    }else{
        field.className = 'invalid';

        anyFieldInValid = true
    }
}

input.forEach((input)=>{
    input.addEventListener('keyup', (e)=>{
        validate(e.target, patterns[e.target.name]);
    })
})

var password_show = document.querySelector(".show_hide_pass")

var password_field = document.querySelector("#password")

password_show.addEventListener("click", (e)=>{
    if(password_show.innerHTML == "Show Password"){
        password_show.innerHTML = "Hide Password"

        password_field.type = "text"
    }else{
        password_show.innerHTML = "Show Password"

        password_field.type = "password"
    }
})

let signup_button = document.querySelector("#signup_button")

signup_button.addEventListener("click", (e)=>{
    e.preventDefault()

    input.forEach((input)=>{
        validate(input, patterns[input.name]);
    })

    if(anyFieldInValid == false){
        if(localStorage.getItem("accounts") == null){
            localStorage.setItem(
                "accounts",
                JSON.stringify([{
                    "username": input[0].value,
                    "email": input[1].value,
                    "telephone": input[2].value,
                    "password": input[3].value,
                }])
            )

            var loading = document.querySelector(".loading")

            signup_button.classList.add("show_loader")
            loading.classList.remove("show_loader")

            if(localStorage.getItem("loggedIN") == null){
                localStorage.setItem(
                    "loggedIN",
                    JSON.stringify([{
                        "username": input[0].value,
                    }])
                )

                window.location = "loggedIn.html"
            }
        }else{
            var accounts = JSON.parse(localStorage.getItem("accounts"));

            if(window.location.href.split("/")[window.location.href.split("/").length - 1] == "login.html"){
                if(accounts.some(checkUserEmail) == false){
                    var account_error = document.querySelector(".account_error_text")

                    account_error.classList.remove("account_error")
                }else{
                    var account_error = document.querySelector(".account_error_text")

                    account_error.classList.add("account_error")

                    var email = document.querySelectorAll('input')[0].value

                    var password = document.querySelectorAll('input')[1].value.toLowerCase().replace(/\s/g, '')

                    accounts.forEach((account)=>{
                        if(account["email"].toLowerCase().replace(/\s/g, '') == email.toLowerCase().replace(/\s/g, '')){
                            var password_error = document.querySelector(".password_error_text")

                            if(account["password"] == password){
                                password_error.classList.add("password_error")

                                var loading = document.querySelector(".loading")

                                signup_button.classList.add("show_loader")

                                loading.classList.remove("show_loader")

                                if(localStorage.getItem("loggedIN") == null){
                                    localStorage.setItem(
                                        "loggedIN",
                                        JSON.stringify([{
                                            "username": account["username"],
                                        }])
                                    )

                                    window.location = "loggedIn.html"
                                }
                            }else{
                                password_error.classList.remove("password_error")
                            }
                        }
                    })
                }
            }else{
                if(accounts.some(checkUserName) == false){
                    if(accounts.some(checkEmail) == false){
                        var email_error = document.querySelector(".email_error_text")

                        email_error.classList.add("email_error")

                        accounts.push(
                            {
                                "username": input[0].value,
                                "email": input[1].value,
                                "telephone": input[2].value,
                                "password": input[3].value,
                            }
                        )

                        localStorage.setItem(
                            "accounts",
                            JSON.stringify(accounts)
                        )

                        var loading = document.querySelector(".loading")

                        signup_button.classList.add("show_loader")
                        loading.classList.remove("show_loader")

                        if(localStorage.getItem("loggedIN") == null){
                            localStorage.setItem(
                                "loggedIN",
                                JSON.stringify([{
                                    "username": input[0].value,
                                }])
                            )

                            window.location = "loggedIn.html"
                        }
                    }else{
                        var email_error = document.querySelector(".email_error_text")

                        email_error.classList.remove("email_error")

                        var account_error = document.querySelector(".account_error_text")

                        account_error.classList.add("account_error")
                    }
                }else{
                    var account_error = document.querySelector(".account_error_text")

                    account_error.classList.remove("account_error")
                }

            }

        }
    }
})

function checkUserEmail(UserEmail){
    var email = document.querySelectorAll('input')[0].value

    return email.toLowerCase().replace(/\s/g, '') == UserEmail["email"].toLowerCase().replace(/\s/g, '')
}

function checkUserName(UserEmail){
    var name = document.querySelectorAll('input')[0].value

    return name.toLowerCase().replace(/\s/g, '') == UserEmail["username"].toLowerCase().replace(/\s/g, '')
}

function checkEmail(UserEmail){
    var email = document.querySelectorAll('input')[1].value

    return email.toLowerCase().replace(/\s/g, '') == UserEmail["email"].toLowerCase().replace(/\s/g, '')
}
