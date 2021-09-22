/**
CART 253 Exercise 1: I like to move it
Alex Henri

This program will occasionally generate a shape on the bounary of the square canvas.
This shape will be given inate qualities based mouse position within the canvas.
Random chance will also be used when deciding the qualities of the shapes.

Once a shape is generated, it will travel towards the opposite side of the canvas.
shapes are generated with a point called the terminal point.
If a shape reaches its terminal point, it will stop.
For the shape to move again, it must be generated again.

Generated shapes can be influenced through mouse position.
Fill, Stroke, Size and Rotation can all be influenced live.
*/

"use strict";

function preload() {
}

let CANVAS_SIZE = 1000; // This value controls the size of the canvas (in pixels). The canvas is square.

let shapes = [1,2,3,4];
let square1 =     {x: 0, y:0,  size: 0,  speed: 0,  fill: 255,  moving: false,  terminal: 0,rotation:0,}
let circle1 =     {x: 0, y:0, size:0, speed:0, fill: 255, moving: false, terminal: 0,rotation:0,}
let rectangle1 =  {x: 0, y:0,  w: 0, h:0,  speed: 0,  fill: 255,  moving: false,  terminal: 0,rotation:0,}
let triangle1 =   {x1:0, x2:0, x3: 0, y1:0, y2:0, y3:0, speed: 0, fill: 255, moving: false, terminal: 0,rotation:0,}

let r = 0;
let temp =0;

let TUNING =90; // The % Chance that a shape spawns per 60th of a second.
let BASE_SIZE = 140; // The base size all shapes share. Scaling happens off of this value.
let BASE_SPEED = 1; // The base speed of all shapes. Scaling happens off of this value.
let ROTATE_STRENGTH =0.1; // Base rotation strength. Scaling happens off of this value.

