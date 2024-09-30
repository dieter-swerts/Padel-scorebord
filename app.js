// Array om geselecteerde spelers bij te houden
let selectedPlayers = [];
// Laad de scores uit de LocalStorage, of begin met 0 als er nog geen scores zijn
let scores = JSON.parse(localStorage.getItem('scores')) || {
  Dre: 0,
  Ben: 0,
  CP: 0,
  Jokke: 0,
  Swerts: 0
};

// Functie om spelers te selecteren
function selectPlayer(player) {
  if (selectedPlayers.length < 2 && !selectedPlayers.includes(player)) {
    selectedPlayers.push(player);
    document.getElementById('selected-players').innerText = `Geselecteerde spelers: ${selectedPlayers.join(' en ')}`;
  }
}

// Functie om de winnaar te bevestigen en scores toe te voegen
function confirmWin() {
  if (selectedPlayers.length === 2) {
    // Beide geselecteerde spelers krijgen een punt
    scores[selectedPlayers[0]] += 1;
    scores[selectedPlayers[1]] += 1;
    // Update het scorebord en sla de scores op
    updateScoreboard();
    saveScores();
    // Reset de geselecteerde spelers
    selectedPlayers = [];
    document.getElementById('selected-players').innerText = 'Geselecteerde spelers: ';
  } else {
    alert("Selecteer twee spelers!");
  }
}

// Functie om de selectie ongedaan te maken
function undo() {
  selectedPlayers = [];
  document.getElementById('selected-players').innerText = 'Geselecteerde spelers: ';
}

// Functie om het scorebord te updaten
function updateScoreboard() {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';
  for (let player in scores) {
    let scoreItem = document.createElement('li');
    scoreItem.innerText = `${player}: ${scores[player]} punten`;
    scoreItem.classList.add('scoreboard-item');
    scoreboard.appendChild(scoreItem);
  }
}

// Functie om scores op te slaan in de LocalStorage
function saveScores() {
  localStorage.setItem('scores', JSON.stringify(scores));
}

// Voer deze functie uit om het scorebord meteen te updaten bij het laden van de pagina
updateScoreboard();
