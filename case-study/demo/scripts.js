let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const GAME_BOARD_WIDTH = 480,
      GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7,
      BALL_RADIAN = 30,
      DRAW_GAME_SPEED = 20;
const SCORE_INCREASING_SPEED = 1000;

let x = canvas.width / 2;
let y = canvas.height - BALL_RADIAN;
let dx = 1;
let dy = -1;
let score = 0;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 85;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;

let rightPressed = false;
let leftPressed = false;

let gameBoardRowCount = 3;
let gameBoardColumnCount = 5;
let gameBoardCells = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - PADDLE_WIDTH / 2;
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawPlayerName() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Player: " + "Dao CG", canvas.width - 115, 20);
}
function increaseScore() {
  score++;
}

function drawGame() {
  let ball = new Ball(x, y, BALL_RADIAN, DRAW_GAME_SPEED);
  let paddle = new Paddle(PADDLE_WIDTH, 200);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.drawBall();
  ball.move();
  ball.changeDirection();

  paddle.drawPaddle(paddleX, PADDLE_WIDTH);
  paddle.move();

  drawScore();
  drawPlayerName();
}

let GameBoard = function (width, height) {
  this.width = width;
  this.height = height;

  this.drawGameBoard = function (canvas) {
    canvas.setAttribute("width", this.width);
    canvas.setAttribute("height", this.height);
    x = canvas.width / 2;
    y = canvas.height - BALL_RADIAN;

    for (let c = 0; c < gameBoardColumnCount; c++) {
      gameBoardCells[c] = [];
      for (let r = 0; r < gameBoardRowCount; r++) {
        gameBoardCells[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  };

  this.handleCollision = function () {
    for (let c = 0; c < gameBoardColumnCount; c++) {
      for (let r = 0; r < gameBoardRowCount; r++) {
        const b = gameBoardCells[c][r];
        if (b.status == 1) {
          if (y < b.y) {
            dy = -dy;
            b.status = 0;
          }
        }
      }
    }
  };
};
let Ball = function () {
  this.xCoordinate = x;
  this.yCoordinate = y;
  this.ballRadian = BALL_RADIAN;
  this.ballSpeed = DRAW_GAME_SPEED;

  this.move = function () {
    x += dx;
    y += dy;
  };

  this.changeDirection = function () {
    if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
      dx = -dx;
    }
    if (y + dy < BALL_RADIUS) {
      dy = -dy;
    } else if (y + dy > canvas.height - BALL_RADIUS) {
      if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
        if ((y = y - PADDLE_HEIGHT)) {
          dy = -dy;
        }
      } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(gameInterval);
      }
    }
  };

  this.drawBall = function () {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#7c7c7c";
    ctx.fill();
    ctx.closePath();
  };
};
let Paddle = function (width, xCoordinate) {
  this.width = width;
  this.height = PADDLE_HEIGHT;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = canvas.height - PADDLE_HEIGHT;

  this.move = function () {
    if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
      this.moveRight();
    } else if (leftPressed && paddleX > 0) {
      this.moveLeft();
    }
  };

  this.moveLeft = function () {
    paddleX -= 7;
  };

  this.moveRight = function () {
    paddleX += 7;
  };

  this.drawPaddle = function () {
    ctx.beginPath();
    ctx.rect(paddleX, this.yCoordinate, this.width, this.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  };
};

let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
gameBoard.handleCollision();

const gameInterval = setInterval(drawGame, DRAW_GAME_SPEED);
score = setInterval(increaseScore, SCORE_INCREASING_SPEED);
