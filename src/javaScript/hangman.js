const words = ["apple", "banana", "cherry", "orange", "grape"];
let currentWord = '';
let hiddenWord = '';
let guessesRemaining = 7;
let guessedLetters = [];

function startNewGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = currentWord.replace(/./g, '*');
    guessesRemaining = 7;
    guessedLetters = [];
    document.getElementById("result").textContent = '';
    document.getElementById("userGuess").value = '';
    document.getElementById("remaining").textContent = guessesRemaining;
    document.getElementById("wordDisplay").textContent = hiddenWord;
    document.getElementById("guessedLetters").textContent = guessedLetters.join(', ');
}

function checkGuess() {
    const userGuess = document.getElementById("userGuess").value.toLowerCase();
    const result = document.getElementById("result");

    if (userGuess.length !== 1 || !/^[a-z]$/i.test(userGuess)) {
        result.textContent = 'Please enter a valid letter!';
        return;
    }

    if (guessedLetters.includes(userGuess)) {
        result.textContent = 'You have already guessed that letter!';
        return;
    }

    guessedLetters.push(userGuess);
    document.getElementById("guessedLetters").textContent = guessedLetters.join(', ');

    let updatedWord = '';
    let found = false;

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === userGuess) {
            updatedWord += userGuess;
            found = true;
        } else {
            updatedWord += hiddenWord[i];
        }
    }

    hiddenWord = updatedWord;
    document.getElementById("wordDisplay").textContent = hiddenWord;

    if (!found) {
        guessesRemaining--;
        document.getElementById("remaining").textContent = guessesRemaining;
    }

    if (hiddenWord === currentWord) {
        result.textContent = 'Congratulations! You won!';
    } else if (guessesRemaining <= 0) {
        result.textContent = `Game over! The word was: ${currentWord}`;
    } else {
        result.textContent = '';
    }

    document.getElementById("userGuess").value = '';
}

startNewGame();