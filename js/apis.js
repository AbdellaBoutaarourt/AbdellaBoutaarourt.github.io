
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const teamID = urlParams.get('id')
const leagueID = urlParams.get('league');

const key = {
  method: 'GET',
  headers: {
    "x-rapidapi-key": "c6c38485905470bccf0bfe920f381bf0",
    "x-rapidapi-host": "v3.football.api-sports.io"
  },
}

async function standingFetch() {
  const response = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueID}&season=2024`, key)
  const data = await response.json();
  return data
}

async function scorers() {
  const response = await fetch(`https://v3.football.api-sports.io/players/topscorers?league=${leagueID}&season=2024`, key)
  const data = await response.json();
  return data
}

async function passers() {
  const response = await fetch(`https://v3.football.api-sports.io/players/topassists?league=${leagueID}&season=2024`, key)
  const data = await response.json();
  return data
}

async function stats() {
  const response = await fetch(`https://v3.football.api-sports.io/teams/statistics?league=${leagueID}&season=2024&team=${teamID}`, key)
  const data = await response.json();
  return data
}

async function squad() {
  const response = await fetch(`https://v3.football.api-sports.io/players/squads?team=${teamID}`, key)
  const data = await response.json();
  return data
}


// login

async function fetchSign(url, method, data) {
  let resp = await fetch(url, {
    method: method,
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify(data)
  })
  return await resp.json();
}


export {
  standingFetch,
  scorers,
  passers,
  stats,
  squad,
  fetchSign
}