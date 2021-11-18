// Alex Henri - Project 2 - Generative Audio Visualizer
// Progress Report: Chapter 2 Audio Boogaloo

"use strict";

let song1,song2,song3,song4;
let currentSongName="N/A";
let amp,ftt;
let music=undefined;

let ampLevel;

let ampCircle ={
  x:0,
  y:0,
}

function preload() {
  song1=loadSound("assets/sounds/music/Cowboy Bebop - Rush.mp3");
  song2=loadSound("assets/sounds/music/Glass Animals - Heatwaves.mp3");
  song3=loadSound("assets/sounds/music/KAYTRANADA - Gray Area.mp3");
  song4=loadSound("assets/sounds/music/Karma Fields - Dreams.mp3");
}

function setup(){
  // Canvas space for my mini visualizers
  createCanvas(1000,1000);

  // Amplitude object from p5.sound
  amp = new p5.Amplitude();
  // FTT object from p5.sound
  ftt = new p5.FFT();

  rectMode(CENTER,CENTER);
  textAlign(CENTER,CENTER);
}


function draw() {
  background(255);
  noFill();

  // Display info about the current song
  displayMusicInfo();

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
    let level = amp.getLevel();
    let size = map(level,0,1,30,150);
    ellipse(ampCircle.x,ampCircle.y,size,size);
    pop();
  }

}

function handleFFT(){

  // Check if we are actually playing music first,
  if(music!=undefined){

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

function keyPressed(){ // Handles all keyboard input. 1-4 to play songs. Space to play/pause.
  switch(keyCode){

    case 49: // 1 = Play song 1
      currentSongName = "SEATBELTS - Rush";
      if(music==undefined){ // check if first
        music = song1; // Set music to selected song
        music.loop(); // Begin looping music
      }
      else{
        music.stop(); // Stop old song
        music = song1; // Set music to selected song
        music.loop(); // Begin looping music
      }

      break;


    case 50: // 2 = Play song 2
      currentSongName = "Glass Animals - Heat Waves";
      if(music==undefined){ // check if first
        music = song2; // Set music to selected song
        music.loop(); // Begin looping music
      }
      else{
        music.stop(); // Stop old song
        music = song2; // Set music to selected song
        music.loop(); // Begin looping music
      }
      break;


    case 51: // 3 = Play song 3
      currentSongName = "KAYTRANADA - Gray Area (ft. Mick Jenkins)";
      if(music==undefined){ // check if first
        music = song3; // Set music to selected song
        music.loop(); // Begin looping music
      }
      else{
        music.stop(); // Stop old song
        music = song3; // Set music to selected song
        music.loop(); // Begin looping music
      }
      break;


    case 52: // 4 = Play song 4
      currentSongName = "Karma Fields - Dreams (ft. Shey Baba)";
      if(music==undefined){ // check if first
        music = song4; // Set music to selected song
        music.loop(); // Begin looping music
      }
      else{
        music.stop(); // Stop old song
        music = song4; // Set music to selected song
        music.loop(); // Begin looping music
      }
      break;


    case 32: // Spacebar = Play/Pause
      if(music!=undefined){
        if(music.isPlaying()){
          music.pause(); // Pause music
        }
        else{
          music.loop(); // Resume music
        }
      }
      break;


  }
}

function displayMusicInfo(){ // Display the "now-playing"

  push();
  textAlign(LEFT);
  textSize(24);
  fill(0);
  noStroke();
  text("Now playing: "+currentSongName, 25,50);
  pop();

}
