function drawIt() {
  var x = 150;
  var y = 175;
  var dx = 6;
  var dy = 2;
  var ctx;
  var canvas;
  var width;
  var height;
  var interval;
  var paddlex;
  var paddleh;
  var paddlew;
  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = 800;
    height = 800;
    paddlex = width / 2;
    paddleh = 10;
    paddlew = 75;
    return (interval = setInterval(draw, 10)); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
  }
  function draw() {
    if (x + dx > width - 10 || x + dx < 5) dx = -dx;
    if (y + dy < 10) dy = -dy;
    if (y + dy > height - 10){
        if (x > paddlex && x < paddlex + paddlew){ 
          dy = -dy;
        }
        else{
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
  }
  init();
  function lose() {
    clearInterval(interval);
  }
}
