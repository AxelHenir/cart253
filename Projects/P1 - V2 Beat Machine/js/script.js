// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";
let playing = false;
let looping = true;

let playhead = {
  x: 0,
  isBeingMoved: false,
  offsetX: 0,
  last: 0,
}

let note={
  x:500,
  y:500,
  size:50,
  sfx: undefined,
  img: undefined,
  color: {r:200,g:0,b:200},
  played: false,
}

let notes=[note];

let bpm = 170;
let metronomeSFX;

let channels = [100, 100, 100, 100];

let pauseB, playB, noloopB, loopB;

function preload() {
  note.sfx = loadSound('assets/sounds/metronome/metronome.wav');
  pauseB = loadImage('assets/images/pause.png');
  playB = loadImage('assets/images/play.png');
  noloopB = loadImage('assets/images/noloop.png');
  loopB = loadImage('assets/images/loop.png');


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(235, 215, 138);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();

}

function draw() {

  if (playing) { // Playing or Paused
    play();
  } else {
    pause();
  }

}

function mousePressed() { // Sound testing

}

function play() { // Steps for sim if not paused.
  drawUI(); // Draw UI.
  drawNotes(); // Draw all notes.
  upadatePlayhead(); // Update position of playhead.
  drawPlayhead(); // Print playhead at current position
  playSound(); // Check for collision, play sounds.
}

function pause() { // Steps for sim if paused.
  drawUI(); // Draw UI.
  drawNotes();
  upadatePlayhead(); // Update position of playhead.
  drawPlayhead(); // Draw playhead.

}

function drawNotes() {
  push();
  fill(note.color.r,note.color.g,note.color.b);
  rect(note.x,note.y,note.size,note.size);
  pop();

}

function drawUI() { // Draws the UI.
  push();
  background(252, 225, 157);

  fill(255, 202, 69);
  rect(width / 2, height, width * 0.9, height * 0.2, height * 0.05); // Bottom Bar UI

  fill(255, 211, 99);
  rect(width / 2, 0.5 * height, width, height * 0.75) // Timeline BG

  fill(255, 202, 69);
  rect(width / 2, 0, width, height * 0.2); // Top Bar UI

  pop();

  let buttons = [pauseB,playB,noloopB,loopB];

  for(let i=0; i<buttons.length;i++){
    image(buttons[i],(0.1*width)+(i*0.09*height),(0.05*height),(0.075*height),(0.075*height));
  }
}

function upadatePlayhead() { // Updates playhead position.

  if (playhead.isBeingMoved) {
    handleDragging();
  }
  else if(playing){
    playhead.x += tempo();
    if (playhead.x >= width) {
      playhead.x = 0;
      for(let i=0;i<notes.length;i++){
        notes[i].played=false;
      }
      if (!looping) { // check if playlist looping is on
        playing = false;
        playhead.last=0;
        console.log("Paused. (Looping is: ", looping, ")");
      }
    }
  }
}

function tempo() { // Dictates the increment of the playhead.

  let executions = ((60000/bpm)*16)/16.66667;
  let speed=width/executions;
  return speed;

}

function handleDragging() { // Handles user dragging playhead.
  playhead.x = mouseX + playhead.offsetX;
  playhead.x = constrain(playhead.x,0,width);
}

function drawPlayhead() { // Draws the playhead to the screen.

  push();
  fill(255, 158, 229);
  stroke(255, 158, 229);
  strokeWeight(4);
  line(playhead.x, 0.125 * height, playhead.x, 0.875 * height);
  rect(playhead.x, 0.113 * height, 0.025 * height, 0.025 * height);
  pop();

}

function playSound() {
  playCh(1);
}

function playCh(k) {
  if (!chMuted(k)) {
    for(let i=0;i<notes.length;i++){
      let d = dist(playhead.x,notes[i].y,notes[i].x,notes[i].y);
      if(d<notes[i].size && !(notes[i].played)){
        note.sfx.play();
        notes[i].played=true;
      }
    }
  }
}

function chMuted(k) { // Checks if channel k is muted.
  if (channels[k + 1] <= 0) {
    return true;
  }
  else {
    return false;
  }
}

function mousePressed(){
  if (mouseIsInsideElement()) {
    playhead.isBeingMoved = true;
    playhead.offsetX = playhead.x - mouseX;
  }
}

function mouseIsInsideElement(){
  let d = dist(mouseX,mouseY,playhead.x,0.125 * height);
  if(d < 0.025 * height){
    return true;
  }
  else{
    return false;
  }
}

function mouseReleased(){ // Handles mouse releases.
  playhead.isBeingMoved=false;
  playhead.offsetX=0;
  playhead.offsetY=0;
  playhead.last=playhead.x;
}

function keyPressed() { // Handles key presses.

  switch (keyCode) {

    case 32: // Spacebar - Pause/Unpause
      if (playing) {
        console.log("Paused.");
        playing = false;
        playhead.x = playhead.last;
      }
      else {
        console.log("Resumed.");
        playing = true;
        for(let i=0;i<notes.length;i++){
          notes[i].played=false;
        }
      }
      break;

    case 76: // L - Toggle looping
      if (looping) {
        console.log("Noloop.");
        looping = false;
      } else {
        console.log("Loop.");
        looping = true;
      }
      break;

  }
}
