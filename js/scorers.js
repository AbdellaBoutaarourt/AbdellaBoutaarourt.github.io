"use strict"
import {
  scorers,
  passers
} from './apis.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const leagueID = urlParams.get('league')


window.onload = function getData() {
  let htmlNav = `<div class="nav-links">
  <ul>
    <li><a href="home.html?league=${leagueID}">Home</a></li>
    <li class="active"><a href="topScorers.html?league=${leagueID}">Players Stats</a></li>
    <li class="login">
      <a href="profile.html?league=${leagueID}"><img src="./../pictures/user.png">Profile</a>
      <a href="signIn.html" class="signout">Sign out</a>
    </li>
  </ul>
</div> `
  document.querySelector('.nav-links').innerHTML = htmlNav;

  scorers().then(data => {
    console.log(data)
    let players = data.response

    players.forEach(player => {
      let htmlString = ""

      htmlString += `
          <tr class="player">
              <td class="team">
                  <img src="${player.player.photo}">
                  <span class="name-full">${player.player.name}</span>
              </td>
              <td class="team-scorer">${player.statistics[0].team.name}</td>
              <td class="team-nationality">${player.player.nationality}</td>
              <td class="played">${player.statistics[0].games.appearences}</td>
              <td class="goals">${player.statistics[0].goals.total}</td>
              </tr>

        `
      document.getElementById("scorer").innerHTML += htmlString;
      document.getElementById("titels").style.display = "none";
    });

  })
  assist();
  buttons();

}

function assist() {
  passers().then(data => {
    let players = data.response
    let header = ""
    header += `
        <tr class="comp-table-header">
          <th class="player">Player</th>
          <th class="team">Team</th>
          <th class="nationality">nationality</th>
          <th class="played">Played</th>
          <th class="goals">Assists</th>
        </tr>
        `
    document.getElementById("titels").innerHTML += header;

    players.forEach(player => {
      let html = ""

      html += `
            <tr class="player">
                <td class="team">
                    <img src="${player.player.photo}">
                    <span class="name-full">${player.player.name}</span>
                </td>
                <td class="team-scorer">${player.statistics[0].team.name}</td>
                <td class="team-nationality">${player.player.nationality}</td>
                <td class="played">${player.statistics[0].games.appearences}</td>
                <td class="goals">${player.statistics[0].goals.assists}</td>
                </tr>

          `
      document.getElementById("assist").innerHTML += html;
      document.getElementById("assist").style.display = "none";
    });


  })

}


function buttons() {
  document.getElementById("assists").addEventListener("click", () => {
    document.getElementById('comp-name').innerHTML = 'top assists Premier League'
    document.getElementById("assist").style = "none";
    document.getElementById("scorer").style.display = "none";
    document.getElementById("first-titels").style.display = "none"
    document.getElementById("titels").style = "none";
    document.getElementById("assists").style = "none";
    document.getElementById("scorers").style.border = "none";
  })

  document.getElementById("scorers").addEventListener("click", () => {
    document.getElementById('comp-name').innerHTML = "top scorers Premier League"
    document.getElementById("scorer").style = "none";
    document.getElementById("first-titels").style = "none"
    document.getElementById("titels").style.display = "none";
    document.getElementById("assist").style.display = "none";
    document.getElementById("assists").style.border = "none";
    document.getElementById("scorers").style = "none";
  })
}