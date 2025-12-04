// score.js

function updateScore() {
  score++;
  scoreDisplay.innerText = "Score: " + score;

  if (score > best) {
    best = score;
    bestDisplay.innerText = "Best: " + best;
    localStorage.setItem("bestScore", best);
  }
}

function updateMiss() {
  misses++;
  missDisplay.innerText = "Miss: " + misses;
}
