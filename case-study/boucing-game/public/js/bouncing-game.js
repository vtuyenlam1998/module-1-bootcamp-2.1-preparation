let canvas =document.getElementById("myCanvas");
let ctx =canvas.getContext("2d");

let landscape=new Image();
let hit=new Audio();
let win=new Audio();
let lose=new Audio();
let wall=new Audio();
let fail=new Audio();

hit.src="./sound/Game-coin-collect.mp3";
wall.src='./sound/wall.mp3';
lose.src='./sound/Middle-aged-man-laugh-sinister.mp3';
win.src='./sound/Confused-crowd-panic-and-distress.mp3';
fail.src='./sound/Baby-farting.mp3';
landscape.src='./img/105346883_p0.png';

window.onload =function () {
    ctx.drawImage(landscape,400,50,920,700,0,0,920,700);
}

const gameBoardWidth= 920,
      gameBoardHeight= 700;
const ballRadius=15,
      ballRadian=30;

let x= canvas.width/2;
let y= canvas.height - ballRadian;
let dx= 7;
let dy = -7;
let score = 0;
let lives=3;

const paddleHeight = 17;
const paddleWidth = 120;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// const bricks = [];
let ball = [];
let paddle = [];
let bricks= [];
let img=document.getElementById("img-btn");
let gameInterval;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2 ;
    }
}
let GameBoard = function (width, height) {
    this.width = width;
    this.height = height;

    this.drawGameBoard = function (canvas) {
        canvas.setAttribute("width", this.width);
        canvas.setAttribute("height", this.height);
        x = canvas.width / 2;
        y = canvas.height - ballRadian;
    };
};
let gameBoard = new GameBoard(gameBoardWidth, gameBoardHeight);
gameBoard.drawGameBoard(canvas);
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawPlayerName() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Player: " + "Lâm đẹp trai", canvas.width - 150, 20);
}

function drawLife() {
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText(`Lives: ${lives}`,canvas.width- 495,20);
}

function startGame() {
    // document.location.reload();
    clearInterval(gameInterval); //clearInterval() hàm để xóa setInterval,tránh th nhấp startGame tăng tốc độ
    ball = [];
    paddle= [];
    bricks=[];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0,status:1 };
        }
    }
    img.style.display='none';
    gameInterval = setInterval(drawGame, 20);
}

function drawGame() {

    ball.push(new Ball(x, y, ballRadius, ballRadian));
    paddle.push(new Paddle(paddleWidth, paddleHeight, 200));
    let bricks=new Bricks(brickWidth,brickHeight,brickPadding,brickOffsetLeft,brickOffsetTop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(landscape,400,50,920,700,0,0,920,700);
    ball[0].drawBall();
    ball[0].move();
    ball[0].changeDirection();

    paddle[0].drawPaddle(paddleX, paddleWidth);
    paddle[0].move();

    bricks.drawBricks();
    bricks.collisionDetection();

    drawScore();
    drawPlayerName();
    drawLife();

    // requestAnimationFrame(drawGame);
}

function getRandomHex(){
    return Math.floor(Math.random()*255);
}
function getRandomColor() {
    let red=getRandomHex();
    let green=getRandomHex();
    let blue=getRandomHex();
    return "rgb(" +red+","+blue+","+green+")";}
let Ball = function () {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.ballRadius= ballRadius;
    this.ballRadian = ballRadian;

    this.move = function () {
        x += dx;
        y += dy;
    };

    this.changeDirection = function () {
        if (x + dx > canvas.width - this.ballRadius || x + dx < this.ballRadius) {
            dx = -dx;
            wall.play();
        }
        if (y + dy < this.ballRadius) {
            dy = -dy;
            wall.play();
        } else if (y + dy > canvas.height - this.ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                if ((y =y - paddleHeight)) {
                    dy = -dy;
                    wall.play();
                }
            } else {
                lives--;
                if(!lives) {
                // alert("GAME OVER");
                // document.location.reload();
                clearInterval(gameInterval);
                lose.play();
                ctx.font = "60px Ravie";
                ctx.fillText("GAME OVERRRR",150,350);
                // document.getElementById("img-btn").style.display="inline-block";
                // return window.clearInterval(gameInterval);
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - this.ballRadian;
                    dx = 7;
                    dy = -7;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    fail.play();
                    setTimeout(function (){ document.querySelector("div").innerHTML=`Bạn vừa mất ${3-lives} mạng :)))))`},200);
                    setTimeout(function (){ document.querySelector("div").innerHTML=''},2000);
                }
            }
        }
    };

    this.drawBall = function () {
        let color = getRandomColor();
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2,false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };
};
let Paddle = function (paddleWidth, paddleHeight, xCoordinate) {
    this.width = paddleWidth;
    this.height = paddleHeight;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = canvas.height - this.height;

    this.move = function () {
        if (rightPressed && paddleX < canvas.width - this.width) {
            this.moveRight();
        } else if (leftPressed && paddleX > 0) {
            this.moveLeft();
        }
    };

    this.moveLeft = function () {
        paddleX -= 15;
    };

    this.moveRight = function () {
        paddleX += 15;
    };

    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    };
};
let Bricks =function (brickWidth,brickHeight,brickPadding,brickOffsetLeft,brickOffsetTop) {
    this.brickWidth=brickWidth;
    this.brickHeight=brickHeight;
    this.brickPadding=brickPadding;
    this.brickOffsetTop=brickOffsetTop;
    this.brickOffsetLeft=brickOffsetLeft;
    this.drawBricks = function () {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                    const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    let grd = ctx.createLinearGradient(0,0,850,0);
                    grd.addColorStop(0,"pink");
                    grd.addColorStop(1,"violet");
                    ctx.fillStyle = grd;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    };
    this.collisionDetection = function () {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    if (x > b.x &&
                        x < b.x + this.brickWidth &&
                        y > b.y &&
                        y < b.y + this.brickHeight) {
                        dy = -dy;
                        hit.play();
                        b.status = 0;
                        score++;
                        if (score === brickRowCount * brickColumnCount) {
                            win.play();
                            alert("YOU WIN,CONGRATULATION!");
                            document.location.reload();// cần cho chrome để end game,hàm kết thúc setInterval.
                            clearInterval(gameInterval);
                        }
                    }
                }
            }
        }
    }
}

