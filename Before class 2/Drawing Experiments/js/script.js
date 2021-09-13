/**
Drawing an Alien with p5!
Alex Henri
*/

"use strict";


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  // Let's set the BG color to an orangey-yellow
  createCanvas(1000,1000);
  background(255, 220, 43);

  //Now, let's draw my alien's body. I want a circular head
  let bodyColor = color(98, 162, 204);
  fill(bodyColor);
  noStroke();
  circle(500,500,500);

  // Now, maybe an eye? ....or eyes???
  let eyeColor = color(250, 251, 252);
  let pupilColor = color(28, 30, 31);

  // Eye object
  fill(eyeColor);
  circle(400,400,120);
  fill(pupilColor);
  ellipse(365,400,40,55);

  //Now, let's make some tentacles!
  fill(bodyColor);
  arc(350,620,90,500,0,PI);
  arc(450,650,90,500,0,PI);
  arc(550,650,90,500,0,PI);
  arc(650,620,90,500,0,PI);




}


/**
Description of draw()
*/
function draw() {

}
