import {
    fetchSign
} from './apis.js'

document.getElementById('signUpForm').addEventListener('submit', event => {
    event.preventDefault()

    let user = {}
    user.username = document.getElementById("usernameRegister").value
    user.email = document.getElementById("emailRegister").value
    user.password = document.getElementById("passwordRegister").value
    user.password2 = document.getElementById("passwordRegister2").value

    //Check Password
    if(user.password == user.password2){
        //register the user
        fetchSign("https://web-2-host-football.onrender.com/users/register", "POST", user).then(result => {
            sessionStorage.setItem('user',JSON.stringify(result.data))

        if (result.data) {
            window.location.href = "./home.html";
            alert(result.message)

        }else {
            document.getElementById('error').innerHTML = result.message

        };

    })
    }else{
        document.getElementById('errorPassword').style.display = 'block'
    }


})