// game.js

function gameOver() {
  if (score > best) {
    best = score;
    bestDisplay.innerText = "Best: " + best;
    localStorage.setItem("bestScore", best);
  }

  overSound.currentTime = 0;
  overSound.play();

  gameRunning = false;

  fruit.classList.add("hidden");

  clearInterval(fall);

  restartBtn.classList.remove("hidden");
}

// Start game function
function startGame() {
  score = 0;
  misses = 0;
  gameRunning = true;

  scoreDisplay.innerText = "Score: 0";
  missDisplay.innerText = "Miss: 0";

  startBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  dropFruit();   
}

// Restart game function
function restartGame() {
  score = 0;
  misses = 0;
  gameRunning = true;

  scoreDisplay.innerText = "Score: 0";
  missDisplay.innerText = "Miss: 0";

  restartBtn.classList.add("hidden");

  dropFruit();  
}


startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);




