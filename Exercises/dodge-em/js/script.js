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

let covid19 = {x:0,y:250,size:100,vx:0,vy:0,speed:5,fill:{r:255,g:0,b:0}};
let staticAmount = 0;
let difficulty = {cSpeed:1, cSize:1, growthRate:1};
let user = {x:0,y:0,size:100,fill:255,vx:5,vy:5};
let covidHold = new Array();

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
  noStroke(); // Printing Covid19 + User =======================================

covidHold.push(new covid19());
for (var i=0; i<covidHold.length; i++){ //Move Covid(s)
  covidHold[i].x =+covidHold[i].vx;
  covidHold[i].y =+covidHold[i].vy;
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

  constrain(user.x,0,windowWidth); // Constrain user to window.
  constrain(user.y,0,windowHeight);

  fill(user.fill);
  ellipse(user.x,user.y,user.size); // Draw user

  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);
  ellipse(covid19.x,covid19.y,covid19.size); // Draw Covid19

  let d = dist(covid19.x,covid19.y,user.x,user.y);
  if (d < (covid19.size/2 + user.size/2)){ // Death.

    noLoop();
  }

  if (covid19.x > windowWidth){ // Respawning mechanism
    covid19.x = 0;
    covid19.y = random(0,windowHeight);

  }

}
