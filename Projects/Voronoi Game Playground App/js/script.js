// Alex Henri - CART 253 Project 2 Final Submission

// This is the driver code for my generative audio visualizer.
// This code requires VDiagram.js, Cell.js, Music.js, p5.sound.js, rhill-voronoi-core.js and p5.voronoi.js to function.
// This code will orchstrate the program.

"use strict";

let diagram = undefined; // Diagram object
let music =undefined; // music object
let dequeueCell = false; // Used to kno when to dequeue a cell and add it to active.
let intro = 0; // to track intro states
let hideMusicInfo = false; // To track if the music info is hidden.

//Lets the cells out slowly
let dequeueCellInterval = setInterval(function(){dequeueCell = true;},200);

function preload() {

}

function setup() {

  createCanvas(1000, 1000);
  colorMode(HSB,360,100,100);

  // Music object contains audio-in for the demo.
  music = new Music();

  // Diagram object contains the cells in the demo.
  diagram = new VDiagram();

  //Maximum distance between jitters
  voronoiJitterStepMax(30);
  //Minimum distance between jitters
  voronoiJitterStepMin(15);

  // white borders and sites
  voronoiCellStroke(255);
  voronoiSiteStroke(255);

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
  if(!hideMusicInfo){
    music.displayMusicInfo();
  }

  // Display intro info
  introSlides(intro);

}

function introSlides(s){

  switch(s){
    case 0:

      // Starter text
      push();
      textSize(24);
      fill(0);
      textAlign(CENTER,CENTER);
      text("Hello, Q does cool stuff",width/2,height/2);
      textSize(11);
      fill(5);
      text("Z TO SKIP INTRO",width/2,height-50);
      pop();
      break;

    case 1:

      push();
      fill(255);
      rectMode(CENTER,CENTER);
      noStroke();
      rect(width/2,height/2,500,75);
      textSize(24);
      fill(0);
      textAlign(CENTER,CENTER);
      text("Nice, now press a number between 1 and 5",width/2,height/2);
      pop();
      break;

    case 2:
      if(millis()>15000){
        push();
        fill(255);
        rectMode(CENTER,CENTER);
        noStroke();
        rect(width/2,height/2,500,75);
        textSize(24);
        fill(0);
        textAlign(CENTER,CENTER);
        text("Pressing Q changes the pattern",width/2,height/2);
        pop();

      }
      break;

      case 3:
          push();
          fill(255);
          rectMode(CENTER,CENTER);
          noStroke();
          rect(width/2,height/2,500,75);
          textSize(24);
          fill(0);
          textAlign(CENTER,CENTER);
          text("If this ain't your jam, try another number (1-5)",width/2,height/2);
          pop();
        break;

  }


}

function keyPressed(){ // Checks all keys pressed
  switch(keyCode){

    case 49: // 1 = Play song 1
      music.changeTracks(1);
      intro++;
      break;


    case 50: // 2 = Play song 2
      music.changeTracks(2);
      intro++;
      break;


    case 51: // 3 = Play song 3
      music.changeTracks(3);
      intro++;
      break;


    case 52: // 4 = Play song 4
      music.changeTracks(4);
      intro++;
      break;


    case 53: // 5 = Play song 5
      music.changeTracks(5);
      intro++;
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
      diagram.newScene();
      intro++;
      break;

    case 90: // Z - Skip intro
      intro+=100;
      break;

    case 72: // H - Info open close
      if(hideMusicInfo){
        hideMusicInfo = false;
      }
      else {
        hideMusicInfo = true;
      }

      break;
  }

}
