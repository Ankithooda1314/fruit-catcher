let isPaused = false;

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  if (e.code === "Space") {
    isPaused = !isPaused;

    if (isPaused) {
      pauseGame();
    } else {
      resumeGame();
    }
  }
});

function pauseGame() {
 
  document.getElementById("pauseScreen").classList.remove("hidden");


  clearInterval(fall);
}

function resumeGame() {
 
  document.getElementById("pauseScreen").classList.add("hidden");

 
  dropFruit();
}
