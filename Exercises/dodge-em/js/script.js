// Alex Henri
/*
Exercise 4: Dodge-Em

My program will utilize the activity 4 code: COVID19 as its basis.
I have made the following additions:
I have improved onthe following functions:

to do:
-
*/

"use strict";

let covid19 = {x:0,y:250,size:100,vx:0,vy:0,speed:5,fill:{r:255,g:0,b:0}};
let user = {size:100,fill:255};
let staticAmount = 1000;

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

  covid19.x += covid19.vx;
  covid19.y += covid19.vy;
  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);

  ellipse(covid19.x,covid19.y,covid19.size); // Draw Covid19

  user.x=mouseX;
  user.y=mouseY;
  fill(user.fill);

  ellipse(user.x,user.y,user.size); // Draw user

  let d = dist(covid19.x,covid19.y,user.x,user.y);
  if (d < (covid19.size/2 + user.size/2)){
    noLoop();
  }



  if (covid19.x > windowWidth){
    covid19.x = 0;
    covid19.y = random(0,windowHeight);

  }

}
