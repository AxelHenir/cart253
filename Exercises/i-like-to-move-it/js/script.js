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

let square1 =     {x: 0, y:0,  size: 0,  speed: 0,  fill: 255,  moving: false,  terminal: 0,}
let circle1 =     {x: 0, y:0, size:0, speed:0, fill: 255, moving: false, terminal: 0,}
let rectangle1 =  {x: 0, y:0,  w: 0, h:0,  speed: 0,  fill: 255,  moving: false,  terminal: 0,}
let triangle1 =   {x1:0, x2:0, x3: 0, y1:0, y2:0, y3:0, speed: 0, fill: 255, moving: false, terminal: 0,}

let r = 0;
let TUNING =9;
let shapes = [1,2,3,4,5];
/**
Initial drawing in program
*/
function setup() {
  strokeWeight(5);
  createCanvas(1000,1000);
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

if(r>TUNING){ // If we generate a shape,
  switch(random(shapes)){ // Find what to do,

    case 1: // [1] - Square generator
      square1.y=random(0,width); // Spawn on left of page, go right
      square1.x=0;
      square1.size=(random(-50,50)+200);
      square1.moving = true;
      square1.speed=random(1,3);
      square1.terminal =((width/2)+random(0,(width/2)));
      break;

    case 2: // [2] - Circle Generator
      circle1.y=random(0,height); // Spawn on right of page, go left
      circle1.x=width;
      circle1.size=(random(-50,50)+200);
      circle1.moving = true;
      circle1.speed=random(-3,-1);
      circle1.terminal =((width/2)-random(0,(width/2)));
      break;

    case 3: // [3] - Rectangle Generator
      rectangle1.x=random(0,width); // Spawn at top of page, go down
      rectangle1.y= 0;
      rectangle1.w= map(mouseX,0,width,50,150);
      rectangle1.h= map(mouseY,0,height,50,150);
      rectangle1.moving = true;
      rectangle1.speed=random(1,3);
      rectangle1.terminal =((width/2)+random(0,(width/2)));
      break;

    case 4: // [4] - Triangle Generator
      triangle1.x1=random(0,width); // Spawn at bottom of page, go up
      triangle1.y1=height;
      triangle1.x2=(triangle1.x1 + random(50,250));
      triangle1.y2=height;
      triangle1.x3=random(triangle1.x1,triangle1.x2);
      triangle1.y3=(height - random(50, 250));

      triangle1.moving = true;
      triangle1.speed=random(-3,-1);
      triangle1.terminal =((width/2)-random(0,(width/2)));
      break;

    case 5: // [5] - Text Generator
      break;
  }

}

if(square1.moving){
  square1.x += square1.speed; // Move the shape
  square1.x = constrain(square1.x,0,square1.terminal); // Constrain the shape

  square1.fill= map(mouseX,0,width,0,255); // Change the color
  fill(square1.fill);

  square(square1.x,square1.y,square1.size); // Draw the shape

  if (square1.x >= square1.terminal){ // Stop the shape from being drawn again if it reached the end
    square1.moving = false;
  }
} // Redraw square if its moving
if(circle1.moving){
  circle1.x += circle1.speed; // Move the shape
  circle1.x = constrain(circle1.x,circle1.terminal,width); // Constrain the shape

  circle1.fill= map(mouseX,0,width,0,255); // Change the color
  fill(circle1.fill);

  circle(circle1.x,circle1.y,circle1.size); // Draw the shape

  if (circle1.x <= circle1.terminal){ // Stop the shape from being drawn again if it reached the end
    circle1.moving = false;
    }
} // Redraw circle if its moving
if(rectangle1.moving){
  rectangle1.y += rectangle1.speed; // Move the shape
  rectangle1.y = constrain(rectangle1.y,0,rectangle1.terminal); // Constrain the shape

  rectangle1.fill= map(mouseX,0,width,0,255); // Change the color
  fill(rectangle1.fill);

  rect(rectangle1.x,rectangle1.y,rectangle1.w, rectangle1.h); // Draw the shape

  if (rectangle1.y >= rectangle1.terminal){ // Stop the shape from being drawn again if it reached the end
    rectangle1.moving = false;
    }
} // Redraw rectangle if its moving
if(triangle1.moving){

  triangle1.y1 += triangle1.speed; // Move the shape
  triangle1.y2 += triangle1.speed;
  triangle1.y3 += triangle1.speed;

  triangle1.y3 = constrain(triangle1.y3,triangle1.terminal,height); // Constrain the shape

  triangle1.fill= map(mouseX,0,width,0,255); // Change the color
  fill(triangle1.fill);

  triangle(triangle1.x1,triangle1.y1,triangle1.x2,triangle1.y2,triangle1.x3,triangle1.y3); // Draw the shape

  if (triangle1.y3 <= triangle1.terminal){ // Stop the shape from being drawn again if it reached the end
    triangle1.moving = false;
    }
} // Redraw triangle if its moving

}
