

var username = sessionStorage.getItem('fullName');

function getScore() {
	getTicScore();
	getWhackAMoleScore();
	getHangScore();
	getMemScore();
	getNumScore();
}

function getTicScore() {
	$.ajax({
		type: "POST",
		url: "../php/home_tic.php",
		data: {
			username: username,
		},
		dataType: "json",
		success: function(response) {
      // Updating user score
      $("#user_tic_score1").text(response.user_score);

      // Updating top scores
      $("#all_tic_score1").text(response.top_scores[0]);
      $("#all_tic_score2").text(response.top_scores[1]);
      $("#all_tic_score3").text(response.top_scores[2]);
		},
		error: function() {
// alert("Error Tic Tac Toe scores");
		},
	});
}


function getWhackAMoleScore() {
	$.ajax({
		type: "POST",
		url: "../php/home_whack.php",
		data: {
			username: username,
		},
		dataType: "json",
		success: function(response) {
    // Updating user scores
    $("#user_whack_score1").text(response.user_scores.score1);
    $("#user_whack_score2").text(response.user_scores.score2);
    $("#user_whack_score3").text(response.user_scores.score3);

    // Updating top scores
    $("#all_whack_score1").text(response.top_scores[0]);
    $("#all_whack_score2").text(response.top_scores[1]);
    $("#all_whack_score3").text(response.top_scores[2]);
		},
		error: function() {
// alert("Error Whack scores");
		},
	});
}

function getHangScore() {
	$.ajax({
		type: "POST",
		url: "../php/home_hang.php",
		data: {
			username: username,
		},
		dataType: "json",
		success: function(response) {
      // Updating user score
      $("#user_hang_score1").text(response.user_score);

      // Updating top scores
      $("#all_hang_score1").text(response.top_scores[0]);
      $("#all_hang_score2").text(response.top_scores[1]);
      $("#all_hang_score3").text(response.top_scores[2]);
		},
		error: function() {
// alert("Error Hangman scores");
		},
	});

}

function getMemScore() {
	$.ajax({
		type: "POST",
		url: "../php/home_mem.php",
		data: {
			username: username,
		},
		dataType: "json",
		success: function(response) {
    // Updating user scores
    $("#user_mem_score1").text(response.user_scores.score1);
    $("#user_mem_score2").text(response.user_scores.score2);
    $("#user_mem_score3").text(response.user_scores.score3);

    // Updating top scores
    $("#all_mem_score1").text(response.top_scores[0]);
    $("#all_mem_score2").text(response.top_scores[1]);
    $("#all_mem_score3").text(response.top_scores[2]);
		},
		error: function() {
// alert("Error Memory Match scores");
		},
	});
}

function getNumScore() {
	$.ajax({
		type: "POST",
		url: "../php/home_num.php",
		data: {
			username: username,
		},
		dataType: "json",
		success: function(response) {
    // Updating user scores
    $("#user_num_score1").text(response.user_scores.score1);
    $("#user_num_score2").text(response.user_scores.score2);
    $("#user_num_score3").text(response.user_scores.score3);

    // Updating top scores
    $("#all_num_score1").text(response.top_scores[0]);
    $("#all_num_score2").text(response.top_scores[1]);
    $("#all_num_score3").text(response.top_scores[2]);
		},
		error: function() {
// alert("Error Number Guesser scores");
		},
	});
}


	function logout() {
		sessionStorage.removeItem('fullName');
		window.location.href = '../../index.html';
	}

