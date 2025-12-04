// CONTROLS SCREEN LOGIC

document.addEventListener("click", () => {
 
  if (gameRunning) return;


  const controls = document.getElementById("controlsScreen");
  controls.classList.add("hidden");


  startGame();
});
