//sets username at top of screen

var username = sessionStorage.getItem('fullName');


// main();

// function main() {
// 	tic_tac();
// 	whack();

// }


//Tic Tac Toe Score 
// function tic_tac() {

// }

//Whack a Mole Score

$.ajax({
  type: "GET",
  url: "../php/home.php",
  data: { 
    user: username
  },
	success: function(data) {
		const scores = JSON.parse(data);
		// Update the UI with the user's scores
		for (const game in scores.userScores) {
			const gamePrefix = game === 'tic_tac_toe' ? 'user_tic' : game === 'whack_a_mole' ? 'user_whack' : game === 'hangman' ? 'user_hang' : game === 'memory' ? 'user_mem' : 'user_num';
			document.getElementById(`${gamePrefix}_score1`).textContent = scores.userScores[game].score1;
			if (scores.userScores[game].score2) {
				document.getElementById(`${gamePrefix}_score2`).textContent = scores.userScores[game].score2;
			}
			if (scores.userScores[game].score3) {
				document.getElementById(`${gamePrefix}_score3`).textContent = scores.userScores[game].score3;
			}
		}
		// Update the UI with the top 3 scores for each game
		for (const game in scores.topScores) {
			const gamePrefix = game === 'tic_tac_toe' ? 'all_tic' : game === 'whack_a_mole' ? 'all_whack' : game === 'hangman' ? 'all_hang' : game === 'memory' ? 'all_mem' : 'all_num';
			document.getElementById(`${gamePrefix}_score1`).textContent = scores.topScores[game].top1;
			document.getElementById(`${gamePrefix}_score2`).textContent = scores.topScores[game].top2;
			document.getElementById(`${gamePrefix}_score3`).textContent = scores.topScores[game].top3;
		}
		alert('sucess');
	},
  error: function() {
    alert('Error getting scores');
  }
});

function logout() {
  sessionStorage.removeItem('fullName');
  window.location.href = 'login.html';
}

