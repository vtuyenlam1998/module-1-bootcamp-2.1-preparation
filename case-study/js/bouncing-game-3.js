const canvas=document.getElementById("myCanvas");
const ctx= canvas.getContext("2d");
let x=canvas.width/2;
let y=canvas.height-30;
let dx=2;
let dy=-2;
const ballRadius=10;
const paddleHeight= 10;
const paddleWidth= 75;
let paddleX= (canvas.width-paddleWidth) /2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score=0;
let lives=3;
const bricks= [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x:0, y:0,status:1};
    }
}

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);
function drawLife() {
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText(`Lives: ${lives}`,canvas.width-65,20);
}
function drawScore() {
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText(`Score: ${score}`,8,20);
}
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score === brickRowCount*brickColumnCount) {
                            alert("YOU WIN,CONGRATULATION!");
                            document.location.reload();// cần cho chrome để end game,hàm kết thúc setInterval.
                        }
                }
            }
        }
    }
}
function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed=true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed=true;
    }
}
//đa số trình duyệt sử dụng ArrowRight/Left chỉ hướng trỏ của phím.
// sử dụng Right/Left cho IE/Edge
function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed=false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed=false;
    }
}
//Hàm trả giá trị true,false khi nhấn hoặc thả chuột,phím.
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft; //offsetLeft định nghĩa khoảng cách lề trái màn hình tới cạnh trái canvas
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,2*Math.PI,true);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    // let ball= new Ball(x,y, ballRadian)
    // let paddle= new Paddle(paddleWidth,200)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLife();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // khi va chạm thì vận tốc sẽ đi ngược lại thành âm hoặc dương giá trị;
    // x là chạm vào trái phải, y là chạm vào trên dưới.
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) { // nếu x > tọa độ trái của thanh và nhỏ hơn tọa độ phải của thanh
            if ((y = y - paddleHeight)) {
                dy = -dy;
            }
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
            //Math.min trả về giá trị nhỏ nhất được nhập nghĩa là số lớn hơn giá trị được nhập sẽ trả về giá trị được nhập
            // Math.max trả về giá trị lớn nhất được nhập, nghĩa là số nhỏ hơn giá trị được nhập sẽ trả về giá trị được nhập
            // Sử dụng để giới hạn di chuyển trong ô Canvas.
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
function startGame() {
    draw();
}

        // ctx.beginPath();
        // ctx.rect(140, 65, 215, 65);
        // ctx.fillStyle = "pink";
        // ctx.fill();
        // ctx.closePath();
        ctx.font = "28px Times New Roman";
        ctx.fillStyle = "pink";
        ctx.fillText(`START GAME`, 164, 107);
function collides(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
        }
    }
    return isCollision;
}

// check if context exist
if (canvas && canvas.getContext) {
    // list of rectangles to render
    var rects = [{x: 140, y: 65, w: 215, h: 65},
        {x: 140, y: 200, w: 215, h: 65}];
    // get context
    if (ctx) {

        for (var i = 0, len = rects.length; i < len; i++) {
            ctx.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
        }

    }

    // listener, using W3C style for example
    canvas.addEventListener('click', function(e) {
        console.log('click: ' + e.offsetX + '/' + e.offsetY);
        var rect = collides(rects, e.offsetX, e.offsetY);
        if (rect) {
            draw();
        }
    }, false);
}