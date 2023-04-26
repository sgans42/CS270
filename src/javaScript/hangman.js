const words = ["apple", "banana", "cherry", "orange", "grape"];
let currentWord = '';
let hiddenWord = '';
let guessesRemaining = 7;
let guessedLetters = [];
var username = sessionStorage.getItem('fullName');


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

function endOfGame(won) {
	let message = won ? 'Congratulations! You won!' : `Game over! The word was: ${currentWord}`;
	document.getElementById("result").textContent = message;

	if(won) {
		$.ajax({
			type: "POST",
			url: "../php/hangman.php",
			data: {
				username: username,
			}
		, 
		success: function() {
		}, 
		error: function() {
			alert('Error posting score');
		}
		});
	}

	// You can perform additional tasks here, such as updating the high scores

	// Optionally, you can start a new game or wait for the user to start a new game manually
	// startNewGame();
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
			endOfGame(true);
	} else if (guessesRemaining <= 0) {
			endOfGame(false);
	} else {
			result.textContent = '';
	}

    document.getElementById("userGuess").value = '';
}

startNewGame();

function logout() {
	sessionStorage.removeItem('fullName');
	window.location.href = '../../index.html';
}