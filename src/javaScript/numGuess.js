let randomNumber = Math.floor(Math.random() * 101);
let attempts = 0;
var username = sessionStorage.getItem('fullName');


function checkGuess() {
    const userGuess = document.getElementById("userGuess").value;
    const result = document.getElementById("result");

    attempts++;

    if (userGuess == randomNumber) {
        result.textContent = `Congratulations! You guessed the correct number in ${attempts} attempts.`;
				endOfGame()
    } else if (userGuess < randomNumber) {
        result.textContent = `Your guess is too low. Try again!`;
				console.log(randomNumber);
    } else {
        result.textContent = `Your guess is too high. Try again!`;
    }
		console.log(randomNumber);
}

function endOfGame() {
	$.ajax({
		type: "POST",
		url: "../php/numGuess.php",
		data: {
			username: username,
			attempts: attempts
		}
	, 
	success: function() {
		alert('sucess');
	}, 
	error: function() {
		alert('Error posting score');
	}
	});
}

function startNewGame() {
    randomNumber = Math.floor(Math.random() * 101);
    attempts = 0;
    document.getElementById("result").textContent = '';
    document.getElementById("userGuess").value = '';
}

function logout() {
	sessionStorage.removeItem('fullName');
	window.location.href = '../../index.html';
}