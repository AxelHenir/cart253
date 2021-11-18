// Alex Henri - Project 2 - Generative Audio Visualizer
// Progress Report: Chapter 2 Audio Boogaloo

"use strict";

let song1,song2,song3,song4;
let currentSongName="N/A  ";
let amp,ftt;
let music=undefined;

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

}


function draw() {
  background(255);
  noFill();

  displayMusicInfo();
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
      if(music==undefined){

      }
      else{
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
  textSize(24);
  fill(0);
  noStroke();
  text("Now playing: "+currentSongName, 25,50);
  pop();

}
