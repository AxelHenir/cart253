// Alex Henri
/*
Exercise 4: Dodge-Em ===========================================================

My program will utilize the activity 4 code: COVID19 as its basis.

Here is the  list of applied changes:
-Made difficulty parameter to control difficulty and scaling for COVID19
-position is now controlled by WASD.
-left click = dash on cooldown
-hold right click = shield + slowed movement
-show boost and shield cooldowns
-Covid19 can spawn at an angle
-Covid19 can respawn with new size, speed, angle
-Difficulty scales

to do:


-display score upon death
-explain that you died upon death
-covid19 has a sprite (virus)
-user has a sprite (medic)

*/

"use strict";



function covid19(x, y) {
  this.x = 70000;
  this.y = 70000;
  this.size = BASE_COVID_SIZE;
  this.vx = 0;
  this.vy = 0;
  this.speed = 5;
  this.fill = {
    r: 255,
    g: 52,
    b: 179
}
}

let difficulty = {
  cSpeed: 1,
  cSize: 1,
  rate: 5000
};
let USER_SPEED_DEFAULT = 5;
let user = {
  x: 400,
  y: 400,
  size: 100,
  speed: USER_SPEED_DEFAULT,
  hp: 100,
  sh: 100,
  dash: 0
};
let covidHold = new Array();
let spawnNewCovid = 0;
let dashStacks = 3;
let DASH_LAG_MASTER = 500;
let dashLag = 0;
let dashStackMAX = 3;
let refreshDash = 0;
let DASH_COOLDOWN = 5000;
let BASE_COVID_SIZE = 100;
let dashIsRefreshing = false;
let rectWidth = 0;
let dashIssued = 0;
let UI_BOTTOM = 50;
let userIsShielding = false;
let DIFFICULTY_RATE = 15000;
let increaseDifficulty = 0;
let lastDamage = 0;
let USER_SHIELD_REGEN_DELAY = 4000;
let shieldRegenLag=0;
let death=false;
let goToStart=true;
let previousScore=0;

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() { // ===========================================================

  background(32, 17, 72); // Draw BG
  noStroke();
  rectMode(CORNER);
  fill(32, 17, 162);
  rect(0, 0, windowWidth, UI_BOTTOM); // Draw UI

// ===[1]=== User X and Y updated here =========================================

  if (keyIsDown(87)) { // W - Up
    user.y -= user.speed;
  }
  if (keyIsDown(65)) { // A - Left
    user.x -= user.speed;
  }
  if (keyIsDown(83)) { // S - Down
    user.y += user.speed;
  }
  if (keyIsDown(68)) { // D - Right
    user.x += user.speed;
  }
  user.x = constrain(user.x,0,windowWidth); // Constrain the user
  user.y = constrain(user.y,UI_BOTTOM+user.size/2,windowHeight);

// ===[2]=== COVID X and Y updated here ========================================

for (var i = 0; i < covidHold.length; i++) { // For each COVID,

  covidHold[i].x += covidHold[i].vx; // Move it,
  covidHold[i].y += covidHold[i].vy;

  covidHold[i].size = BASE_COVID_SIZE * difficulty.cSize; // Adjust size,

  if (covidHold[i].x > windowWidth) { // Respawn them if needed,
    covidHold[i].x = 0;
    covidHold[i].y = random(UI_BOTTOM+covidHold[i].size/2, windowHeight);
    covidHold[i].vx = random(difficulty.cSpeed + 2, difficulty.cSpeed + 6);
    covidHold[i].vy = random((difficulty.cSpeed * -1) - 4, difficulty.cSpeed + 4);
  }

  if (covidHold[i].y > windowHeight) { // Bounce them off the floor & ceiling
    covidHold[i].vy *= -1;
    constrain(covidHold[i], UI_BOTTOM+covidHold[i].size/2, windowHeight);
  } else if (covidHold[i].y < UI_BOTTOM+covidHold[i].size/2) {
    covidHold[i].vy *= -1;
    constrain(covidHold[i], UI_BOTTOM+covidHold[i].size/2, windowHeight);
  }

  fill(covidHold[i].fill.r, covidHold[i].fill.g, covidHold[i].fill.b); // Find their color,

  ellipse(covidHold[i].x, covidHold[i].y, covidHold[i].size); // Draw them,

  let d = dist(covidHold[i].x, covidHold[i].y, user.x, user.y);
  if (d < (covidHold[i].size / 2 + user.size / 2)) { // Check for collision,
    if (userIsShielding) { // If user is shielding
      if (user.sh >= 1) {
        user.sh--;
        user.speed--;
        lastDamage = millis();
      }
      else {
        if (user.hp >= 1) {
          user.hp--;
          user.speed--;
          lastDamage = millis();
        }
        else{
          death=true;
          noLoop(); // Death
        }
      }
    }
    else { // If user is NOT shielding
      if(user.hp >= 1){
        user.hp--;
        user.speed--;
        lastDamage = millis();
      }
      else{
        death=true;
        noLoop(); // Death
      }
    }
    constrain(user.sh, 0, 100); // Constrain Shield and HP
    constrain(user.hp, 0, 100);
  }
}

// ===[3]=== Draw the user and other elements ==================================

fill(85, 231, 255);
ellipse(user.x, user.y, user.size); // Draw user.

textSize(30); // Prints updated HP
fill(255, 52, 179);
text('HP: ' + user.hp, windowWidth * 0.05, 35);

fill(85, 231, 255); // Prints updated shield
text('SHIELD: ' + user.sh, windowWidth * 0.15, 35);

for (var i = 0; i < dashStacks; i++) { // prints stacks of dash
  ellipse(windowWidth / 2 + (i * 33), 25, 30);
}

if (millis() < refreshDash) { // Draw stack refreshing
  rectMode(CORNER);
  rectWidth = millis();
  rectWidth = map(rectWidth, dashIssued, refreshDash, windowWidth * 0.05, windowWidth * 0.24);
  constrain(rectWidth, 0.05 * windowWidth, 0.24 * windowWidth);
  rect(windowWidth * 0.25, 10, rectWidth, 30);
}

// ===[4]=== Govern the user ===================================================

if (user.speed > USER_SPEED_DEFAULT) { // User Speed governance
  user.speed--;
}
else if (user.speed < USER_SPEED_DEFAULT) {
  constrain(user.speed, 0, USER_SPEED_DEFAULT);
  user.speed++;
}

user.hp=constrain(user.hp,0,100);
user.sh=constrain(user.sh,0,100);

if (keyIsDown(32)) { // Space - Dash

  if (millis() >= dashLag) { // If it's been X seconds since last dash,
    if (dashStacks >= 1) { // If the user has a stack of dash available,
      dashStacks--; // Consume a stack
      user.speed += 15; //Grant Speed Dash
      dashLag = millis() + DASH_LAG_MASTER; // Set dashLag
      if (!dashIsRefreshing) { // Sets dash refresh time
        refreshDash = millis() + DASH_COOLDOWN;
        dashIsRefreshing = true;
        dashIssued = millis();
      }
    }
  }
}

if (mouseIsPressed) { // MouseLeft - Shield
  if(user.sh >= 1){
    fill(52, 235, 232,160);
    ellipse(user.x, user.y, user.size * 1.25);
    userIsShielding = true;
  }
}
else {
userIsShielding = false;
}

// ===[5]=== Game governance ===================================================

  if (spawnNewCovid <= millis()) { // Executes spawn covid flags
    covidHold.push(new covid19());
    spawnNewCovid = millis() + difficulty.rate;
  }

  if (increaseDifficulty <= millis()){ // Executes difficulty increase flags
    difficulty.cSize += 0.1;
    difficulty.cSpeed += 1;
    difficulty.rate -= 50;
    constrain(difficulty.rate,500,10000);
    increaseDifficulty = millis()+ DIFFICULTY_RATE; // Sets difficulty increase flags
  }

  if (millis() >= refreshDash) { // Executes refreshDash flags
    if (dashStacks < dashStackMAX) { // If there's room for a stack,
      dashStacks++; // Add the stack
      if (dashStacks <= 2) { // Can we set a dash refresh flag?
        refreshDash = millis() + DASH_COOLDOWN;
        dashIssued = millis();
      }
      dashIsRefreshing = true;
    }
    else {
    dashIsRefreshing = false;
    }
  }

  if((millis() - lastDamage)>= USER_SHIELD_REGEN_DELAY){
    if(shieldRegenLag <= millis()){
      user.sh++;
      user.sh=constrain(user.sh,0,100);
      shieldRegenLag = millis() + 100;
    }
  }

  if(death)
  {
    noLoop();
    userIsDead();
  }

  if(goToStart){
    rectMode(CENTER);
    fill(255,52,179);
    rect(windowWidth/2,windowHeight/2,0.7*windowWidth,0.4*windowHeight);
    fill(32, 17, 72);
    rect(windowWidth/2,windowHeight/2,0.7*windowWidth,0.4*windowHeight);
    fill(255,52,179);
    textAlign(CENTER);
    textSize(32);
    text('Welcome to NEON-CHRONICLE: [[TURBOPOLSA]] Genesis III, vol 9',windowWidth/2,windowHeight*0.4);
    textAlign(LEFT);
    text('CONTROLS \n WASD = Up, Left, Down, Right \n L (Hold down)= Shield \n K = Dash', windowWidth*0.20,windowHeight*0.5);
    textAlign(RIGHT);
    text('HOW TO PLAY \n Survive as long as you can \n against the unyielding waves of \n the cybervirus-CODE:19',windowWidth*0.8,windowHeight*0.5);
    textAlign(CENTER);
    text('PRESS R TO START',windowWidth/2,windowHeight*0.80);

    noLoop();
    goToStart=false;
  }
}



