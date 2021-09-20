/**
CART 253 Exercise 1: I like to move it
Alex Henri
*/

"use strict";


/**
Description of preload
*/
function preload() {

}
let square1 = {
  x: 0,
  y:250,
  size: 100,
  speed: 2,
  fill: 255,
  moving: true,
  terminal: 300,
}
let r = 0;
let TUNING =9;
let shapes = [1,2,3,4,5];
/**
Initial drawing in program
*/
function setup() {
  strokeWeight(5);
  createCanvas(750,750);
}


/**
draw() is called 60 times per second.

My draw function will have a chance to randomly generate a shape.
The shapes will travel from their spawn to a random point.
When they reach the point, they stop moving.
If the program generates a shape of that kind again, it will respawn said shape

Moving the mouse will impact the qualities of the shapes which spawn in
Moving the mouse will also impact qualities of the shapes.

*/
function draw() {

r=random(0,10); //Choose a random number for this cycle


if(random>TUNING){ // If we generate a shape,
  r=random(shapes) // Pick a shape,
  switch(r){ // Find what to do,

    case 1: // [1] - Square generator
      square1.y=random(0,width);
      square1.x=0;
      square1.size=(random(-50,50)+200);
      square1.moving = true;
      square1.terminal =(400+random(0,(width-400)));
      break;

    case 2: // [2] - Circle Generator
      break;

    case 3: // [3] - Rectangle Generator
      break;

    case 4: // [4] - Triangle Generator
      break;

    case 5: // [5] - Text Generator
      break;
  }

}

if(square1.moving){

  square1.x += square1.speed; // Move the shape
  square1.x = constrain(square1.x,0,width);

  square1.fill= map(mouseX,0,width,0,255); // Change the color
  fill(square1.fill);

  square(square1.x,square1.y,square1.size);
  if (square1.x >= square1.terminal){
    square1.moving = false;
  }
}
}
