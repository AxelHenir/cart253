// Alex Henri - CART 253 Project 2 Prototype

"use strict";

let diagram = undefined; // Diagram object
let music =undefined; // music object

function preload() {

}

function setup() {

  createCanvas(1000, 1000);

  // Music object contains audio-in for the demo.
  music = new Music();

  // Diagram object contains the cells in the demo.
  diagram = new VDiagram();

  //Maximum distance between jitters
	voronoiJitterStepMax(50);
	//Minimum distance between jitters
	voronoiJitterStepMin(15);

}

function draw(){

  // Background
  background(255);

  // Read the music and adapt the cells
  let f1,f2,f3,f4,f5 = undefined;
  // Get bass frequencies
  f1 = music.getFreq("bass");

  if(f1){
    diagram.addJitter(8);
  }

  // Get low-mid frequencies
  f2 = music.getFreq("lowMid");

  // Get mid frequencies
  f3 = music.getFreq("mid");

  // Get high-mid frequencies
  f4 = music.getFreq("highMid");

  if(f4){
    diagram.whiteout();
  }

  // Get high frequencies
  f5 = music.getFreq("treble");

  //console.log("f1: ",f1,"f2: ",f2,"f3: ",f3,"f4: ",f4,"f5: ",f5);

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

    case 81: // Q = Draw sites on/off
      diagram.siteStroke();
      break;

    case 87: // W = Draw cell stroke on/off
      diagram.cellStroke();
      break;

    case 69: // E = Add Jitter (12)
      diagram.addJitter(12);
      break;

    case 82: // R - Spawn new site
      diagram.spawnSite();
      break;

  }

}
