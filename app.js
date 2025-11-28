// Geselecteerde spelers
let selectedPlayers = [];

// Scoregegevens uit localStorage ophalen of initiëren
let scores = JSON.parse(localStorage.getItem('scores')) || {
  Dre: 0,
  Ben: 0,
  CP: 0,
  Jokke: 0,
  Swerts: 0
};

// Spelerselectie
function selectPlayer(player) {
  if (selectedPlayers.length < 2 && !selectedPlayers.includes(player)) {
    selectedPlayers.push(player);
    document.getElementById('selected-players').innerText =
      `Geselecteerde spelers: ${selectedPlayers.join(' en ')}`;
  }
}

// Score bevestigen
function confirmWin() {
  if (selectedPlayers.length === 2) {
    scores[selectedPlayers[0]] += 1;
    scores[selectedPlayers[1]] += 1;
    updateScoreboard();
    saveScores();
    selectedPlayers = [];
    document.getElementById('selected-players').innerText = 'Geselecteerde spelers: ';
  } else {
    alert("Selecteer twee spelers!");
  }
}

// Selectie ongedaan maken
function undo() {
  selectedPlayers = [];
  document.getElementById('selected-players').innerText = 'Geselecteerde spelers: ';
}

// Scorebord updaten
function updateScoreboard() {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';
  for (let player in scores) {
    const li = document.createElement('li');
    li.className = 'scoreboard-item';
    li.innerText = `${player}: ${scores[player]} punten`;
    scoreboard.appendChild(li);
  }
}

// Scores opslaan
function saveScores() {
  localStorage.setItem('scores', JSON.stringify(scores));
}

// Bij opstart scores tonen
updateScoreboard();
