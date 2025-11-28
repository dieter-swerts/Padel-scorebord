// Huidige selectie van spelers
let selectedPlayers = [];

// Laad bestaande scores of maak nieuwe aan
let scores = JSON.parse(localStorage.getItem('scores')) || {
  Dre: 0,
  Ben: 0,
  CP: 0,
  Jokke: 0,
  Swerts: 0
};

// Speler selecteren
function selectPlayer(player) {
  if (selectedPlayers.length < 2 && !selectedPlayers.includes(player)) {
    selectedPlayers.push(player);
    document.getElementById('selected-players').innerText =
      `Geselecteerde spelers: ${selectedPlayers.join(' en ')}`;
  }
}

// Bevestig winnaar → geef beide spelers een punt
function confirmWin() {
  if (selectedPlayers.length === 2) {
    const [player1, player2] = selectedPlayers;
    scores[player1]++;
    scores[player2]++;
    saveScores();
    updateScoreboard();
    selectedPlayers = [];
    document.getElementById('selected-players').innerText = 'Geselecteerde spelers: ';
  } else {
    alert("Selecteer eerst twee verschillende spelers.");
  }
}

// Verwijder huidige selectie
function undo() {
  selectedPlayers = [];
  document.getElementById('selected-players').innerText = 'Geselecteerde spelers: ';
}

// Scorebord bijwerken
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

// Scores opslaan in browser
function saveScores() {
  localStorage.setItem('scores', JSON.stringify(scores));
}

// Initialiseer bij laden
updateScoreboard();
