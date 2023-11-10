let score = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Draws: 0,
};

updateScoreElement();

// if (!score) {
//     score = {
//         Wins: 0,
//         Losses: 0,
//         Draws: 0,
//     };
// }

function resetScore() {
  score.Wins = 0;
  score.Losses = 0;
  score.Draws = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    //when the game is playing, change text to stop playing
    document.querySelector(".js-auto-play-btn").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    //when the game is not playing, change text to AutoPlay
    document.querySelector(".js-auto-play-btn").innerHTML = "Auto Playing";
  }
}

      document.querySelector(".js-auto-play-btn").addEventListener("click", () => {
        autoPlay();
      });

      document.querySelector(".js-rock-btn").addEventListener("click", () => {
        playGame("rock");
      });

      document.querySelector(".js-paper-btn").addEventListener("click", () => {
        playGame("paper");
      });

      document.querySelector(".js-scissors-btn").addEventListener("click", () => {
        playGame("scissors");
      });

// using keyboard to play the game
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key == "Backspace") {
    showResetConfirmation();
  }
});

//update the click event listeners to show the confirm. messg.
//instead of reseting the score immediately.

document.querySelector(".btn-reset-btn").addEventListener("click", () => {
  showResetConfirmation();
});

//function for showing confirmation message
function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
  Are you sure you want to reset the score?
  <button class="js-reset-confirm-yes reset-confirm-btn">
    Yes
  </button>
  
  <button class="js-reset-confirm-no reset-confirm-btn">
    No
  </button>
  `;

  // add onclick on the reset button
  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

// function for hiding the message
function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  // compare our move with the computer Move
  let result = "";

  if (playerMove == "scissors") {
    if (computerMove === "Rock") {
      result = "You lose";
    } else if (computerMove === "Paper") {
      result = "You win";
    } else if (computerMove === "Scissors") {
      result = "Draw";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "Rock") {
      result = "You win";
    } else if (computerMove === "Paper") {
      result = "Draw";
    } else if (computerMove === "Scissors") {
      result = "You lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "Rock") {
      result = "Draw";
    } else if (computerMove === "Paper") {
      result = "You lose";
    } else if (computerMove === "Scissors") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.Wins += 1;
  } else if (result === "You lose") {
    score.Losses += 1;
  } else if (result === "Draw") {
    score.Draws += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You 
        <img src="${playerMove}-emoji.png" class="move-icon">
        <img src="${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Draws: ${score.Draws}`;
}

function pickComputerMove() {
  //generate a random number
  const randNumber = Math.random();

  let computerMove = "";

  //converted the move to computer move

  if (randNumber >= 0 && randNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randNumber >= 1 / 3 && randNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randNumber >= 2 / 3 && randNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}
