var x = 200;
var y = 400;
var dx = 4;
var dy = 4;
var bricksArray;
var timer;
var ctx;
var canvas;
var width;
var height;
var interval;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var bricks;
var nrows;
var ncols;
var brickwidth;
var brickheight;
var padding;
var canvasMinX;
var canvasMaxX;
var points = 0;
var lifeCount = document.getElementById("lives");
var totalScore = document.getElementById("score");
const blue_Brick = document.getElementById("blue");
const red_Brick = document.getElementById("red");
const red_Brick_hit = document.getElementById("red_hit");
const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
var brickxCoord = [];
var brickyCoord = [];
let play = 0;
let a = 5;
var lives = 3;
var side;
let brickCount = 25;

//pizderije porkerije
var left;
var right;
var top;
var bot;
var min;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  width = 800;
  height = 800;
  paddlex = width / 2;
  paddleh = 15;
  paddlew = 100;

  return (interval = setInterval(draw, 10)); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
}
//nastavljanje leve in desne tipke
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);

function init_mouse() {
  canvasMinX = $("canvas").offset().left + paddlew / 2;
  canvasMaxX = canvasMinX + width - paddlew;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}

function initbricks() {
  //inicializacija opek - polnjenje v tabelo
  nrows = 5;
  ncols = 5;
  brickwidth = 137;
  brickheight = 40;
  padding = 15.7;
  bricksArray = [
    [
      [1, 1, 1, 1, 1],
      [1, 1, 4, 1, 1],
      [1, 4, 4, 4, 1],
      [1, 1, 4, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    [
      [4, 1, 4, 1, 4],
      [1, 4, 1, 4, 1],
      [4, 1, 4, 1, 4],
      [1, 4, 1, 4, 1],
      [4, 1, 4, 1, 4],
    ],
    [
      [4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4],
    ],
    [
      [4, 4, 4, 4, 4],
      [1, 1, 1, 1, 1],
      [4, 4, 4, 4, 4],
      [1, 1, 1, 1, 1],
      [4, 4, 4, 4, 4],
    ],
    [
      [1, 1, 4, 1, 1],
      [1, 4, 1, 4, 1],
      [4, 1, 1, 1, 4],
      [1, 4, 1, 4, 1],
      [1, 1, 4, 1, 1],
    ],
    [
      [1, 1, 4, 1, 1],
      [1, 1, 4, 1, 1],
      [4, 4, 4, 4, 4],
      [1, 1, 4, 1, 1],
      [1, 1, 4, 1, 1],
    ],
    [
      [4, 1, 1, 1, 4],
      [1, 4, 1, 4, 1],
      [1, 1, 4, 1, 1],
      [1, 4, 1, 4, 1],
      [4, 1, 1, 1, 4],
    ],
  ];
  let brickSelect = Math.floor(Math.random() * 7);
  bricks = bricksArray[brickSelect];
  //bricks = new Array(nrows);
  /*for (i = 0; i < nrows; i++) {
    bricks[i] = Array(ncols);
    for (j = 0; j < ncols; j++) {
      if (i==1) {
        if(j==)
        bricks[i][j] = 4;
      } else {
        bricks[i][j] = 1;
      }
    }
  }*/
}

function draw() {
  //premik ploščice levo in desno
  if (paddlex < width && paddlex > 0) {
    if (rightDown && paddlex + paddlew < width) paddlex += 5;
    else if (leftDown && paddlex > 0) paddlex -= 5;
  } else {
    if (rightDown && paddlex + paddlew < width) paddlex += 5;
    else if (leftDown && paddlex > 0) paddlex -= 5;
  }

  //odboji
  if (x + dx > width - 10 || x + dx < 5) {
    dx = -dx;
    bounceSound.play();
  }
  if (y + dy < 10) {
    dy = -dy;
    bounceSound.play();
  }
  if (y + dy > height - 15) {
    //ce bo vouk pustu
    if (x > paddlex - 10 && x < paddlex + paddlew + 10) {
      // Calculate the angle of incidence between the ball and the paddle
      let relativeIntersectX = x - (paddlex + paddlew / 2);
      let normalizedRelativeIntersectX = relativeIntersectX / (paddlew / 2);
      let bounceAngle = (normalizedRelativeIntersectX * Math.PI) / 3; // Change the angle of bounce here

      // Update the ball velocity based on the angle of incidence
      let speed = Math.sqrt(dx * dx + dy * dy);
      dx = speed * Math.sin(bounceAngle);
      dy = -speed * Math.cos(bounceAngle);
      bounceSound.play();

      /* //different paddle bounces
        dx = 10 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;*/
    } else if (y + dy > height - 9) {
      if (lives > 1) {
        lives--;
        x = paddlex + paddlew / 2;
        y = height - 20;
        updateLives(lives);
        setTimeout(() => {
          pause();
        }, 250);
        pause();
        dx = 4;
        dy = -4;
      } else {
        lives--;
        updateLives(lives);
        lose();
      }
    }
  }

  ctx.clearRect(0, 0, height, width);
  ctx.beginPath();
  //ctx.rect(paddlex, height - paddleh, paddlew, paddleh);
  ctx.drawImage(paddle, paddlex, height - paddleh, paddlew, paddleh);

  ctx.drawImage(ball, x - 10, y - 10, 20, 20);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "red";
  x += dx;
  y += dy;

  brickyCoord = [];
  brickxCoord = [];
  for (i = 0; i < nrows; i++) {
    for (j = 0; j < ncols; j++) {
      var brickx = j * (brickwidth + padding) + padding;
      brickxCoord.push(brickx + 10);
      var bricky = i * (brickheight + padding) + padding;
      brickyCoord.push(bricky + 10);
    }
  }

  rowheight = brickheight + padding / 2; //Smo zadeli opeko?
  colwidth = brickwidth + padding / 2;
  row = Math.floor(y / rowheight);
  col = Math.floor(x / colwidth);
  //brick breaking
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      if (bricks[i][j] == 1) {
        // draw bricks
        ctx.drawImage(
          blue_Brick,
          brickxCoord[i * nrows + j],
          brickyCoord[i * nrows + j],
          137,
          40
        );
      } else if (bricks[i][j] == 4) {
        ctx.drawImage(
          red_Brick,
          brickxCoord[i * nrows + j],
          brickyCoord[i * nrows + j],
          137,
          40
        );
      } else if (bricks[i][j] == 3) {
        ctx.drawImage(
          red_Brick_hit,
          brickxCoord[i * nrows + j],
          brickyCoord[i * nrows + j],
          137,
          40
        );
      }
      if (
        x - 10 < brickxCoord[i * nrows + j] + brickwidth &&
        y - 10 < brickyCoord[i * nrows + j] + brickheight &&
        x + 10 > brickxCoord[i * nrows + j] &&
        y + 10 > brickyCoord[i * nrows + j]
      ) {
        if (bricks[i][j] == 1 || bricks[i][j] == 4 || bricks[i][j] == 3) {
          var obj = {
            bot: brickyCoord[i * nrows + j] + brickheight - y,
            top: y - brickyCoord[i * nrows + j],
            left: x - brickxCoord[i * nrows + j],
            right: brickxCoord[i * nrows + j] + brickwidth - x,
          };

          var smallest = "";
          for (var key in obj) {
            if (smallest !== "" && obj[key] < obj[smallest]) {
              smallest = key;
            } else if (smallest === "") {
              smallest = key;
            }
          }
          console.log(smallest);

          if (smallest == "bot") {
            dy = -dy;
            bricks[i][j] -= 1;
            updateScore(bricks[i][j]);
          } else if (smallest == "top") {
            dy = -dy;
            bricks[i][j] -= 1;
            updateScore(bricks[i][j]);
          } else if (smallest == "left") {
            dx = -dx;
            bricks[i][j] -= 1;
            updateScore(bricks[i][j]);
          } else if (smallest == "right") {
            dx = -dx;
            bricks[i][j] -= 1;
            updateScore(bricks[i][j]);
          }
          /*
        a = Math.floor(x);
        if (
          a - 10 == brickxCoord[i * nrows + j] + brickwidth ||
          a + 10 == brickxCoord[i * nrows + j]
        ) {
          if (bricks[i][j] == 1) {
            dx = -dx;
            bricks[i][j] = 2;
          }
        } else {
          if (bricks[i][j] == 1) {
            dy = -dy;
            bricks[i][j] = 2;
          }
        }*/
        }
      }
    }
  }
}

function pause() {
  if (play == 0) {
    clearInterval(interval);
    play = 1;
  } else {
    play = 0;
    init();
  }
}
function updateLives() {
  lifeCount.textContent = "Lives: " + lives;
}
function updateScore(brickId) {
  if (brickId == 2 || brickId == 0) {
    points += 100;
    brickCount--;
    console.log(brickCount);
    brickBreakSound.play();
  } else if (brickId == 3) {
    brickHitSound.play();
  }
  if (brickCount == 0) {
    win();
  }
  totalScore.textContent = "Score: " + points;
}
init();
initbricks();
init_mouse();
function win() {
  clearInterval(interval);
  Swal.fire({
    title: "You won!",
    text: "Would you like to play again?",
    icon: "success",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    // If the user clicks "Yes", reset the page
    if (result.isConfirmed) {
      location.reload();
    }
  });
}
function lose() {
  clearInterval(interval);
  loseSound.play();
  Swal.fire({
    title: "Game over!",
    text: "You lost all your lives! Would you like to play again?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    // If the user clicks "Yes", reset the page
    if (result.isConfirmed) {
      location.reload();
    }
  });
}