//==============================================================================
function userIsDead(){
  noLoop(); // Death.

  rectMode(CENTER);
  fill(255,52,179);
  rect(windowWidth/2,windowHeight/2,0.7*windowWidth,0.4*windowHeight);
  fill(32, 17, 72);
  rect(windowWidth/2,windowHeight/2,0.7*windowWidth,0.4*windowHeight);
  fill(255,52,179);
  textAlign(CENTER);
  textSize(32);
  text('SCORE: '+((millis()-previousScore)/1000).toFixed(1),windowWidth/2,windowHeight/2);
  text('PRESS R TO RESTART', windowWidth/2,0.6*windowHeight);
}

function keyPressed(){
  if (keyCode==82){
    reset();
  }
}
function reset(){

  for(var i =0; i<covidHold.length;i){ // Kill all old covids
    covidHold.pop();
  }

  difficulty.cSpeed=1; // Reset difficulty
  difficulty.cSize=1;
  difficulty.rate=5000;

  user.x = windowWidth/2; // Reset user parameters
  user.y = windowHeight/2;
  user.hp = 100;
  user.sh = 100;

  spawnNewCovid = 0;
  dashStacks = 3;
  dashLag = 0;
  dashStackMAX = 3;
  refreshDash = 0;
  dashIsRefreshing = false
  rectWidth = 0;
  dashIssued = 0;
  userIsShielding = false;
  increaseDifficulty = 0;
  lastDamage = 0;
  shieldRegenLag=0;
  death=false;
  previousScore=millis();

  loop();
}
