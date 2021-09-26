// Alex Henri
/*
Exercise 4: Dodge-Em ===========================================================

My program will utilize the activity 4 code: COVID19 as its basis.

Here is the  list of applied changes:
-Made difficulty parameter to control difficulty and scaling for COVID19
-position is now controlled by WASD.


to do:

-left click = dash for immunity on cooldown
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
let difficulty = {cSpeed:1, cSize:1, growthRate:1};
let user = {x:400,y:400,size:100,fill:255,vx:5,vy:5,hp:100,sh:100,dash:0};
let covidHold = new Array();
let spawnNewCovid = true;
let dashStacks = 3;
let DASH_LAG_MASTER = 250;
let dashLag  = 0;

function covid19(){
  this.x=0;
  this.y=0;
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

if(spawnNewCovid){
  covidHold.push(new covid19());
  spawnNewCovid=false;
}
else{

}

for (var i=0; i<covidHold.length; i++){ // For each active covid,
  covidHold[i].x =+covidHold[i].vx; // Move them,
  covidHold[i].y =+covidHold[i].vy;

  if (covidHold[i].x > windowWidth){ // Respawn them,
    covidHold[i].x = 0;
    covidHold[i].y = random(0,windowHeight);
  }

  fill(covidHold[i].fill.r,covidHold[i].fill.g,covidHold[i].fill.b); // Find their color,

  ellipse(covidHold[i].x,covidHold[i].y,covidHold[i].size); // Draw them,

  let d = dist(covidHold[i].x,covidHold[i].y,user.x,user.y); // Check for death,
  if (d < (covidHold[i].size/2 + user.size/2)){
    noLoop();
  }

}

  if(keyIsDown(87)){ // W - Up
    user.y-=user.vy;
  }
  if(keyIsDown(65)){ // A - Left
    user.x-=user.vy;
  }
  if(keyIsDown(83)){ // S - Down
    user.y+=user.vy;
  }
  if(keyIsDown(68)){ // D - Right
    user.x+=user.vy;
  }
  if(keyIsDown(32)){ // Space - Dash
      console.log("I dahsed.");
    if(dashStacks!=0){
      dashStacks--;
    }
    if (dashLag==0){
      let dashLag = DASH_LAG_MASTER;
    }
  }
  constrain(user.x,0,windowWidth); // Constrain user to window.
  constrain(user.y,0,windowHeight);

  fill(user.fill);
  ellipse(user.x,user.y,user.size); // Draw user.

  if(mouseIsPressed){ // Shield
    
    fill(52, 235, 232);
    ellipse(user.x,user.y,user.size*1.25);
  }


}
