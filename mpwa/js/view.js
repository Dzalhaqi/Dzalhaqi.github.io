import dataApi from './data-api.js';
var matchesData
var teamData
var teamId
var matchId
var detail

// fungsi untuk mengambil data dari API

async function loadStandings() {
    showLoader();
    let dataStandings = await dataApi.getStandings()
    konversiDataStanding(dataStandings);
    let html = '';
    detail = '';
    addDataStanding(dataStandings);
    html = showViewStandingTable(dataStandings, detail)
    document.getElementById("header-title").innerHTML = 'Spain Leagues Standings';
    document.getElementById("main-content").innerHTML = html;
    hideLoader()
}

async function loadMatches() {
    showLoader()
    let completeData = await dataApi.getMatches()
    matchesData = completeData;
    let html = '';
    let data = completeData.matches
    html += `<div class="row">`
    data.forEach(match => html += showDataMaches(match))
    html += `</div>`
    document.getElementById("header-title").innerHTML = 'Matches';
    document.getElementById("main-content").innerHTML = html;
    hideLoader()
}

async function loadTeams() {
    showLoader()
    let dataTeams = await dataApi.getTeams()
    konversiDataTeam(dataTeams)

    teamData = dataTeams
    let html = ''
    html += '<div class="row">'
    dataTeams.teams.forEach(team => {
        teamId = team.id
        html += showDataTeams(team)
    })
    html += "</div>"
    document.getElementById("header-title").innerHTML = 'Teams';
    document.getElementById("main-content").innerHTML = html;
    hideLoader()
}

// fungsi untuk mengambil favourite
function loadFavMatch() {
    showLoader()
    let completeData = getFavMatch();
    matchesData = completeData;
    completeData.then(data => {
        let html = ''
        html += '<div class="row">'
        data.forEach(match => html += showFavDataMatches(match))

        if (data.length == 0) html += '<div class="nofav"><h6 class="center-align">No favorite team found!</6></div>'

        html += "</div>"
        document.getElementById("header-title").innerHTML = 'Favorites Match';
        document.getElementById("main-content").innerHTML = html;
        hideLoader()
    })
}


function loadFavTeams() {
    showLoader()
    let dataTeams = getFavTeams();
    dataTeams.then(data => {
        teamData = data;
        let html = ''
        html += '<div class="row">'
        data.forEach(team => html += showFavDataTeams(team))

        if (data.length == 0) html += '<div class="nofav"><h6 class="center-align">No favorite team found!</6></div>'

        html += "</div>"
        document.getElementById("header-title").innerHTML = 'Favorite Teams';
        document.getElementById("main-content").innerHTML = html;
        hideLoader()
    })
}

// fungsi untuk mengolah data sebelum menjadi sebuah objek yang bisa dipakai

function addDataStanding(data) {
    data.standings.forEach(standing => {
        standing.table.forEach(result => {
            let dataStanding = showDataStandinds(result)
            detail += dataStanding;
        })
    });
}

function konversiDataStanding(data) {
    let str = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
    data = JSON.parse(str);
    return data;
}

function konversiDataTeam(data) {
    let str = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(str);
    return data;
}

// fungsi untuk mendapatkan komponen tampilan dari tiap data API

function showDataStandinds(result) {
    return `<tr>
            <td class="center">${result.position}</td>
            <td class="center"><img class=responsive-img" width="24" height="24" src="${result.team.crestUrl}"> ${result.team.name}</td>
            <td class="center">${result.playedGames}</td>
            <td class="center">${result.won}</td>
            <td class="center">${result.draw}</td>
            <td class="center">${result.lost}</td>
            <td class="center">${result.goalsFor}</td>
            <td class="center">${result.goalsAgainst}</td>
            <td class="center">${result.goalDifference}</td>
            <td class="center">${result.points}</td>
          </tr>`
}

function showViewStandingTable(dataStandings, detail) {
    return `
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
        <h5 class="center header-data">${dataStandings.competition.name}</h5>
        <br>
        <table class="responsive-table striped">
        <thead>
          <tr>
            <th class="center">Position</th>
            <th class="center">Team</th>
            <th class="center">Played</th>
            <th class="center">Won</th>
            <th class="center">Draw</th>
            <th class="center">Lost</th>
            <th class="center">GF</th>
            <th class="center">GA</th>
            <th class="center">GD</th>
            <th class="center">Points</th>
          </tr>
        </thead>
        <tbody id=detail-data>${detail}</tbody>
        </table>
        </div>
        </div>
        </div>
      `
}


function showDataMaches(match) {
    return `
          <div class="col s12 m6 l6">
            <div class="card">
              <div class="card-content card-match">
              <div style="text-align: center"><h6>${formatDate(new Date(match.utcDate))}</h6></div>
              <br>
                <div class="col s10">${match.homeTeam.name}</div>
                <div class="col s2">${match.score.fullTime.homeTeam}</div>
                <div class="col s10">${match.awayTeam.name}</div>
                <div class="col s2">${match.score.fullTime.awayTeam}</div>
                <br>
                <br>
              </div>
              <div class="card-action right-align">
              <a data-matchid="${match.id}" class="matchId waves-effect waves-light btn-small green">&#10084;</a>
              </div>
            </div>
          </div>
    `
}


function showDataTeams(team) {

    return `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
            <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
          </div>
          <div class="card-action right-align">
              <a data-teamid="${team.id}" class="teamId waves-effect waves-light btn-small green">&#10084;</a>
          </div>
        </div>
      </div>
    `
}

