"use strict";

let gravityForce = 0.0025;
let state = "title"; // title, sim, won, lost.

let paddle;

let balls = [];
let numBalls = 10;

function setup() {
  createCanvas(windowWidth,windowHeight);

  paddle = new Paddle(300,20);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0,width);
    let y = random(-400,-100);
    let ball = new Ball(x,y);
    balls.push(ball);
  }
}

function draw() {
  switch(state){
    case "title":
      title();
      break;
    case "sim":
      sim();
      break;
    case "won":
      won();
      break;
    case "lost":
      lost();
      break;
  }
}

function sim(){
  background(0);
  paddle.move();
  paddle.display();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }
}

function mousePressed(){ // Spawn new ball.
  if(state=="sim"){
    let x = random(0,width);
    let y = random(-400,-100);
    let ball = new Ball(x,y);
    balls.push(ball);
  }
}

function lost(){ // User dropped all the balls and has lost.

}

function won(){ // User collected 10 gold and has won.
  
}
