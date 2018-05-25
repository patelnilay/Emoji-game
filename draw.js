// Declare Variables
let drain_img;
let bear_img;
let mouse_img;
let tiger;
let mouse;
let drain;
let player1;
let player2;
let player3;
let othersprite;
let playerGroup;
let endNextFrame;
let gameState;
var countFrames = 0;

//loading in all images for sprites
function preload(){
  drain_img = loadImage("assets/drain.png");
  bear_img = loadImage("assets/bear.png");
  tiger_img = loadImage("assets/tiger.png");
  mouse_img = loadImage("assets/mouse.png");
}

//creates players function and make a player group
function createPlayer(sprite){
  player = createSprite()
  player.addImage(sprite)
  playerGroup.add(player)
  return player
}

//allows players to move, assigned to arrows keys, [W.A.S.D] keys and [O,K,L,;] keys
function move(){
  let speed = 0.3
  let maxSpeed = 4
  if (keyIsDown(LEFT_ARROW)) {
    player1.addSpeed(speed, 180);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player1.addSpeed(speed, 0);

  }

  if (keyIsDown(UP_ARROW)) {
    player1.addSpeed(speed, 270);

  }

  if (keyIsDown(DOWN_ARROW)) {
    player1.addSpeed(speed, 90);

  }
  if (keyIsDown(65)) {
    player2.addSpeed(speed, 180);

  }

  if (keyIsDown(68)) {
    player2.addSpeed(speed, 0);

  }

  if (keyIsDown(87)) {
    player2.addSpeed(speed, 270);

  }

  if (keyIsDown(83)) {
    player2.addSpeed(speed, 90);

  }

  if (keyIsDown(75)) {
    player3.addSpeed(speed, 180);

  }

  if (keyIsDown(186)) {
    player3.addSpeed(speed, 0);

  }

  if (keyIsDown(79)) {
    player3.addSpeed(speed, 270);

  }

  if (keyIsDown(76)) {
      player3.addSpeed(speed, 90);
    }
}

//collision detection for wall boundaries
function canvasCollisionDetection(sprite){
  if (sprite.position.x < 0) { //off left of window
    sprite.position.x = canvas.width;
  }
  if (sprite.position.x > canvas.width) { //off right of window
    sprite.position.x = 0;
  }
  if (sprite.position.y < 0) { //off top of window
    sprite.position.y = canvas.height;
  }
  if (sprite.position.y > canvas.height) { //off bottom of window
    sprite.position.y = 0;
  }
}

//checks for win (win condition)
function winCondition(sprite){
  if (playerGroup.length == 1) {
    endNextFrame = 1
  }
}

//collision against drain
function drainCollision(sprite){
  sprite.remove()
  winCondition()
}

function drainBigger(){
  countFrames += 1
  if (countFrames == 360){
    console.log("BIG")
    drain.scale += 0.5
    countFrames = 0
  }

}

//setup
function setup() {
  canvas = createCanvas((window.innerWidth/1.5), (window.innerHeight/1.5 ));
  playerGroup = new Group();
  gameState = 1
  if (gameState == 1){
    alert("Press OK to start the game")
  }
  drain = createSprite(12,14);
  drain.setCollider("circle",0,0,50,50)
  drain.addImage(drain_img);
  drain.scale = 0.5
  drain.immovable = true;
  drain.position.x = (canvas.width/2);
  drain.position.y = (canvas.height/2);
  player1 = createPlayer(tiger_img)
  player1.scale = 0.5
  player1.position.x = 800
  player1.position.y = 110
  player1.friction = 0.035;
  player2 = createPlayer(bear_img)
  player2.scale = 0.5
  player2.position.x = 800
  player2.position.y = 350
  player2.friction = 0.035;
  player3 = createPlayer(mouse_img)
  player3.scale = 0.5
  player3.position.x = 120
  player3.position.y = 140
  player3.friction = 0.02;

}

//draw
function draw() {
  background(66, 66, 66);
  //drainBigger()

  drain.scale += millis() / 10000000;

  if (endNextFrame == 1){
    alert("Winner!!!!!" )
    endNextFrame = 0
    gameState = 2
    if (gameState == 2){
    window.location.reload(true)

  }
}
  playerGroup.bounce(playerGroup);
  playerGroup.overlap(drain, drainCollision)
  move()
  canvasCollisionDetection(player1)
  canvasCollisionDetection(player2)
  canvasCollisionDetection(player3)

  player1.attractionPoint(0.06,canvas.width/2,canvas.height/2)
  player2.attractionPoint(0.06,canvas.width/2,canvas.height/2)
  player3.attractionPoint(0.06,canvas.width/2,canvas.height/2)

  if (gameState != 2){
    winCondition()}
  drawSprites();
}
