"use strict"
import {
    fetchSign
} from './apis.js'


document.getElementById('signInForm').addEventListener('submit', event => {
    event.preventDefault()

    let user = {}
    user.email = document.getElementById("emailLogin").value
    user.password = document.getElementById("passwordLogin").value


    //check for login
    fetchSign("https://web-2-host-football.onrender.com/users/login", "POST", user).then(result => {
        sessionStorage.setItem('user',JSON.stringify(result.data))
        console.log(result.message)

        if (result.data) {
            window.location.href = "./home.html";

        }else {
            document.getElementById('error').innerHTML = result.message
            
        }
        
    })
})