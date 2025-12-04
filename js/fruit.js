// fruit.js

function updateFruitPosition() {
  fruit.style.left = fruitX + "px";
  fruit.style.top = fruitY + "px";
}

function dropFruit() {
  if (!gameRunning) return;

  fruit.classList.remove("hidden");

  // Random fruit image
  fruit.src = fruitImages[Math.floor(Math.random() * fruitImages.length)];

  // Random X position
  fruitX = Math.random() * (gameArea.clientWidth - fruit.offsetWidth);
  fruitY = 0;

  fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      return;
    }

    fruitY += fruitSpeed;
    updateFruitPosition();

    // Check catch
    if (checkCatch()) {
      catchSound.currentTime = 0;
      catchSound.play();

      clearInterval(fall);
      updateScore();
      dropFruit();
      return;
    }

    // Check miss
    if (fruitY > gameArea.clientHeight - fruit.offsetHeight) {
      clearInterval(fall);

      missSound.currentTime = 0;
      missSound.play();

      updateMiss();

      if (misses >= 3) {
        gameOver();
        return;
      }

      dropFruit();
    }
  }, 30);
}
