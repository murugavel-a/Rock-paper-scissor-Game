const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElements();

let isAutoPlaying = false;
let intervalId;
function autoplay() {
  let autoPlayBtn = document.querySelector(".autoPlayBtn-js");
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const play = pickComputerMove();
      playGame(play);
    }, 500);

    isAutoPlaying = true;
    autoPlayBtn.innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayBtn.innerHTML = "Autoplay";
  }
}

document.querySelector(".js-result").innerHTML = result;

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissor") {
    if (computerMove === "rock") {
      result = "lose";
    } else if (computerMove === "paper") {
      result = "win";
    } else if (computerMove === "scissor") {
      result = "tie";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "lose";
    } else if (computerMove === "scissor") {
      result = "win";
    }
  } else if (playerMove === "paper")
    if (computerMove === "rock") {
      result = "win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else if (computerMove === "scissor") {
      result = "lose";
    }

  if (result === "win") {
    score.wins += 1;
  } else if (result === "lose") {
    score.losses += 1;
  } else if (result === "tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElements();

  document.querySelector(".js-result").innerHTML = "";

  document.querySelector(
    ".js-moves"
  ).innerHTML = ` you <img src="img/${playerMove}-emoji.png" class="move-icon" />
      <img src="img/${computerMove}-emoji.png"  class="move-icon"  /> Computer`;
}

function updateScoreElements() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins}. Losses:${score.losses}. Tie:${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissor";
  }
  return computerMove;
}
