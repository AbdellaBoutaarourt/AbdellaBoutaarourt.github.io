"use strict"

import{
  standingFetch
} from './apis.js'

let teams = []
let standing = [];
let user;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const leagueID = urlParams.get('league')


window.onload = function getData() {
  //check sessionStorage
 user = JSON.parse(sessionStorage.getItem('user'));

document.getElementById('message').innerText = `Welcome ${user.username} !`

  //fetch and render data
  standingFetch().then(data => {
    console.log(data)
      teams = data.response[0].league.standings[0]

      teams.forEach(s => {
        standing.push(s)
      });

    })
    let leagueTitle = data.response[0].league.name
    let flag = data.response[0].league.flag
    let htmlString = ""
    htmlString == `
    <div class="comp-title">
    <img src= ${leagueTitle} class="comp-flag">
    <h1 class="comp-name">${leagueTitle}</h1>
     </div>
    `

    document.getElementsByClassName('comp-title').innerHTML== htmlString

  setTimeout(buildList, 300)
  setTimeout(favorite, 300)

}


function buildList() {


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

          <li><a>${s.form[0]}</a></li>
          <li><a>${s.form[1]}</a></li>
          <li><a>${s.form[2]}</a></a></li>
          <li><a>${s.form[3]}</a></li>
          <li><a>${s.form[4]}</a></li>

        </td>
        <td class="points">${s.points} </td>
        </tr>
      `
  }
  document.getElementById('comp-table-body').innerHTML = html;
  infoTeam()

}


function infoTeam() {
//https://www.w3schools.com/js/js_window_location.asp
  const teams = document.getElementsByClassName("name-full");
  let teamsArray = [].slice.call(teams);
  teamsArray.forEach(team => {
    team.addEventListener("click", function (e) {
      setTimeout(500)
      e.preventDefault();

      const teamID = team.id;
      window.location.href = `./teamInfo.html?league=${leagueID}&id=${teamID}`;
    })
  })
}


function favorite() {
  const buttons = document.getElementsByClassName("button");
  let buttonsArray = Array.from(buttons);

  buttonsArray.forEach((button, i) => {
    button.addEventListener("click", function (e) {
      let s = standing[i];
      let teamID = s.team.id;
      let teamName = s.team.name;
      let teamLogo = s.team.logo;
      let userID = user.uuid
      if (favorite.teamID != teamID) {
  fetch('https://web-2-host-football.onrender.com/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          userID: userID,
          teamID : teamID,
          teamName : teamName,
          teamLogo : teamLogo
        })
      }).then(data => {
        return data.json()
      })
      let htmlString = ""
      htmlString += `

      <div class="teams">
        <ul>
          <li><img src="${teamLogo}">  <a href="./teamInfo.html?id=${teamID}">${teamName}</a> </li>
        </ul>
      </div>`

    document.getElementById('favorite').innerHTML += htmlString;
      };

    })
  })
  let userID = user.uuid

  fetch(`https://web-2-host-football.onrender.com/teams/${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => {
      let favorites = data;
      let htmlString = '';
      favorites.forEach(favorite => {
        let teamID = favorite.teamID;
        let teamName = favorite.teamName;
        let teamLogo = favorite.teamLogo;

        htmlString += `
        <div class="teams">
          <ul>
            <li><img src="${teamLogo}"> <a href="./teamInfo.html?id=${teamID}">${teamName}</a></li>
          </ul>
        </div>`;
      });

      document.getElementById('favorite').innerHTML += htmlString;
    })
    .catch(error => console.error('Error:', error));
}


