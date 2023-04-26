let playerTurn = true;
let computerMoveTimeout = 0;
var username = sessionStorage.getItem('fullName');


const gameStatus = {
    MORE_MOVES_LEFT: 1,
    HUMAN_WINS: 2,
    COMPUTER_WINS: 3,
    DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    const newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);
    const buttons = getGameBoardButtons();
    for (let button of buttons) {
        button.addEventListener("click", function () { boardButtonClicked(button); });
    }
    newGame();
}

function getGameBoardButtons() {
    return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
    const buttons = getGameBoardButtons();
    const possibilities = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let indices of possibilities) {
        if (buttons[indices[0]].innerHTML !== "" &&
            buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
            buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
            if (buttons[indices[0]].innerHTML === "X") {
                return gameStatus.HUMAN_WINS;
            } else {
                return gameStatus.COMPUTER_WINS;
            }
        }
    }
    let foundEmpty = false;
    for (let button of buttons) {
        if (button.innerHTML !== "X" && button.innerHTML !== "O") {
            return gameStatus.MORE_MOVES_LEFT;
        }
    }
    return gameStatus.DRAW_GAME;
}

function newGame() {
    clearTimeout(computerMoveTimeout);
    computerMoveTimeout = 0;
    const buttons = getGameBoardButtons();
    for (let button of buttons) {
        button.innerHTML = "";
        button.classList.remove("x", "o");
        button.disabled = false;
    }
    playerTurn = true;
    const turnInfo = document.getElementById("turnInfo");
    turnInfo.innerHTML = "Your turn";
}

function boardButtonClicked(button) {
    if (playerTurn) {
        button.innerHTML = "X";
        button.classList.add("x");
        button.disabled = true;
        switchTurn();
    }
}

function endOfGame(message, won) {
	clearTimeout(computerMoveTimeout);
	computerMoveTimeout = 0;
	const turnInfo = document.getElementById("turnInfo");
	turnInfo.innerHTML = message;
	playerTurn = false;

	if(won) {
		$.ajax({
			type: "POST",
			url: "../php/tic.php",
			data: {
				username: username,
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
}

function switchTurn() {
	const winner = checkForWinner();

	if (winner === gameStatus.HUMAN_WINS) {
			endOfGame("You win!", true);
	} else if (winner === gameStatus.COMPUTER_WINS) {
			endOfGame("Computer wins!");
	} else if (winner === gameStatus.DRAW_GAME) {
			endOfGame("Draw game", false);
	} else {
			playerTurn = !playerTurn;
			if (playerTurn) {
					const turnInfo = document.getElementById("turnInfo");
					turnInfo.innerHTML = "Your turn";
			} else {
					const turnInfo = document.getElementById("turnInfo");
					turnInfo.innerHTML = "Computer's turn";
					computerMoveTimeout = setTimeout(makeComputerMove, 1000);
			}
	}
}

function makeComputerMove() {
	const buttons = getGameBoardButtons();
	const availableButtons = [];
	for (let button of buttons) {
			if (button.innerHTML !== "X" && button.innerHTML !== "O") {
					availableButtons.push(button);
			}
	}
	if (availableButtons.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableButtons.length);
			const chosenButton = availableButtons[randomIndex];
			chosenButton.innerHTML = "O";
			chosenButton.classList.add("o");
			chosenButton.disabled = true;
			switchTurn();
	} else {
			switchTurn();
	}
}

function logout() {
	sessionStorage.removeItem('fullName');
	window.location.href = '../../index.html';
}