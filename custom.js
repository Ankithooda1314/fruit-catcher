// 1) HTML se elements pakadna
const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const catchSound = new Audio("assests/Sounds/tap.wav");
const overSound = new Audio("assests/Sounds/over.wav");
const missSound = new Audio("assests/Sounds/miss.wav");

const fruit = document.getElementById("fruit");

const fruitImages = [
  "assests/Images/apple.png",
  "assests/Images/banana.png",
  "assests/Images/mango.png",
  "assests/Images/strawberrry.png"
];




//best score
// let best = 0;
// const bestDisplay = document.getElementById("bestScore");
// bestDisplay.innerText = "Best: 0";

let best = Number(localStorage.getItem("bestScore")) || 0;
const bestDisplay = document.getElementById("bestScore");
bestDisplay.innerText = "Best: " + best;


let gameRunning = false;
let fall = null;

let score = 0;
const scoreDisplay = document.getElementById("score");


//miss counter
let misses = 0;
const missDisplay = document.getElementById("misses");


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

let fruitX = 100;   // starting X position
let fruitY = 0;     // starting Y position
let fruitSpeed = 3; // falling speed (jitna bada, utna fast)

// Fruit position ko apply karna
function updateFruitPosition() {
  fruit.style.left = fruitX + "px";
  fruit.style.top = fruitY + "px";
}



function dropFruit() {
  if (!gameRunning) return; // safety

  fruit.classList.remove("hidden");

  // 🔥 RANDOM FRUIT IMAGE HERE
  fruit.src = fruitImages[Math.floor(Math.random() * fruitImages.length)];

  fruitX = Math.random() * (gameArea.clientWidth - fruit.offsetWidth);
  fruitY = 0;

  fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      return;
    }

    fruitY += fruitSpeed;
    updateFruitPosition();

    // CATCH CHECK
    if (checkCatch()) {

      catchSound.currentTime = 0;
      catchSound.play();

      clearInterval(fall);
      updateScore();
      dropFruit();
      return;
    }

    // MISS CHECK
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
// dropFruit();



function updateScore() {
  score++;
  scoreDisplay.innerText = "Score: " + score;


   if (score > best) {
    best = score;
    bestDisplay.innerText = "Best: " + best;
    localStorage.setItem("bestScore", best);
  }
}





function checkCatch() {
  const basketRect = basket.getBoundingClientRect();
  const fruitRect = fruit.getBoundingClientRect();

  const verticalMatch = fruitRect.bottom >= basketRect.top;
  const horizontalMatch =
    fruitRect.left < basketRect.right &&
    fruitRect.right > basketRect.left;

  return verticalMatch && horizontalMatch;
}



//miss score update function

function updateMiss() {
  misses++;
  missDisplay.innerText = "Miss: " + misses;


}



function gameOver() {

  
if (score > best) {
  best = score;
  bestDisplay.innerText = "Best: " + best;
}

  overSound.currentTime=0;
  overSound.play();

  gameRunning = false;
  // fruit ko hide kar do
  fruit.classList.add("hidden");


  clearInterval(fall);
  // Restart button dikhado
  restartBtn.classList.remove("hidden");
}



//start game function
function startGame() {
  score = 0;
  misses = 0;
  gameRunning = true;

  scoreDisplay.innerText = "Score: 0";
  missDisplay.innerText = "Miss: 0";

  startBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  dropFruit();   // game start
}

//restart game function

function restartGame() {
  score = 0;
  misses = 0;
gameRunning = true;


  scoreDisplay.innerText = "Score: 0";
  missDisplay.innerText = "Miss: 0";

  restartBtn.classList.add("hidden");

  dropFruit();   // new game start
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);











