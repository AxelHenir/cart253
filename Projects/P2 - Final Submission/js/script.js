// Alex Henri - CART 253 Project 2 Prototype

"use strict";

let diagram = undefined; // Diagram object
let music =undefined; // music object
let dequeueCell = false;

//Lets the cells out slowly
let dequeueCellInterval = setInterval(function(){dequeueCell = true;},500);

function preload() {

}

function setup() {

  createCanvas(1000, 1000);

  // Music object contains audio-in for the demo.
  music = new Music();

  // Diagram object contains the cells in the demo.
  diagram = new VDiagram();

  //Maximum distance between jitters
  voronoiJitterStepMax(100);
  //Minimum distance between jitters
  voronoiJitterStepMin(15);

}

function draw(){

  // Background
  background(255);

  // dequeueCell
  if(dequeueCell){
    dequeueCell=false;
    diagram.dequeueCell();
  }

  // Get details from music, apply effects
  music.callEffectsFromMusic();

  // Redraw the diagram
  diagram.redraw();

  // Display info about the current song
  music.displayMusicInfo();

}

function keyPressed(){ // Checks all keys pressed
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
      music.changeTracks(5);
      break;

    case 32: // Spacebar = play / pause
      if(isLooping()){
        music.pauseMusic();
        noLoop();
      }
      else{
        music.pauseMusic();
        loop();
      }
      break;

    case 81: // Q - Add cell
      diagram.changeScene();
      break;

    case 87: // W - Cull active cells
      diagram.cullActiveCells();
      break;

  }

}
