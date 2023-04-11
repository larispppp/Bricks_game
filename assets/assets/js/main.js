function drawIt() {
  var x = 150;
  var y = 175;
  var dx = 10;
  var dy = 50;
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
  var oblak =document.getElementById("cloud");

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = 800;
    height = 800;
    paddlex = width / 2;
    paddleh = 10;
    paddlew = 800;
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
    canvasMinX = $("canvas").offset().left;
    canvasMaxX = canvasMinX + width;
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
    brickwidth = 140;
    brickheight = 50;
    padding = 10;
    bricks = new Array(nrows);
    for (i = 0; i < nrows; i++) {
      bricks[i] = Array(ncols);
      for (j = 0; j < ncols; j++) {
        bricks[i][j] = 1;
      }
    }
  }

  function draw() {
    //premik ploščice levo in desno
    if (paddlex < 800 && paddlex > 0) {
      if (rightDown && paddlex + paddlew < width) paddlex += 5;
      else if (leftDown && paddlex > 0) paddlex -= 5;
    } else {
      if (rightDown && paddlex + paddlew < width) paddlex += 5;
      else if (leftDown && paddlex > 0) paddlex -= 5;
    }
    if (x + dx > width - 10 || x + dx < 5) dx = -dx;
    if (y + dy < 10) dy = -dy;
    if (y + dy > height - 10) {
      if (x > paddlex && x < paddlex + paddlew) {
        dy = -dy;
      } else {
        lose();
      }
    }

    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.rect(paddlex, height - paddleh, paddlew, paddleh);
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    x += dx;
    y += dy;

    // draw bricks
    for (i = 0; i < nrows; i++) {
      for (j = 0; j < ncols; j++) {
        if (bricks[i][j] == 1) {
          ctx.beginPath();
          var brickx = j * (brickwidth + padding) + padding;
          var bricky = i * (brickheight + padding) + padding;
          ctx.drawImage(oblak, brickx + padding, bricky + padding, brickwidth, brickheight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    rowheight = brickheight + padding / 2; //Smo zadeli opeko?
    colwidth = brickwidth + padding / 2;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (
      y < nrows * rowheight &&
      row >= 0 &&
      col >= 0 &&
      bricks[row][col] == 1
    ) {
      dy = -dy;
      bricks[row][col] = 0;
    }
  }

  init();
  initbricks();
  init_mouse();
  function lose() {
    clearInterval(interval);
  }
}
