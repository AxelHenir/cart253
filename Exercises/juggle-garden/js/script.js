"use strict";

let gravityForce = 0.002;
let state = "title"; // title, sim, won, lost.
let points = 0;
let scoreStarter;

let paddle;
let score;
let balls = [];
let golds =[];
let numBalls = 5;
let juggles=0;

function setup() {
  createCanvas(windowHeight,windowHeight);
  paddle = new Paddle(280,25);
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

function title(){ // Title Screen
  background (255);
  push(); // Display the score.
  fill(0);
  textSize(30);
  textAlign(CENTER,CENTER);
  text("Welcome! \n\nControls: \nMoving mouse: Moves paddle \nLeft-Clicking mouse: Spawns new ball \n \n Use your paddle to juggle the balls. \nCollect 10 gold coins to win! Your score is the time it takes. \nDon't drop all your balls! \n\nLeft-Click to begin!", width*0.5,height*0.3);
  pop();
}

function sim(){ // Steps for sim
  background(0);

  for(let i=0;i<golds.length;i++){ // Handle golds
    let gold = golds[i];
    for(let j=0; j<balls.length;j++){
      if(gold.collect(balls[j])){ // Check if the balls are on top of gold.
        points++;
      }
    }
    gold.display(); // Draw all golds
  }

  paddle.move(); // Move the paddle in memory.
  paddle.checkBounds();

  for (let i = 0; i < balls.length; i++) { // For each ball,
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce); // Apply gravity to the balls.
      ball.move(); // Move the balls in memory.
      if(ball.bounce(paddle)){ // Check if we bounced a ball.
        //console.log("Juggled! ",juggles);
        for(let j=0;j<golds.length;j++){
          let gold = golds[j];
          gold.phaseUp();
          }
          juggles++;
          if(juggles%5==0){
            let gold=new Gold;
            golds.push(gold);
          }
        }

      ball.display(); // Draw all the balls.
    }
  }

  paddle.display(); // Display the paddle.

if(points>=10){ // Check if user has won.
  score = ((millis()-scoreStarter)/1000).toFixed(2);
  state = "won";
}
else { // Check if the user has lost.
  let allDropped=true;
  for(let i =0;i<balls.length; i++){
    if(balls[i].active){
      allDropped=false;
      break;
    }
  }
  if(allDropped){
    state="lost";
  }
}



push(); // Display the score.
fill(255);
textSize(30);
textAlign(CENTER,CENTER);
score = ((millis()-scoreStarter)/1000).toFixed(2);
text("Score: "+score, width*0.5,height*0.1);
pop();

push(); // Display Balls remaining.
fill(255,50,50);
stroke(0);
ellipse(width*0.13,height*0.1,50,50);
fill(255);
textSize(30);
textAlign(CENTER,CENTER);
text("in reserve: "+numBalls, width*0.25,height*0.1);
pop();

push(); // Display Coins collected.
fill(255, 210, 46);
stroke(0);
ellipse(width*0.71,height*0.1,50,50);
fill(255);
textSize(30);
textAlign(CENTER,CENTER);
text(points+" / 10 ", width*0.8,height*0.1);
pop();


}

function lost(){ // User dropped all the balls and has lost.
  background(0);
  push(); // Display the score.
  fill(255);
  textSize(30);
  textAlign(CENTER,CENTER);
  text("You lost! \n\n You got "+points+" out of 10. \n\n Left-Click to retry.", width*0.5,height*0.3);
  pop();
}

function won(){ // User collected 10 gold and has won.
  background(0);
  push(); // Display the score.
  fill(255);
  textSize(30);
  textAlign(CENTER,CENTER);
  text("You won! \n\n Your score is: "+score+"\n\n Left-Click to play again.", width*0.5,height*0.3);
  pop();
}

function rebootSim(){ // Reboots the sim.

  points = 0;
  balls = [];
  golds =[];
  numBalls = 5;
  juggles=0;
  scoreStarter=millis();
  score=0;

  let ball = new Ball(width*0.5,height*0.5); // Create first ball
  balls.push(ball);

  let gold=new Gold; // Create first Gold
  golds.push(gold);

}

function mousePressed(){ // Handles mouse click for various states
  let ball,gold;
  console.log("You tried");
  switch(state){

    case "title": // Click on title screen = start sim
      state="sim";
      rebootSim();
      break;

    case "sim": // Click while in sim = spawn new ball
      if(numBalls>=1){
        ball = new Ball(width*0.5,height*0.5);
        balls.push(ball);
        numBalls--;
      }
      break;

    case "won": // Click while on win screen = restart
      state="title";
      break;

    case "lost": // Click while on loss screen = restart

      state="title";
      break;
  }
}
