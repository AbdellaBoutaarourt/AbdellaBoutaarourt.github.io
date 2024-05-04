import {
    fetchSign
} from './apis.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const leagueID = urlParams.get('league')


window.onload = function profile() {
    console.log(leagueID)
    let htmlNav = `<div class="nav-links">
    <ul>
      <li><a href="home.html?league=${leagueID}">Home</a></li>
        <li><a href="topScorers.html?league=${leagueID}">Players Stats</a></li>
      <li class="login">
        <a href="profile.html"><img src="./../pictures/user.png">Profile</a>
        <a href="signIn.html" class="signout">Sign out</a>
      </li>
    </ul>
  </div> `
    document.querySelector('.nav-links').innerHTML = htmlNav;
    // load data of the user
    let user = JSON.parse(sessionStorage.getItem('user'));


    let email = user.email
    let username = user.username
    document.getElementById('title').innerText = `profile of ${username}`
    document.getElementById('usernamestyle').innerText = `${username}`

    document.getElementById('emailstyle').innerText = `${email}`


    update()


    // Deletes the user

    document.getElementById("deleteaccbtn").addEventListener("click", function () {
        document.getElementById('deleteaccsure').style.display = 'block'

    })
    document.getElementById("deleteaccsure").addEventListener("click", function () {


        fetchSign("https://web-2-host-football.onrender.com/users/verifyID", "DELETE", user).then(data => {
            sessionStorage.removeItem("user")

            window.location.href = "./index.html"


        })
    })


}

function update(username) {
    // Show the email update form

    document.getElementById("updateacc").addEventListener("click", function () {
        document.getElementById("emailInput").style.display = "block";
    })

    // update email
    document.getElementById("emailChangeForm").addEventListener('submit', function (e) {
        e.preventDefault()
        let user = sessionStorage.getItem('user');
        let usernameValue = username
        let emailValue = e.target.email.value

        let update = {
            "email": emailValue,
        }


        fetchSign("https://web-2-host-football.onrender.com/users/verifyID", "PUT", update).then(data => {

            console.log(data)
            document.getElementById('emailstyle').innerText = `${update.email}`

        })

    })
}