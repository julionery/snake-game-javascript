let buttom = document.getElementById("pause");
let start = document.getElementById("start");
let total = document.getElementById("total");
let max = document.getElementById("max");
let gameover = document.getElementById("gameover");
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let score = 0;
let ranking = 0;
snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let direction = "right";

let food = {
  x: Math.floor(Math.random() * 15 +1) * box, 
  y: Math.floor(Math.random() * 15 +1) * box
}

function criarBG(){
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
  for(i=0; i < snake.length; i++){
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood(){
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) {
  if(event.keyCode === 37 && direction != "right") direction = "left";
  if(event.keyCode === 38 && direction != "down") direction = "up";
  if(event.keyCode === 39 && direction != "left") direction = "right";
  if(event.keyCode === 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
  if(snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if(snake[0].x < 0 * box && direction === "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if(snake[0].y < 0 * box && direction === "up") snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++){
    if( snake[0].x === snake[i].x && snake[0].y === snake[i].y ){
      if(score > ranking)
      {
        ranking = score;
        max.innerHTML = "Score: " + ranking;
      } 
      gameover.style.display = "block";
      start.style.display = "block";
      buttom.style.display = "none";
      
      clearInterval(jogo);
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction === "right") snakeX += box;
  if(direction === "left") snakeX -= box;
  if(direction === "up") snakeY -= box;
  if(direction === "down") snakeY += box;

  if(snakeX != food.x || snakeY != food.y){
    snake.pop();
  }else{
    score ++
    total.innerHTML = "Total: " + score;
    food.x = Math.floor(Math.random() * 15 +1) * box;
    food.y = Math.floor(Math.random() * 15 +1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);

let pause = false;

function pausarJogo(){
  if(pause){
    buttom.innerHTML = "PAUSAR";
    pause = false;
    jogo = setInterval(iniciarJogo, 100);
  }else{
    buttom.innerHTML = "RETOMAR";
    pause = true;
    clearInterval(jogo);
  }
}

function newGame(){
  score = 0;
  buttom.style.display = "block";
  gameover.style.display = "none";
  start.style.display = "none";
  total.innerHTML = "Total: " + score;
  jogo = setInterval(iniciarJogo, 100);
  snake = [];
  snake[0] = {
    x: 8 * box,
    y: 8 * box
  }
}