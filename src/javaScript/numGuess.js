let randomNumber = Math.floor(Math.random() * 101);
let attempts = 0;

function checkGuess() {
    const userGuess = document.getElementById("userGuess").value;
    const result = document.getElementById("result");

    attempts++;

    if (userGuess == randomNumber) {
        result.textContent = `Congratulations! You guessed the correct number in ${attempts} attempts.`;
    } else if (userGuess < randomNumber) {
        result.textContent = `Your guess is too low. Try again!`;
    } else {
        result.textContent = `Your guess is too high. Try again!`;
    }
		console.log(randomNumber);
}

function startNewGame() {
    randomNumber = Math.floor(Math.random() * 101);
    attempts = 0;
    document.getElementById("result").textContent = '';
    document.getElementById("userGuess").value = '';
}