// fungsi uuntuk menampilkan tampilan data favourite

function showFavDataTeams(team) {
    return `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
            <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
          </div>
          <div class="card-action right-align">
              <a data-teamid="${team.id}" class="deleteFavTeamId waves-effect waves-light btn-small red">Delete</a>
          </div>
        </div>
      </div>
    `
}

function showFavDataMatches(match) {
    return `
          <div class="col s12 m6 l6">
            <div class="card">
              <div class="card-content card-match">
              <div style="text-align: center"><h6>${formatDate(new Date(match.utcDate))}</h6></div>
              <br>
                <div class="col s10">${match.homeTeam.name}</div>
                <div class="col s2">${match.score.fullTime.homeTeam}</div>
                <div class="col s10">${match.awayTeam.name}</div>
                <div class="col s2">${match.score.fullTime.awayTeam}</div>
                <br>
                <br>
              </div>
              <div class="card-action right-align">
              <a data-matchid="${match.id}" class="deleteFavMatchId waves-effect waves-light btn-small red">Delete</a>
              </div>
            </div>
          </div>
            `
}

// fungsi untuk membuat aksi ketika tombol favourite di klik

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('teamId')) {
        teamId = e.target.dataset.teamid;
        teamId = e.target.dataset.teamid;
        insertTeamListener(teamId);
    } else if (e.target.classList.contains('matchId')) {
        matchId = e.target.dataset.matchid;
        matchId = e.target.dataset.matchid;
        insertMatchListener(matchId);
    } else if (e.target.classList.contains('deleteFavTeamId')) {
        teamId = e.target.dataset.teamid;
        teamId = parseInt(teamId);
        deleteTeamListener(teamId);
    } else if (e.target.classList.contains('deleteFavMatchId')) {
        matchId = e.target.dataset.matchid;
        matchId = parseInt(matchId);
        deleteMatchListener(matchId);
    }
})

// fungsi loader dan date format

function showLoader() {
    let html = `<div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>`
    document.getElementById("loader").innerHTML = html;
}

function hideLoader() {
    document.getElementById("loader").innerHTML = '';
}

function formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}


// fungsi untuk berinteraksi dengan indexed db


var dbo = idb.open('football', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore('matches', {
                'keyPath': 'id'
            })
            upgradeDb.createObjectStore('teams', {
                'keyPath': 'id'
            })
    }
});

function insertMatch(match) {
    dbo.then(db => {
        let tx = db.transaction('matches', 'readwrite');
        let store = tx.objectStore('matches')
        match.createdAt = new Date().getTime()
        store.put(match)
        return tx.complete;
    }).then(() => {
        M.toast({
            html: `Pertandingan ${match.homeTeam.name} VS ${match.awayTeam.name}\nberhasil disimpan!`
        })
        console.log('Pertandingan berhasil disimpan');
    }).catch(err => {
        console.error('Pertandingan gagal disimpan', err);
    });
}

function deleteMatch(matchId) {
    dbo.then(db => {
        let tx = db.transaction('matches', 'readwrite');
        let store = tx.objectStore('matches');
        store.delete(matchId);
        return tx.complete;
    }).then(() => {
        M.toast({
            html: 'Match has been deleted!'
        });
        loadFavMatch();
    }).catch(err => {
        console.error('Error: ', err);
    });
}

function getFavMatch() {
    return dbo.then(db => {
        let tx = db.transaction('matches', 'readonly');
        let store = tx.objectStore('matches');
        return store.getAll();
    })
}

function insertTeam(team) {
    dbo.then(db => {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams')
        team.createdAt = new Date().getTime()
        store.put(team)
        return tx.complete;
    }).then(() => {
        M.toast({
            html: `${team.name} berhasil disimpan!`
        })
        console.log('Team berhasil disimpan');
    }).catch(err => {
        console.error('Team gagal disimpan', err);
    });
}

function deleteTeam(teamId) {
    dbo.then(db => {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        store.delete(teamId);
        return tx.complete;
    }).then(() => {
        M.toast({
            html: 'Team has been deleted!'
        });
        loadFavTeams();
    }).catch(err => {
        console.error('Error: ', err);
    });
}

function getFavTeams() {
    return dbo.then(db => {
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
        return store.getAll();
    })
}

function insertMatchListener(matchId) {
    let match = matchesData.matches.filter(el => el.id == matchId)[0]
    insertMatch(match)
}

function deleteMatchListener(matchId) {
    var konfirmasi = confirm("Delete this match?")
    if (konfirmasi == true) {
        deleteMatch(matchId);
    }
}

function insertTeamListener(teamId) {
    let team = teamData.teams.filter(el => el.id == teamId)[0]
    insertTeam(team);

}

function deleteTeamListener(teamId) {
    var konfirmasi = confirm("Delete this team?")
    if (konfirmasi == true) {
        deleteTeam(teamId);
    }
}

export default {
    loadStandings,
    loadMatches,
    loadTeams,
    loadFavTeams,
    loadFavMatch,
    insertMatch,
    insertTeam,
    deleteMatch,
    getFavMatch,
    getFavTeams,
    insertMatchListener,
    deleteMatchListener,
    insertTeamListener,
    deleteTeamListener,
    teamData,
    matchesData,
    matchId,
    teamId
}