// 1) HTML se elements pakadna
const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");

// 2) Basket ki starting position (x axis me)
let basketX = 150;       // pixels
const basketSpeed = 20;  // har keypress me kitna move kare

// 3) Basket ki position ko apply karne wala function
function updateBasketPosition() {
  basket.style.left = basketX + "px";
}

// Pehli baar call, taaki JS wali position set ho jaye
updateBasketPosition();

// 4) Keyboard event sunna (keys press hone par)
document.addEventListener("keydown", function (event) {
  // Sirf left & right arrow pe react karna
  if (event.key === "ArrowLeft") {
    basketX -= basketSpeed;  // left jana
  } else if (event.key === "ArrowRight") {
    basketX += basketSpeed;  // right jana
  } else {
    // agar koi aur key hai, kuch mat karo
    return;
  }

  // 5) Basket ko boundary se bahar nahi jane dena
  const maxX = gameArea.clientWidth - basket.offsetWidth;

  if (basketX < 0) {
    basketX = 0;
  }

  if (basketX > maxX) {
    basketX = maxX;
  }

  // 6) Position ko screen par update karna
  updateBasketPosition();
});
