// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";
let playing = false;
let looping = true;
let click;

let playhead = {
  x: 0,
  isBeingMoved: false,
  offsetX: 0,
  last: 0,
}

function note(){
  this.x=500;
  this.y=500;
  this.size=50;
  this.sfx=click;
  this.color= 255;
  this.played= false;
  this.channel=1;
  this.offsetX=0;
  this.offsetY=0;
  this.isBeingMoved=true;
}

let notes=[];

let bpm = 120;
let metronomeSFX;

let channels = [100, 100, 100, 100];

let pauseB, playB, noloopB, loopB, metronomeB, tempoB, tempoDB, tempoUB;
let playButton,pauseButton,loopButton,noloopButton;


function preload() {
  click = loadSound('assets/sounds/metronome/metronome.wav');
  pauseB = loadImage('assets/images/pause.png');
  noloopB = loadImage('assets/images/noloop.png');
  loopB = loadImage('assets/images/loop.png');
  metronomeB=loadImage('assets/images/metronome.png');
  tempoB=loadImage('assets/images/tempo.png');
  tempoDB=loadImage('assets/images/tempo_arrow_down.png');
  tempoUB=loadImage('assets/images/tempo_arrow_up.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(235, 215, 138);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();

  playButton = createImg('assets/images/play.png');
  pauseButton = createImg('assets/images/pause.png');
  loopButton = createImg('assets/images/loop.png');
  noloopButton = createImg('assets/images/noloop.png');

  playButton.position((0.1*width)+(0.09*height),(0.025*height));
  playButton.size(0.075*height,0.075*height);
  playButton.mousePressed(setToPlay);

  pauseButton.position((0.1*width)+(2*(0.09*height)),(0.025*height));
  pauseButton.size(0.075*height,0.075*height);
  pauseButton.mousePressed(setToPause);

  loopButton.position((0.1*width)+(3*(0.09*height)),(0.025*height));
  loopButton.size(0.075*height,0.075*height);
  loopButton.mousePressed(setLooping);

  noloopButton.position((0.1*width)+(4*(0.09*height)),(0.025*height));
  noloopButton.size(0.075*height,0.075*height);
  noloopButton.mousePressed(setnoloop);

}

function draw() {

  if (playing) { // Playing or Paused
    play();
  } else {
    pause();
  }

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

function drawNotes() { // Draws the contents of notes[]

  for(let i=0;i<notes.length;i++){
    push();
    fill(notes[i].color);
    notes[rect(note.x,note.y,note.size,note.size)];
    pop();
  }


}

function newNote(){ // Spawns new note

  notes.push(new note());

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

}

function setToPlay(){ // Sets the playing variable to true.
  console.log("Resumed. (Source: Play Button)");
  playing=true;
}
function setToPause(){
  console.log("Paused. (Source: Pause Button)");
  playing=false;
}
function setLooping(){
  console.log("Looping: ,",looping, " (Source: Loop Button)");
  looping=true;
}
function setnoloop(){
  console.log("Looping: ,",looping, " (Source: Noloop Button)");
  looping=false;
}


function upadatePlayhead() { // Updates playhead position.

  if (playhead.isBeingMoved) {
    dragPlayhead();
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

function dragPlayhead() { // Handles user dragging playhead.
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

function mousePressed(){ // Handles what happens when mouse is clicked.
  if (mouseIsInsidePlayhead()) {
    playhead.isBeingMoved = true;
    playhead.offsetX = playhead.x - mouseX;
  }
  else if(mouseisInsideNote()){
    notes[n].isBeingMoved=true;
    notes[n].offsetX= notes[n].x - mouseX;
    notes[n].offsetY= notes[n].y - mouseY;
  }
}

function mouseIsInsidePlayhead(){ // Checks if the mouse is over the playhead.
  let d = dist(mouseX,mouseY,playhead.x,0.125 * height);
  if(d < 0.025 * height){
    return true;
  }
  else{
    return false;
  }
}

function mouseisInsideNote(){ // Checks if the mouse is inside a note. PLACEHOLDER
  return false;
}

function mouseReleased(){ // Handles mouse releases.

  if (playhead.isBeingMoved){
    playhead.isBeingMoved=false;
    playhead.offsetX=0;
    playhead.offsetY=0;
    playhead.last=playhead.x;
  }
  else{
    for(let i=0;i<notes.length;i++){
      if(notes[i].isBeingMoved){
        notes[i].isBeingMoved = false;
        notes[i].offsetX=0;
        notes[i].offsetY=0;
      }
    }
  }

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