/*
Initial drawing in program =====================================================
*/
function setup() {
  angleMode(DEGREES);
  colorMode(HSB);
  createCanvas(CANVAS_SIZE,CANVAS_SIZE);
  textAlign(CENTER);
  textSize(38);
  textStyle(BOLD);
  text('WELCOME',CANVAS_SIZE/2,CANVAS_SIZE/2);
}
/*
Drawing function, called every 60th of a second. ===============================
*/
function draw() {

r=random(0,100); // Choose a random number for this frame.

// GENERATION ==================================================================

if(r>TUNING){
  switch(random(shapes)){

    case 1: // [1] - Square generator
      square1.y=random(0,CANVAS_SIZE);
      square1.x=0;
      square1.size=(BASE_SIZE*random(0.8,1.2)*map(mouseY,0,height,1,1.5));
      square1.moving = true;
      square1.speed=(BASE_SPEED*map(mouseX,0,CANVAS_SIZE,1,5));
      square1.speed=constrain(square1.speed,1,5);
      square1.terminal =((CANVAS_SIZE/2)+random(0,(CANVAS_SIZE/2)));
      square1.rotation=0;
      break;

    case 2: // [2] - Circle Generator
      circle1.y=random(0,CANVAS_SIZE);
      circle1.x=CANVAS_SIZE;
      circle1.size=(BASE_SIZE*random(0.8,1.2)*map(mouseY,0,CANVAS_SIZE,1.1,1.7));

      circle1.moving = true;
      circle1.speed=(BASE_SPEED*(-1)*map(mouseX,0,CANVAS_SIZE,1,5));
      circle1.speed=constrain(circle1.speed,-5,-1);
      circle1.terminal =((CANVAS_SIZE/2)-random(0,(CANVAS_SIZE/2)));
      circle1.rotation=0;
      break;

    case 3: // [3] - Rectangle Generator
      rectangle1.x=random(0,CANVAS_SIZE);
      rectangle1.y= 0;
      rectangle1.w= (BASE_SIZE*random(0.8,1.2)*map(mouseY,0,CANVAS_SIZE,1,1.3));
      rectangle1.h= (BASE_SIZE*random(0.8,1.2)*map(mouseY,0,CANVAS_SIZE,1,1.3)*random(0.3,1.7));

      rectangle1.moving = true;
      rectangle1.speed=(BASE_SPEED*map(mouseX,0,CANVAS_SIZE,1,5));
      rectangle1.speed=constrain(rectangle1.speed,1,5);
      rectangle1.terminal =((CANVAS_SIZE/2)+random(0,(CANVAS_SIZE/2)));
      rectangle1.rotation=0;
      break;

    case 4: // [4] - Triangle Generator
      triangle1.x1=random(0,CANVAS_SIZE);
      triangle1.y1=CANVAS_SIZE;
      triangle1.x2=(triangle1.x1 + 100+(BASE_SIZE*random(1,1.3)*map(mouseY,0,CANVAS_SIZE,1,1.5)));
      triangle1.y2=CANVAS_SIZE;
      triangle1.x3=random(triangle1.x1,triangle1.x2);
      triangle1.y3=CANVAS_SIZE-random(map(mouseY,0,CANVAS_SIZE,100,0),220);

      triangle1.moving = true;
      triangle1.speed=(BASE_SPEED*(-1)*map(mouseX,0,CANVAS_SIZE,1,5));
      triangle1.speed=constrain(triangle1.speed,-5,-1);
      triangle1.terminal =((CANVAS_SIZE/2)-random(0,(CANVAS_SIZE/2)));
      triangle1.rotation=0;
      break;
  }

}

// PRINTING ====================================================================

{ //Square Affairs--------------------------------------------------------------

  rotate(square1.rotation); // Rotation
  if (mouseX<0.3*CANVAS_SIZE){
    square1.rotation-=ROTATE_STRENGTH;
  }
  else if (mouseX>0.7*CANVAS_SIZE){
    square1.rotation+=ROTATE_STRENGTH;
  }

  if(square1.moving){ // Print if the shape is moving.
    square1.x += square1.speed;  // Adjust position according to speed.
    square1.x = constrain(square1.x,0,square1.terminal); // Constrain position to terminal.

    fill(color(map(mouseY,0,CANVAS_SIZE,6,349), map(mouseY,0,CANVAS_SIZE,100,35), map(mouseY,0,CANVAS_SIZE,73,85))); // Obtain and apply color.
    stroke(map(mouseY,0,CANVAS_SIZE,6,349),50,map(mouseY,0,CANVAS_SIZE,15,85)); // Obtain and apply stroke color.

    square(square1.x,square1.y,square1.size*(map(mouseY,0,CANVAS_SIZE,1,1.2))); // Draw the shape.
    rotate(-1*square1.rotation);  // Undo rotation for next shape.

    if (square1.x >= square1.terminal){
      square1.moving = false; // Stop the shape from moving if it reaches terminal.
    }
  }
}

{ // Rectangle Stuff -----------------------------------------------------------

  rotate(rectangle1.rotation); // Rotation.
  if (mouseX<0.3*CANVAS_SIZE){
    rectangle1.rotation-=ROTATE_STRENGTH;
  }
  else if (mouseX>0.7*CANVAS_SIZE){
    rectangle1.rotation+=ROTATE_STRENGTH;
  }

  if(rectangle1.moving){ // Print if the shape is moving.
    rectangle1.y += rectangle1.speed;  // Adjust position according to speed.
    rectangle1.y = constrain(rectangle1.y,0,rectangle1.terminal); // Constrain position to terminal.

    fill(map(mouseY,0,CANVAS_SIZE,203,32),32, 95); // Obtain and apply color.
    stroke(map(mouseY,0,CANVAS_SIZE,203,32),50,map(mouseY,0,CANVAS_SIZE,15,85)); // Obtain and apply stroke color.

    rect(rectangle1.x,rectangle1.y,rectangle1.w*(map(mouseX,0,CANVAS_SIZE,1,1.2)),rectangle1.h*(map(mouseX,0,CANVAS_SIZE,1,1.2))); // Draw the shape.
    rotate(-1*rectangle1.rotation);  // Undo rotation for next shape.

    if (rectangle1.y >= rectangle1.terminal){
      rectangle1.moving = false; // Stop the shape from moving if it reaches terminal.
    }
  }
}

{ // Circle Quirks -------------------------------------------------------------

rotate(circle1.rotation); // Rotation.
if (mouseX<0.3*CANVAS_SIZE){
  circle1.rotation+=ROTATE_STRENGTH;
}
else if (mouseX>0.7*CANVAS_SIZE){
  circle1.rotation-=ROTATE_STRENGTH;
}

if(circle1.moving){ // Print if the shape is moving.
  circle1.x += circle1.speed; // Adjust position according to speed.
  circle1.x = constrain(circle1.x,circle1.terminal,width); // Constrain position to terminal.

  fill(map(mouseY,0,CANVAS_SIZE,203,32), map(mouseY,0,CANVAS_SIZE,92,12), map(mouseY,0,CANVAS_SIZE,15,95)); // Obtain and apply color.
  stroke(map(mouseY,0,CANVAS_SIZE,203,32),50,map(mouseY,0,CANVAS_SIZE,15,85)); // Obtain and apply stroke color.

  circle(circle1.x,circle1.y,circle1.size*(map(mouseX,0,CANVAS_SIZE,1,1.4))); // Draw the shape.
  rotate(-1*circle1.rotation); // Undo rotation for next shape.

  if (circle1.x <= circle1.terminal){
    circle1.moving = false; // Stop the shape from moving if it reaches terminal.
    }
  }
}

{ // Triangle, I might mangle --------------------------------------------------

rotate(triangle1.rotation); // Rotation.
if (mouseX<0.3*CANVAS_SIZE){
  triangle1.rotation+=ROTATE_STRENGTH;
}
else if (mouseX>0.7*CANVAS_SIZE){
  triangle1.rotation-=ROTATE_STRENGTH;
}

if(triangle1.moving){ // Print if the shape is moving.
  triangle1.y1 += triangle1.speed; // Adjust position according to speed.
  triangle1.y2 += triangle1.speed; // Adjust position according to speed.
  triangle1.y3 += triangle1.speed; // Adjust position according to speed.

  triangle1.y3 = constrain(triangle1.y3,triangle1.terminal,height); // Constrain position to terminal.

  fill(map(mouseY,0,CANVAS_SIZE,200,168),map(mouseY,0,CANVAS_SIZE,52,21),map(mouseY,0,CANVAS_SIZE,66,76)); // Obtain and apply color.
  stroke(map(mouseY,0,CANVAS_SIZE,200,168),50,map(mouseY,0,CANVAS_SIZE,15,85)); // Obtain and apply stroke color.

  triangle(triangle1.x1,triangle1.y1,triangle1.x2*(map(mouseX,0,CANVAS_SIZE,1,1.2)),triangle1.y2,triangle1.x3,triangle1.y3*(map(mouseX,0,CANVAS_SIZE,0.8,1))); // Draw the shape.
  rotate(-1*triangle1.rotation); // Undo rotation for next shape.

  if (triangle1.y3 <= triangle1.terminal){
    triangle1.moving = false; // Stop the shape from moving if it reaches terminal.
    }
  }
}

}
