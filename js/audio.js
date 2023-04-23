soundManager.setup({
  preferFlash: false,
  onready: function () {
    brickHitSound = soundManager.createSound({
      id: "brickHitSound",
      url: "audio/hit.mp3",
      autoLoad: true,
      autoPlay: false,
      volume: 20,
    });
    loseSound = soundManager.createSound({
      id: "loseSound",
      url: "audio/lose.mp3",
      autoLoad: true,
      autoPlay: false,
      volume: 10,
    });
    brickBreakSound = soundManager.createSound({
      id: "brickBreakSound",
      url: "audio/break.mp3",
      autoLoad: true,
      autoPlay: false,
      volume: 10,
    });
    bounceSound = soundManager.createSound({
      id: "bounceSound",
      url: "audio/bounce.mp3",
      autoLoad: true,
      autoPlay: false,
      volume: 25,
    });
  },
});
let loseSound = {};
let backAudio = {};
let bounceSound = {};
let brickBreakSound = {};
