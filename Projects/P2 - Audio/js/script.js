// Alex Henri - Project 2 - Generative Audio Visualizer
// Progress Report: Chapter 2 Audio Boogaloo

"use strict";

let ampLevel;
let music =undefined;
let ampCircle ={
  x:0,
  y:0,
  r:15,
}

function preload() {

}

function setup(){
  // Canvas space for my mini visualizers
  createCanvas(1000,1000);

  music = new Music(); // Music object contains audio-in for the demo

  rectMode(CENTER,CENTER);
  textAlign(CENTER,CENTER);
}


function draw() {
  background(255);
  noFill();

  // Display info about the current song
  music.displayMusicInfo();

  // Updates the FFT visualizer
  handleFFT();

  // Amplitude Demo #1
  ampDemo1();

  // Draws the borders around the demo windows
  drawBorders();

}

function ampDemo1(){ // Amp demo 1 shows how the volume affects a circle's size.

  // Check if we are actually playing music first,
  if(music!=undefined){
    push();
    translate(200,200);
    strokeWeight(3);
    stroke(0);
    fill(255);
    let level = music.amp.getLevel();
    ampCircle.r = map(level,0,1,30,150);
    ellipse(ampCircle.x,ampCircle.y,ampCircle.r,ampCircle.r);
    pop();
  }

}

function drawBorders(){

  // Window border
  push();
  strokeWeight(5);
  stroke(0);
  noFill();
  rect(500,500,1000,1000);
  pop();

  // Demo 1
  push();

  translate(200,200);
  noFill();
  strokeWeight(5);
  stroke(0);
  rect(0,0,200,200);
  noStroke();
  textSize(14);
  fill(0);
  text("Amplitude: Circle radius = Overall Volume", 0,120);
  pop();

  // Demo 2
}

function keyPressed(){ // Handles all keyboard input. 1-5 to play songs. Space to play/pause.
  switch(keyCode){

    case 49: // 1 = Play song 1
      music.changeTracks(1);
      break;


    case 50: // 2 = Play song 2
      music.changeTracks(2);
      break;


    case 51: // 3 = Play song 3
      music.changeTracks(3);
      break;


    case 52: // 4 = Play song 4
      music.changeTracks(4);
      break;


    case 53: // 5 = Play song 5

      break;


    case 32: // Spacebar = Play/Pause
      music.pauseMusic();
      break;

  }
}
