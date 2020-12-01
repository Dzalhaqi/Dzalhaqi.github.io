const API_KEY = '031cb13ff0274b41bf48afd7b3513c90'
const LEAGUE_ID = 2014
let base_url = "https://api.football-data.org/v2/";
let standing_ep = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
let matches_ep = `${base_url}competitions/${LEAGUE_ID}/matches`
let teams_ep = `${base_url}competitions/${LEAGUE_ID}/teams`

function fetchApi(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error: " + error);
}

function getStandings() {
    if ('cache' in window) {
        caches.match(standing_ep)
            .then(status)
            .then(json)
            .then(data => data)
    } else {
        return fetchApi(standing_ep)
            .then(status)
            .then(json)
            .then(data => data)
    }
}

function getMatches() {
    if ('cache' in window) {
        caches.match(matches_ep)
            .then(status)
            .then(json)
            .then(data => data)
    } else {
        return fetchApi(matches_ep)
            .then(status)
            .then(json)
            .then(data => data)
    }
}

function getTeams() {
    if ('cache' in window) {
        caches.match(standing_ep)
            .then(status)
            .then(json)
            .then(data => data)
            .catch(err => err)
    } else {
        return fetchApi(teams_ep)
            .then(status)
            .then(json)
            .then(data => data)
            .catch(err => err)
    }
}

export default {
    getStandings,
    getMatches,
    getTeams,
    error,
}