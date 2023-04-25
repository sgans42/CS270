const images = [
	 "../pic/banana.jpg",
	"../pic/cherry.jpg",
	"../pic/orange.jpg",
	"../pic/grape.jpg",
	"../pic/apple.jpg",
	"../pic/pineapple.png",
	"../pic/peach.jpg",
	"../pic/pear.jpg"
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
var username = sessionStorage.getItem('fullName');


function startNewGame() {
    matchedPairs = 0;
    score = 0;
    updateScoreDisplay();
    cards = createCards();
    renderCards();
}

function createCards() {
    const doubledImages = images.concat(images);
    return doubledImages.sort(() => 0.5 - Math.random());
}

function renderCards() {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";

    cards.forEach((image, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;

        const img = document.createElement("img");
        img.src = image;

        card.appendChild(img);
        card.addEventListener("click", handleCardClick);
        grid.appendChild(card);
    });
}

function handleCardClick(e) {
    const card = e.currentTarget;
    const index = card.dataset.index;

    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        card.querySelector("img").style.display = "block";
        flippedCards.push(index);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function endOfGame() {

	$.ajax({
		type: "POST",
		url: "../php/memory.php",
		data: {
			username: username,
			score: score
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

function checkMatch() {
	setTimeout(() => {
			const card1 = document.querySelector(`[data-index="${flippedCards[0]}"]`);
			const card2 = document.querySelector(`[data-index="${flippedCards[1]}"]`);

			if (cards[flippedCards[0]] === cards[flippedCards[1]]) {
					matchedPairs++;
					score += 4;

					card1.removeEventListener("click", handleCardClick);
					card2.removeEventListener("click", handleCardClick);
					card1.style.backgroundColor = "green";
					card2.style.backgroundColor = "green";

					if (matchedPairs === images.length) {
							endOfGame();
					}
			} else {
					score -= 1;
					card1.classList.remove("flipped");
					card2.classList.remove("flipped");
					card1.querySelector("img").style.display = "none";
					card2.querySelector("img").style.display = "none";
			}

			updateScoreDisplay();
			flippedCards = [];
	}, 1000);
}

function updateScoreDisplay() {
	document.getElementById("scoreDisplay").textContent = score;
}

startNewGame();