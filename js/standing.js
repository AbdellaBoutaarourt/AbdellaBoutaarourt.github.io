"use strict"

import {
  standingFetch
} from './apis.js'

let teams = []
let standing = [];
let favorites = [];
let leagueTitle;
let flag;

let user;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const leagueID = urlParams.get('league')


window.onload = async function getData() {
  //check sessionStorage
  user = JSON.parse(sessionStorage.getItem('user'));

  document.getElementById('message').innerText = `Welcome ${user.username} !`

  //fetch and render data
  standingFetch().then(data => {
    console.log(data)
    teams = data.response[0].league.standings[0]
    leagueTitle = data.response[0].league.name
    flag = data.response[0].league.flag
    teams.forEach(s => {
      standing.push(s)
    });

  })

  setTimeout(buildList, 500)
  setTimeout(favorite, 500)
  document.getElementById("centerButton").addEventListener("click", function () {
    var centeredDiv = document.getElementById("already");
    centeredDiv.style.display = "none";
  });

}


function buildList() {
  let htmlTitle = `
    <div class="comp-title">
    <img src= ${flag} class="comp-flag">
    <h1 class="comp-name">${leagueTitle}</h1>
     </div>
    `
  let htmlNav = `<div class="nav-links">
  <ul>
    <li class="active"><a href="home.html?league=${leagueID}">Home</a></li>
      <li><a href="topScorers.html?league=${leagueID}">Players Stats</a></li>
    <li class="login">
      <a href="profile.html?league=${leagueID}"><img src="./../pictures/user.png">Profile</a>
      <a href="signIn.html" class="signout">Sign out</a>
    </li>
  </ul>
</div> `
  document.querySelector('.nav-links').innerHTML = htmlNav;
  document.querySelector('.comp-title').innerHTML = htmlTitle;

  let html = ''
  for (let s of standing) {
    let teamLogo = s.team.logo
    let teamName = s.team.name
    let teamID = s.team.id
    html += `
    <tbody class="comp-table-body">
    <button type="button" class= "button">+</button>
    <tr class="team">
      <td class="rank">${s.rank}</td>
        <td class="team">
            <img src="${teamLogo}">
            <span class="name-full"id=${teamID}>${teamName} </span>
        </td>
        <td class="played">${s.all.played}</td>
        <td class="won">${s.all.win}</td>
        <td class="drawn">${s.all.draw}</td>
        <td class="lost">${s.all.lose}</td>
        <td class="for">${s.all.goals.for}</td>
        <td class="against">${s.all.goals.against}</td>
        <td class="difference">${s.goalsDiff}</td>
        <td class="form">

        <li class="${s.form[0]}"><a>${s.form[0]}</a></li>
        <li class="${s.form[1]}"><a>${s.form[1]}</a></li>
        <li class="${s.form[2]}"><a>${s.form[2]}</a></li>
        <li class="${s.form[3]}"><a>${s.form[3]}</a></li>
        <li class="${s.form[4]}"><a>${s.form[4]}</a></li>

        </td>
        <td class="points">${s.points} </td>
        </tr>
      `
  }
  document.getElementById('comp-table-body').innerHTML = html;
}




function favorite() {
  infoTeam()
  let userID = user.uuid
  fetch(`https://web-2-host-football.onrender.com/teams/${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => {
      favorites = data;
      let htmlString = '';
      favorites.forEach(favorite => {
        let teamID = favorite.teamID;
        let teamName = favorite.teamName;
        let teamLogo = favorite.teamLogo;

        htmlString += `
        <div class="teams" id="team-${teamID}">
        <ul>
            <li><img src="${teamLogo}"> <a href="./teamInfo.html?league=${leagueID}&id=${teamID}">${teamName}</a></li>
            <i class="fa fa-trash deleteTeam" aria-hidden="true" data-teamid="${teamID}"></i>
            </ul>
        </div>`;
      });

      document.getElementById('favorite').innerHTML += htmlString;
    })
    .catch(error => console.error('Error:', error));

  const buttons = document.getElementsByClassName("button");
  let buttonsArray = Array.from(buttons);
  buttonsArray.forEach((button, i) => {

    button.addEventListener("click", function (e) {
      let s = standing[i];
      let teamID = s.team.id;
      let teamName = s.team.name;
      let teamLogo = s.team.logo;
      let userID = user.uuid
      let leagueID = urlParams.get('league');

      // Check if the team is already a favorite
      const isFavorite = favorites.some(favorite => favorite.teamID === teamID);

      if (!isFavorite) {
        fetch('https://web-2-host-football.onrender.com/teams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID: userID,
            teamID: teamID,
            teamName: teamName,
            teamLogo: teamLogo,
            leagueID: leagueID
          })
        }).then(response => response.json())
          .then(responseData => {
            favorites.push(responseData);
            let htmlString = ""
            htmlString += `

      <div class="teams" id="team-${teamID}">
        <ul>
          <li><img src="${teamLogo}">  <a href="./teamInfo.html?id=${teamID}">${teamName}</a> </li>
          <i class="fa fa-trash deleteTeam" aria-hidden="true" data-teamid="${teamID}"></i>
        </ul>
      </div>`

            document.getElementById('favorite').innerHTML += htmlString;
          })

      } else {
        document.getElementById('already').style.display = "flex";
      };

    })
  })
  deleteTeam(userID)

}

function infoTeam() {
  //https://www.w3schools.com/js/js_window_location.asp
  const teams = document.getElementsByClassName("name-full");
  let teamsArray = [].slice.call(teams);
  teamsArray.forEach(team => {
    team.addEventListener("click", function () {
      const teamID = team.id;
      window.location.href = `./teamInfo.html?league=${leagueID}&id=${teamID}`;
    })
  })
}

function deleteTeam(userID) {
  document.getElementById('favorite').addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteTeam')) {

      const teamIDToDelete = e.target.dataset.teamid;

      fetch(`https://web-2-host-football.onrender.com/teams/${userID}/${teamIDToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            const teamElement = document.getElementById(`team-${teamIDToDelete}`);
            if (teamElement) {
              teamElement.remove();
            }
            return response.json();
          } else {
            // Si la suppression échoue, traitez l'erreur
            console.error('Failed to delete team');
          }
        })
        .then(data => {
          console.log(data.message);
        })
        .catch(error => {
          // Si une erreur survient lors de la requête, traitez-la
          console.error('Error:', error);
          // Par exemple, affichez un message d'erreur à l'utilisateur
        });

    }
  });

}