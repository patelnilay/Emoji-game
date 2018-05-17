var drain_img;  // Declare variable
var bear_img;
var mouse_img;
var tiger;
var mouse;
var drain;
var player1;
var player2;
var player3;
var othersprite;
let playerGroup;

//loading in all images for sprites
function preload(){
  drain_img = loadImage("assets/drain.png");
  bear_img = loadImage("assets/bear.png");
  tiger_img = loadImage("assets/tiger.png");
  mouse_img = loadImage("assets/mouse.png");
}

//creates players
function createPlayer(sprite){
  player = createSprite()
  player.addImage(sprite)
  playerGroup.add(player)
  return player
}

//allows players to move, assigned to arrows keys, [W.A.S.D] keys and [O,K,L,;] keys
function move(){
  let speed = 0.1
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

//collision against drain
function drainCollision(sprite){
  sprite.remove()
}

//setup
function setup() {
  canvas = createCanvas((window.innerWidth/1.5), (window.innerHeight/1.5 ));
  playerGroup = new Group();
  drain = createSprite(12,14);
  drain.addImage(drain_img);
  drain.scale = 0.5
  drain.immovable = true;
  drain.position.x = (canvas.width/2);
  drain.position.y = (canvas.height/2);
  player1 = createPlayer(tiger_img)
  player1.scale = 0.5
  player1.position.x = 600
  player1.position.y = 110
  player1.friction = 0.035;
  player2 = createPlayer(bear_img)
  player2.scale = 0.5
  player2.position.x = 120
  player2.position.y = 140
  player2.friction = 0.035;
  player3 = createPlayer(mouse_img)
  player3.scale = 0.5
  player3.position.x = 120
  player3.position.y = 140
  player3.friction = 0.02;

} // creates

//draw
function draw() {
  background(035);
  playerGroup.bounce(playerGroup);
  playerGroup.overlap(drain, drainCollision)
  move()
  canvasCollisionDetection(player1)
  canvasCollisionDetection(player2)
  canvasCollisionDetection(player3)

  player1.attractionPoint(0.01,canvas.width/2,canvas.height/2)
  player2.attractionPoint(0.01,canvas.width/2,canvas.height/2)
  player3.attractionPoint(0.01,canvas.width/2,canvas.height/2)
  drawSprites();
}