//sets username at top of screen
var username = sessionStorage.getItem('fullName');
document.getElementById("cur_username").textContent = sessionStorage.getItem('fullName');

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
  url: "src/php/home.php",
  data: { 
    user: username
  },
  success: function(data) {
    // Parse the JSON response into a JavaScript object
    var scores = JSON.parse(data);

    // Get the scores for the current user
    var userScore1 = scores.whack_user_score1;
    var userScore2 = scores.whack_user_score2;
    var userScore3 = scores.whack_user_score3;

    // Get the top three scores for all users
    var allScore1 = scores.whack_top_score1.score1;
    var allScore2 = scores.whack_top_score2.score1;
    var allScore3 = scores.whack_top_score3.score1;

    // Display the scores on the webpage
    document.getElementById("user_whack_score1").textContent = userScore1;
    document.getElementById("user_whack_score2").textContent = userScore2;
    document.getElementById("user_whack_score3").textContent = userScore3;

    document.getElementById("all_whack_score1").textContent = allScore1;
    document.getElementById("all_whack_score2").textContent = allScore2;
    document.getElementById("all_whack_score3").textContent = allScore3;
  },
  error: function() {
    alert('Error getting scores');
  }
});

