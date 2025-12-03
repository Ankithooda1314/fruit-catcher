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




let best = Number(localStorage.getItem("bestScore")) || 0;
const bestDisplay = document.getElementById("bestScore");
bestDisplay.innerText = "Best: " + best;


let gameRunning = false;
let fall = null;

let score = 0;
const scoreDisplay = document.getElementById("score");



let misses = 0;
const missDisplay = document.getElementById("misses");



let basketX = 150;       
const basketSpeed = 20;  


function updateBasketPosition() {
  basket.style.left = basketX + "px";
}

updateBasketPosition();


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

let fruitX = 100;   
let fruitY = 0;     
let fruitSpeed = 3; 


function updateFruitPosition() {
  fruit.style.left = fruitX + "px";
  fruit.style.top = fruitY + "px";
}



function dropFruit() {
  if (!gameRunning) return; 

  fruit.classList.remove("hidden");

 
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

   
    if (checkCatch()) {

      catchSound.currentTime = 0;
      catchSound.play();

      clearInterval(fall);
      updateScore();
      dropFruit();
      return;
    }

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
  
  fruit.classList.add("hidden");


  clearInterval(fall);
 
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











