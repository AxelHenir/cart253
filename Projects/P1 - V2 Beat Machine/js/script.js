// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";
let state=pause();

function preload() {

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(235, 215, 138);

}

function draw() {
  state; // Playing or Paused

}

function play(){
    playhead(); // Update position and print playhead
    playSound(); // Check for collision, play sounds.

}

function playhead(){ // Update position and print playhead
  
}

function playSound(){

}

function pause(){

}

function keyPressed(){ // Spacebar - Pause/Unpause
  if(keyCode==32){
    if(state==play){
      state=pause;
        console.log("Paused.");
    }
    else{
      state=play;
        console.log("Resumed.");
    }
  }
}
