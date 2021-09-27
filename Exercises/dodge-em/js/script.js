// Alex Henri
/*
Exercise 4: Dodge-Em ===========================================================

My program will utilize the activity 4 code: COVID19 as its basis.

Here is the  list of applied changes:
-Made difficulty parameter to control difficulty and scaling for COVID19
-position is now controlled by WASD.
-left click = dash on cooldown


to do:

-hold right click = shield + slowed movement
-show boost and shield cooldowns
-Covid19 can spawn at an angle
-Covid19 can respawn with new size, speed, angle
-display score upon death
-explain that you died upon death
-covid19 has a sprite (virus)
-user has a sprite (medic)

*/

"use strict";

//let covid19 = {x:0,y:250,size:100,vx:0,vy:0,speed:5,fill:{r:255,g:0,b:0}};
let staticAmount = 0;
let difficulty = {cSpeed:1, cSize:1, rate:5000};
let USER_SPEED_DEFAULT = 5;
let user = {x:400,y:400,size:100,fill:255,speed:USER_SPEED_DEFAULT,hp:100,sh:100,dash:0};
let covidHold = new Array();
let spawnNewCovid = 0;
let dashStacks = 3;
let DASH_LAG_MASTER = 500;
let dashLag  = 0;
let dashStackMAX = 3;
let refreshDash=0;
let DASH_COOLDOWN = 5000;
let dashIsRefreshing = false;
let rectWidth = 0;
let dashIssued=0;

function covid19(x,y){
  this.x=7000;
  this.y=7000;
  this.size=100;
  this.vx=0;
  this.vy=0;
  this.speed=5;
  this.fill={r:255,g:0,b:0};
}

function preload(){}

function setup() {
  createCanvas(windowWidth,windowHeight);
  covid19.y = random(0,windowHeight);
  covid19.vx = covid19.speed;
}

function draw() {

  background(0);

  for(var i =0; i<staticAmount; i++){ // Drawing Static
    let x=random(0,windowWidth);
    let y=random(0,windowHeight);
    stroke(255);
    point(x,y);
  }
  noStroke();

if (spawnNewCovid <= millis()){
  covidHold.push(new covid19());
  spawnNewCovid = millis()+difficulty.rate;
}

for (var i=0; i<covidHold.length; i++){ // For each active covid, ==============
  covidHold[i].x +=covidHold[i].vx; // Move them,
  covidHold[i].y +=covidHold[i].vy;

  if (covidHold[i].x > windowWidth){ // Respawn them if needed,
    covidHold[i].x = 0;
    covidHold[i].y = random(0,windowHeight);
    covidHold[i].vx = random(difficulty.cSpeed+2,difficulty.cSpeed+6);
    covidHold[i].vy = random((difficulty.cSpeed*-1)-4,difficulty.cSpeed+4);
  }

  if (covidHold[i].y > windowHeight){
    covidHold[i].vy *= -1;
    constrain(covidHold[i],0,windowHeight);
  }
  else if(covidHold[i].y < 0){
    covidHold[i].vy *= -1;
    constrain(covidHold[i],0,windowHeight);
  }

  fill(covidHold[i].fill.r,covidHold[i].fill.g,covidHold[i].fill.b); // Find their color,

  ellipse(covidHold[i].x,covidHold[i].y,covidHold[i].size); // Draw them,

  let d = dist(covidHold[i].x,covidHold[i].y,user.x,user.y); // Check for death,
  if (d < (covidHold[i].size/2 + user.size/2)){
    noLoop();
  }

} // ===========================================================================

  if(keyIsDown(87)){ // W - Up
    user.y-=user.speed;
  }
  if(keyIsDown(65)){ // A - Left
    user.x-=user.speed;
  }
  if(keyIsDown(83)){ // S - Down
    user.y+=user.speed;
  }
  if(keyIsDown(68)){ // D - Right
    user.x+=user.speed;
  }

  if(user.speed>USER_SPEED_DEFAULT){ // User Speed governance
    user.speed--;
  }
  else if (user.speed<USER_SPEED_DEFAULT) {
    user.speed--;
  }

  if(keyIsDown(32)){ // Space - Dash

    if (millis() >= dashLag){ // If it's been X seconds since last dash,
      if(dashStacks>=1){ // If the user has a stack of dash available,
        dashStacks--; // Consume a stack
        user.speed+=15; //Grant Speed Dash
        dashLag = millis()+DASH_LAG_MASTER; // Set dashLag
        if (!dashIsRefreshing){ // Sets dash refresh time
          refreshDash=millis()+DASH_COOLDOWN;
          dashIsRefreshing=true;
          dashIssued= millis();
        }

      }
    }
  }

  if(millis() >= refreshDash){ // Executes refreshDash flags
    if(dashStacks<dashStackMAX){ // If there's room for a stack,
      dashStacks++; // Add the stack
      if(dashStacks<=2){ // Can we set a dash refresh flag?
        refreshDash=millis()+DASH_COOLDOWN;
        dashIssued= millis();
      }
      dashIsRefreshing=true;
    }
    else{
      dashIsRefreshing=false;
    }
  }

  constrain(user.x,0,windowWidth); // Constrain user to window.
  constrain(user.y,0,windowHeight);

  fill(user.fill);
  ellipse(user.x,user.y,user.size); // Draw user.

  for(var i=0;i<dashStacks;i++){ // Showing stacks of dash
    ellipse(windowWidth/2 +(i*33),25,30);
  }

  if(millis()<refreshDash){ // Showing stack refreshing
    rectWidth=millis();
    rectWidth = map(rectWidth,dashIssued,refreshDash,windowWidth*0.05,windowWidth*0.24);
    constrain(rectWidth,0.05*windowWidth,0.24*windowWidth);
    rect(windowWidth*0.25, 10,rectWidth, 30);
  }


  if(mouseIsPressed){ // Shield

    fill(52, 235, 232);
    ellipse(user.x,user.y,user.size*1.25);
  }


}
