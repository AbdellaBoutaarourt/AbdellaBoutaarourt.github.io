"use strict"

import{
  standingFetch
} from './apis.js'

let teams = []
let standing = [];


window.onload = function getData() {
  //check sessionStorage
let user = JSON.parse(sessionStorage.getItem('user'));

document.getElementById('message').innerText = `Welcome ${user.username} !`

  //fetch and render data
  standingFetch().then(data => {
      teams = data.response[0].league.standings[0]

      teams.forEach(s => {
        standing.push(s)
      });

    })

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
    <button type="button" class= "button">add!</button>
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
      window.location.href = `./teamInfo.html?id=${teamID}`;
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

      fetch('https://web-2-host-football.onrender.com/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
    })
  })
}


