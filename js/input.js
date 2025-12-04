// input.js

document.addEventListener("keydown", function (event) {

  if (event.key === "ArrowLeft") {
    basketX -= basketSpeed;
  } else if (event.key === "ArrowRight") {
    basketX += basketSpeed;
  } else {
    return; 
  }

  const maxX = gameArea.clientWidth - basket.offsetWidth;

  if (basketX < 0) {
    basketX = 0;
  }

  if (basketX > maxX) {
    basketX = maxX;
  }

  updateBasketPosition();
});
