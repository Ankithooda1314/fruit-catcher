// collision.js

function checkCatch() {
  const basketRect = basket.getBoundingClientRect();
  const fruitRect = fruit.getBoundingClientRect();

  const verticalMatch = fruitRect.bottom >= basketRect.top;
  const horizontalMatch =
    fruitRect.left < basketRect.right &&
    fruitRect.right > basketRect.left;

  return verticalMatch && horizontalMatch;
}

