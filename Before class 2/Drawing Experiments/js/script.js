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

  // Declare a few colors I wanna use for my alien
  let eyeColor = color(250, 251, 252);
  let pupilColor = color(28, 30, 31);
  let bodyColor = color(98, 162, 204);
  let bodyColorDark = color(74, 125, 158);

  // For now, I want to draw simple shapes with no stroke. So...
  noStroke();

  //Now, let's draw my alien's body. I want a circular head
  fill(bodyColorDark);
  circle(500,500,500); // Shadow body

  arc(410,630,90,475,0,PI); // Left hind tentacle
  arc(575,645,90,500,0,PI); // Right hind tentacle

  fill(bodyColor);
  ellipse(485,485,480,495); // Foreground body

  // Here's how I will draw my eyes. I think I wanna try to make this a class so I can paste complete eyeballs where I want.
  let eye1 = new Eyeball(300, 300);

  //Now, let's make some tentacles!
  fill(bodyColor);
  arc(315,570,90,580,0,PI); //Leftmost
  arc(500,620,90,500,0,PI); //central
  arc(665,560,90,650,0,PI); //rightmost




}


/**
Description of draw()
*/
function draw() {

}
