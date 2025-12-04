// elements.js

const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const fruit = document.getElementById("fruit");

const scoreDisplay = document.getElementById("score");
const missDisplay = document.getElementById("misses");
const bestDisplay = document.getElementById("bestScore");

// Sounds
const catchSound = new Audio("assests/sounds/tap.wav");
const overSound = new Audio("assests/sounds/over.wav");
const missSound = new Audio("assests/sounds/miss.wav");

// Fruit images
const fruitImages = [
  "assests/Images/apple.png",
  "assests/Images/banana.png",
  "assests/Images/mango.png",
  "assests/Images/strawberrry.png"
];
