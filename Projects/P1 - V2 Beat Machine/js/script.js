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
  
}

let bpm = 100;
let metronomeSFX;

let channels = [100, 100, 100, 100];


function preload() {
  metronomeSFX = loadSound('assets/sounds/metronome/metronome.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(235, 215, 138);
  rectMode(CENTER);
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
  metronomeSFX.play();
}

function play() { // Steps for sim if not paused.
  drawUI(); // Print UI.
  upadatePlayhead(); // Update position of playhead.
  drawPlayhead(); // Print playhead at current position
  playSound(); // Check for collision, play sounds.
}

function pause() { // Steps for sim if paused.
  drawUI(); // Draw UI.
  upadatePlayhead(); // Update position of playhead.
  drawPlayhead(); // Draw playhead.
  userInteraction(); // Check if user is interacting with an element

}

function userInteraction() {


}

function drawUI() {
  push();
  background(252, 225, 157);

  fill(255, 202, 69);
  rect(width / 2, height, width * 0.9, height * 0.2, height * 0.05); // Bottom Bar UI

  fill(255, 211, 99);
  rect(width / 2, 0.5 * height, width, height * 0.75) // Timeline BG

  fill(255, 202, 69);
  rect(width / 2, 0, width, height * 0.2); // Top Bar UI

  pop();
} // Draws the UI.

function upadatePlayhead() { // Update position and print playhead

  if (playhead.isBeingMoved) {
    handleDragging();
  }
  else if(playing){
    playhead.x++;
    if (playhead.x >= width) {
      playhead.x = 0;
      if (!looping) { // check if playlist looping is on
        playing = false;
        console.log("Paused. (Looping is: ", looping, ")");
      }
    }
  }

}

function handleDragging(){
  playhead.x = mouseX + playhead.offsetX;
  playhead.x = constrain(playhead.x,0,width);
}

function drawPlayhead() {
  push();
  fill(255, 158, 229);
  stroke(255, 158, 229);
  strokeWeight(4);
  line(playhead.x, 0.125 * height, playhead.x, 0.875 * height);
  rect(playhead.x, 0.113 * height, 0.025 * height, 0.025 * height);
  pop();
} // Draws the playhead

function playSound() {
  playCh(1);
  playCh(2);
  playCh(3);
  playCh(4);

}

function playCh(k) {
  if (!chMuted(k)) { // Check if channel is muted

  }
} // Plays sound from channel K.

function chMuted(k) {
  if (channels[k + 1] <= 0) {
    return true;
  } else {
    return false;
  }
} // Checks if channel K is muted.

function mousePressed(){
  if (mouseIsInsidePlayHead()) {
    playhead.isBeingMoved = true;
    playhead.offsetX = playhead.x - mouseX;
  }
}

function mouseIsInsidePlayHead(){
  let d = dist(mouseX,mouseY,playhead.x,0.125 * height);
  if(d < 0.025 * height){
    return true;
  }
  else{
    return false;
  }
}

function mouseReleased(){
  playhead.isBeingMoved=false;
  playhead.offsetX=0;
  playhead.offsetY=0;
  playhead.last=playhead.x;
}

function keyPressed() {

  switch (keyCode) {

    case 32: // Spacebar - Pause/Unpause
      if (playing) {
        console.log("Paused.");
        playing = false;
        playhead.x = playhead.last;
      } else {
        console.log("Resumed.");
        playing = true;
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
} // Key Commands (Space, L,)
