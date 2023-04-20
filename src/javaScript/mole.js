const def_score = 0;
const def_molesLeft = 30;
const def_popupLength = 3000;
const def_isGameRunning = false;

let score = def_score;
let molesLeft = def_molesLeft;
let popupLength = def_popupLength; //set to 3000 as default
let isGameRunning = def_isGameRunning;
let hideTimeout;
let clickable = false;
let startTime;


function popUpRandomMole() {
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
		isGameRunning = false;
    return;
  }

  const moleHeads = document.querySelectorAll('.wgs__mole-head');

  if (moleHeads.length === 0) {
    return;
  }
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  clickable = true;

  moleHead.classList.remove('wgs__mole-head--hidden', 'wgs__mole-head--whacked');

  molesLeft -= 1;
  document.querySelector('.sb__moles').innerHTML = molesLeft;

  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);

startTime = new Date().getTime(); // Add this line to record the start time

}

function hideMole(mole) {
  clickable = false;
  mole.classList.add('wgs__mole-head--hidden');

  setTimeout(popUpRandomMole, 500);
}

function restartGame() {
	isGameRunning = true;

  document.querySelector('.sb__game-over').classList.add('sb__game-over--hidden');
  score = def_score;
  molesLeft = def_molesLeft;
  popupLength = def_popupLength; // Reset popupLength to the default value
  document.querySelector('.sb__score').innerHTML = score;
  document.querySelector('.sb__moles').innerHTML = molesLeft;
  
  // Start the game
  setTimeout(popUpRandomMole, 0);
}

window.addEventListener('DOMContentLoaded', () => {
  const startGameBtn = document.querySelector('#start-game-btn');
  startGameBtn.addEventListener('click', () => {
    if(isGameRunning) { 
      return;
    }
    startGameBtn.classList.add('sb__start-game-btn--hidden');
    restartGame();
  });

  const moleHeads = document.querySelectorAll('.wgs__mole-head');
  for (let moleHead of moleHeads) {
    moleHead.addEventListener('click', event => {
      if(!clickable) {
        return;
      }

      const currentTime = new Date().getTime();
      const reactionTime = currentTime - startTime;

      // Calculate the score based on reaction time and remaining moles
      const points = Math.floor(1000 / reactionTime) * (1 + (def_molesLeft - molesLeft) / 10);
      score += points;
			score = parseFloat(score.toFixed(2)); // Round the score to 2 decimal places
      document.querySelector('.sb__score').innerHTML = score;
      popupLength -= popupLength / 10;

      clearTimeout(hideTimeout);
      hideMole(event.target);

      event.target.classList.add('wgs__mole-head--hidden');
    });
  }
});


