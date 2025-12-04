// state.js

// Game state
let gameRunning = false;
let fall = null;


let score = 0;
let misses = 0;

let best = Number(localStorage.getItem("bestScore")) || 0;
bestDisplay.innerText = "Best: " + best;


let basketX = 150;
const basketSpeed = 20;


let fruitX = 100;
let fruitY = 0;
let fruitSpeed = 3;
