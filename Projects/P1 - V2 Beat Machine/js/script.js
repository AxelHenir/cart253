// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";
let playing = false;
let looping = true;
let click;
let FR=60;

let playhead = {
  x: 0,
  isBeingMoved: false,
  offsetX: 0,
  last: 0,
}

function note() {
  this.x = 500;
  this.y = 500;
  this.size = 50;
  this.sfx = click ;
  this.color = 255;
  this.played = false;
  this.channel = 1;
  this.offsetX = 0;
  this.offsetY = 0;
  this.isBeingMoved = false;
  this.volume=50;
}

let channel = {
  volume:50,
}

let notes = [];

let bpm = 120 ;
let metronome = false;
let metronomeSFX;
let currentExec=0;

let channels = [100, 100, 100, 100];

let pauseB, playB, noloopB, loopB, metronomeB, tempoB, tempoDB, tempoUB;
let playButton, pauseButton, loopButton, noloopButton, metronomeButton, tempodownButton, tempoupButton, tempoImg, newnoteButton;
let deleteNoteButton,spawnCopyNoteButton,selectSFXButton;
let clapsButton,hhcButton,hhoButton,kicksButton,percsButton,shakersButton,snaresButton,snapsButton,rimshotsButton;
let rockin_record;

let spawningNewNote=false;
let selectingSFX=false;
let selectingOption=false;

let target=-1; // Int - The index of the note last selected, click sets it to zero.
let selection=-1; // Int - The index of the last file explored.
let option=-1; // Int - the index of the SFX option from selection.

let rimshot1,rimshot2,rimshot3,rimshot4;
let snare1,snare2,snare3,snare4,snare5,snare6,snare7,snare8,snare9,snare10;
let snap1,snap2,snap3,snap4,snap5,snap6;
let shaker1,shaker2,shaker3,shaker4,shaker5,shaker6;
let perc1,perc2,perc3,perc4,perc5,perc6,perc7,perc8,perc9,perc10;
let kick1,kick2,kick3,kick4,kick5,kick6,kick7;
let hhc1,hhc2,hhc3,hhc4,hhc5,hhc6;
let hho1,hho2,hho3,hho4,hho5;
let clap1,clap2,clap3,clap4,clap5,clap6,clap7,clap8;

function preload() {
  click = loadSound('assets/sounds/metronome/metronome.wav');
  rockin_record =loadFont('assets/fonts/gomarice_rockin_record.ttf');

  rimshot1=loadSound('assets/sounds/LoFi/Snares + Rimshots/Rimshot1.wav');
  rimshot2=loadSound('assets/sounds/LoFi/Snares + Rimshots/Rimshot2.wav');
  rimshot3=loadSound('assets/sounds/LoFi/Snares + Rimshots/Rimshot3.wav');
  rimshot4=loadSound('assets/sounds/LoFi/Snares + Rimshots/Rimshot4.wav');

  snare1=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (1).wav');
  snare2=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (2).wav');
  snare3=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (3).wav');
  snare4=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (4).wav');
  snare5=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (5).wav');
  snare6=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (6).wav');
  snare7=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (7).wav');
  snare8=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (8).wav');
  snare9=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (9).wav');
  snare10=loadSound('assets/sounds/LoFi/Snares + Rimshots/Snare (10).wav');

  snap1=loadSound('assets/sounds/LoFi/Snaps/Snap (1).wav');
  snap2=loadSound('assets/sounds/LoFi/Snaps/Snap (2).wav');
  snap3=loadSound('assets/sounds/LoFi/Snaps/Snap (3).wav');
  snap4=loadSound('assets/sounds/LoFi/Snaps/Snap (4).wav');
  snap5=loadSound('assets/sounds/LoFi/Snaps/Snap (5).wav');
  snap6=loadSound('assets/sounds/LoFi/Snaps/Snap (6).wav');

  shaker1=loadSound('assets/sounds/LoFi/Shakers/Shaker (1).wav');
  shaker2=loadSound('assets/sounds/LoFi/Shakers/Shaker (2).wav');
  shaker3=loadSound('assets/sounds/LoFi/Shakers/Shaker (3).wav');
  shaker4=loadSound('assets/sounds/LoFi/Shakers/Shaker (4).wav');
  shaker5=loadSound('assets/sounds/LoFi/Shakers/Shaker (5).wav');
  shaker6=loadSound('assets/sounds/LoFi/Shakers/Shaker (6).wav');

  perc1=loadSound('assets/sounds/LoFi/Percussion/Perc (1).wav');
  perc2=loadSound('assets/sounds/LoFi/Percussion/Perc (2).wav');
  perc3=loadSound('assets/sounds/LoFi/Percussion/Perc (3).wav');
  perc4=loadSound('assets/sounds/LoFi/Percussion/Perc (4).wav');
  perc5=loadSound('assets/sounds/LoFi/Percussion/Perc (5).wav');
  perc6=loadSound('assets/sounds/LoFi/Percussion/Perc (6).wav');
  perc7=loadSound('assets/sounds/LoFi/Percussion/Perc (7).wav');
  perc8=loadSound('assets/sounds/LoFi/Percussion/Perc (8).wav');
  perc9=loadSound('assets/sounds/LoFi/Percussion/Perc (9).wav');
  perc10=loadSound('assets/sounds/LoFi/Percussion/Perc (10).wav');

  kick1=loadSound('assets/sounds/LoFi/Kicks/Kick (1).wav');
  kick2=loadSound('assets/sounds/LoFi/Kicks/Kick (2).wav');
  kick3=loadSound('assets/sounds/LoFi/Kicks/Kick (3).wav');
  kick4=loadSound('assets/sounds/LoFi/Kicks/Kick (4).wav');
  kick5=loadSound('assets/sounds/LoFi/Kicks/Kick (5).wav');
  kick6=loadSound('assets/sounds/LoFi/Kicks/Kick (6).wav');
  kick7=loadSound('assets/sounds/LoFi/Kicks/Kick (7).wav');

  hhc1=loadSound('assets/sounds/LoFi/Hihats - Closed/HHC (1).wav');
  hhc2=loadSound('assets/sounds/LoFi/Hihats - Closed/HHC (2).wav');
  hhc3=loadSound('assets/sounds/LoFi/Hihats - Closed/HHC (3).wav');
  hhc4=loadSound('assets/sounds/LoFi/Hihats - Closed/HHC (4).wav');
  hhc5=loadSound('assets/sounds/LoFi/Hihats - Closed/HHC (5).wav');
  hhc6=loadSound('assets/sounds/LoFi/Hihats - Closed/HHC (6).wav');

  hho1=loadSound('assets/sounds/LoFi/Hihats - Open/HHO (1).wav');
  hho2=loadSound('assets/sounds/LoFi/Hihats - Open/HHO (2).wav');
  hho3=loadSound('assets/sounds/LoFi/Hihats - Open/HHO (3).wav');
  hho4=loadSound('assets/sounds/LoFi/Hihats - Open/HHO (4).wav');
  hho5=loadSound('assets/sounds/LoFi/Hihats - Open/HHO (5).wav');

  clap1=loadSound('assets/sounds/LoFi/Claps/Clap (1).wav');
  clap2=loadSound('assets/sounds/LoFi/Claps/Clap (2).wav');
  clap3=loadSound('assets/sounds/LoFi/Claps/Clap (3).wav');
  clap4=loadSound('assets/sounds/LoFi/Claps/Clap (4).wav');
  clap5=loadSound('assets/sounds/LoFi/Claps/Clap (5).wav');
  clap6=loadSound('assets/sounds/LoFi/Claps/Clap (6).wav');
  clap7=loadSound('assets/sounds/LoFi/Claps/Clap (7).wav');
  clap8=loadSound('assets/sounds/LoFi/Claps/Clap (8).wav');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(235, 215, 138);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  noStroke();
  frameRate(FR);

  playButton = createImg('assets/images/play.png');
  pauseButton = createImg('assets/images/pause.png');
  loopButton = createImg('assets/images/loop.png');
  noloopButton = createImg('assets/images/noloop.png');
  metronomeButton = createImg('assets/images/metronome.png');
  tempoupButton = createImg('assets/images/tempo_arrow_up.png');
  tempodownButton = createImg('assets/images/tempo_arrow_down.png');
  tempoImg = createImg('assets/images/tempo.png');
  newnoteButton = createImg('assets/images/new_note.png');

  // Top Bar UI

  playButton.position((0.1 * width), (0.0125 * height));
  playButton.size(0.075 * height, 0.075 * height);
  playButton.mousePressed(setToPlay);

  pauseButton.position((0.1 * width) + (1 * (0.09 * height)), (0.0125 * height));
  pauseButton.size(0.075 * height, 0.075 * height);
  pauseButton.mousePressed(setToPause);

  loopButton.position((0.1 * width) + (2 * (0.09 * height)), (0.0125 * height));
  loopButton.size(0.075 * height, 0.075 * height);
  loopButton.mousePressed(setLooping);

  noloopButton.position((0.1 * width) + (3 * (0.09 * height)), (0.0125 * height));
  noloopButton.size(0.075 * height, 0.075 * height);
  noloopButton.mousePressed(setnoloop);

  metronomeButton.position((0.1 * width) + (4 * (0.09 * height)), (0.0125 * height));
  metronomeButton.size(0.075 * height, 0.075 * height);
  metronomeButton.mousePressed(toggleMetronome);

  tempoupButton.position((0.1 * width) + (5 * (0.09 * height)), (0.0125 * height));
  tempoupButton.size(0.075 * height, 0.075 * height);
  tempoupButton.mousePressed(bpmUp);

  tempodownButton.position((0.1 * width) + (6 * (0.09 * height)), (0.0125 * height));
  tempodownButton.size(0.075 * height, 0.075 * height);
  tempodownButton.mousePressed(bpmDown);

  tempoImg.position((0.1 * width) + (7 * (0.09 * height)), (0.0125 * height));
  tempoImg.size(0.075 * height, 0.075 * height);

  newnoteButton.position((0.1 * width) + (9 * (0.09 * height)), (0.0125 * height));
  newnoteButton.size(0.075 * height, 0.075 * height);
  newnoteButton.mousePressed(newNote);

 //Botton Bar UI

  deleteNoteButton = createImg('assets/images/trash.png');
  spawnCopyNoteButton = createImg('assets/images/copy.png');
  selectSFXButton = createImg('assets/images/sfx.png');// PLACEHODLER

  deleteNoteButton.position((0.1 * width), (0.9125 * height));
  deleteNoteButton.size(0.075 * height, 0.075 * height);
  deleteNoteButton.mousePressed(deleteTargetNote);

  spawnCopyNoteButton.position((0.1 * width)+ (1 * (0.09 * height)), (0.9125 * height));
  spawnCopyNoteButton.size(0.075 * height, 0.075 * height);
  spawnCopyNoteButton.mousePressed(spawnCopyNote);

  selectSFXButton.position((0.1 * width)+ (2 * (0.09 * height)), (0.9125 * height));
  selectSFXButton.size(0.075 * height, 0.075 * height);
  selectSFXButton.mousePressed(selectSFX);

  //SFX Selection UI

  clapsButton = createButton("Claps");
  clapsButton.position(0.04*width,0.215*height);
  clapsButton.size(0.2*width,0.0755*height);
  clapsButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  clapsButton.mousePressed(clapsSelected);


  hhcButton = createButton("Hi Hat Open");
  hhcButton.position(0.26*width,0.215*height);
  hhcButton.size(0.2*width,0.0775*height);
  hhcButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  hhcButton.mousePressed(hhcSelected);


  hhoButton = createButton("Hi Hat Closed");
  hhoButton.position(0.26*width,0.315*height);
  hhoButton.size(0.2*width,0.0775*height);
  hhoButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  hhoButton.mousePressed(hhoSelected);

  kicksButton = createButton("Kicks");
  kicksButton.position(0.04*width,0.315*height);
  kicksButton.size(0.2*width,0.0775*height);
  kicksButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  kicksButton.mousePressed(kicksSelected);

  percsButton = createButton("Percussion");
  percsButton.position(0.26*width,0.415*height);
  percsButton.size(0.2*width,0.0775*height);
  percsButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  percsButton.mousePressed(percsSelected);

  shakersButton = createButton("Shakers");
  shakersButton.position(0.04*width,0.415*height);
  shakersButton.size(0.2*width,0.0775*height);
  shakersButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  shakersButton.mousePressed(shakersSelected);

  snapsButton = createButton("Snaps");
  snapsButton.position(0.26*width,0.515*height);
  snapsButton.size(0.2*width,0.0775*height);
  snapsButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  snapsButton.mousePressed(snapsSelected);

  snaresButton = createButton("Snares");
  snaresButton.position(0.04*width,0.515*height);
  snaresButton.size(0.2*width,0.0775*height);
  snaresButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  snaresButton.mousePressed(snaresSelected);

  rimshotsButton = createButton("Rimshots");
  rimshotsButton.position(0.04*width,0.615*height);
  rimshotsButton.size(0.2*width,0.0775*height);
  rimshotsButton.style('background-color:#ffe4a9; color:#f7b818; border-style:hidden; font-family:"Helvetica"; font-size:2em');
  rimshotsButton.mousePressed(rimshotsSelected);
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
  updatePlayhead(); // Update position of playhead.
  drawPlayhead(); // Print playhead at current position
  playSound(); // Check for collision, play sounds.
}

function pause() { // Steps for sim if paused.
  drawUI(); // Draw UI.
  drawNotes();
  updatePlayhead(); // Update position of playhead.
  drawPlayhead(); // Draw playhead.

}

function selectSFX(){ // Opens menus to select SFX.

  selectingSFX=true;
}

function bpmUp(){
  bpm++;
  bpm=constrain(bpm,60,160);
}

function bpmDown(){
  bpm--;
  bpm=constrain(bpm,60,160);
}

function drawNotes() { // Draws the contents of notes[]

  for (let i = 0; i < notes.length; i++) {
    push();
    if(i==target){
      strokeWeight(2);
      stroke(255, 158, 229);
    }
    else{
      noStroke();
    }

    fill(notes[i].color);
    if (notes[i].isBeingMoved){
      notes[i].x = mouseX + notes[i].offsetX;
      notes[i].y = mouseY + notes[i].offsetY;
    }
    rect(notes[i].x,notes[i].y,notes[i].size,notes[i].size);
    pop();
  }


}

function newNote() { // Spawns new note

  if(!spawningNewNote){
    spawningNewNote=true;
    notes.push(new note());
    notes[notes.length-1].isBeingMoved=true;
    selectingOption=false;
  }

}

function drawUI() { // Draws the UI.

  push();
  background(255, 228, 169);

  fill(255, 202, 69);
  rect(width / 2, height, width * 0.9, height * 0.2, height * 0.05); // Bottom Bar UI

  fill(255, 211, 99);
  rect(width / 2, 0.5 * height, width, height * 0.75) // Timeline BG

  stroke(255, 228, 169); // Gridlines
  for (let i=0;i<16;i++){
    if(i==4 || i==8 || i==12 || i==16){
      strokeWeight(4);
    }
    else{
      strokeWeight(2);
    }
    line(0.0625*i*width, 0.125 * height, 0.0625*i*width, 0.875 * height );
  }

  fill(255, 202, 69);
  rect(width / 2, 0, width, height * 0.2); // Top Bar UI
  fill(255, 228, 169);
  rect((0.1 * width) + (8 * (0.0892 * height)), (0.052 * height),0.167 * height, 0.075 * height);

  fill(255, 202, 69); // BPM UI
  textAlign(CENTER,CENTER);
  textSize(50);
  textFont(rockin_record);
  text(bpm,(0.1 * width) + (8 * (0.0935 * height)),0.052*height);

  pop();

  if (target>=0){ // Bottom bar note-specific UI
    deleteNoteButton.show();
    spawnCopyNoteButton.show();
    selectSFXButton.show();
  }
  else{
    deleteNoteButton.hide();
    spawnCopyNoteButton.hide();
    selectSFXButton.hide();
  }

  if (selectingSFX){ // UI for selecting SFX.

    push();
    fill(255, 202, 69);
    stroke(255, 228, 169);
    strokeWeight(4);
    rect(0.25*width,0.5*height,0.45*width,0.7*height);
    rect(0.75*width,0.5*height,0.45*width,0.7*height);

    fill(255, 228, 169)
    rect(0.25*width,0.175*height,0.45*width,0.05*height);
    rect(0.75*width,0.175*height,0.45*width,0.05*height);

    fill(255, 202, 69);
    textAlign(CENTER,CENTER);
    textSize(50);
    textFont(rockin_record);
    text("SFX - Categories",0.25*width,0.175*height);


    clapsButton.show();
    hhcButton.show();
    hhoButton.show();
    kicksButton.show();
    percsButton.show();
    shakersButton.show();
    snaresButton.show();
    snapsButton.show();
    rimshotsButton.show();

    if(selection>=0){
      drawSelection();
    }

    pop();
  }
  else{
    clapsButton.hide();
    hhcButton.hide();
    hhoButton.hide();
    kicksButton.hide();
    percsButton.hide();
    shakersButton.hide();
    snaresButton.hide();
    snapsButton.hide();
    rimshotsButton.hide();
  }

}

function drawSelection(){ // Draws the content of the SFX selection folder.

  let r=0;
  let c=0;

  switch(selection){
    case 0: // Claps
      text("Category - Claps",0.75*width,0.175*height);
      let claps =[clap1,clap2,clap3,clap4,clap5,clap6,clap7,clap8];

      for(let i=0;i<claps.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 1: // HHO
      text("Category - HH Open",0.75*width,0.175*height);
      let hihatopen =[hho1,hho2,hho3,hho4,hho5];

      for(let i=0;i<hihatopen.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 2: // HHC
      text("Category - HH Closed",0.75*width,0.175*height);
      let hihatclosed =[hhc1,hhc2,hhc3,hhc4,hhc5,hhc6];

      for(let i=0;i<hihatclosed.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 3: // Kicks
      text("Category - Kicks",0.75*width,0.175*height);
      let kicks =[kick1,kick2,kick3,kick4,kick5,kick6,kick7];

      for(let i=0;i<kicks.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 4: // Percussion
      text("Category - Percussion",0.75*width,0.175*height);
      let perc =[perc1,perc2,perc3,perc4,perc5,perc6,perc7,perc8,perc9,perc10];

      for(let i=0;i<perc.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 5: // Shakers
      text("Category - Shakers",0.75*width,0.175*height);
      let shakers =[shaker1,shaker2,shaker3,shaker4,shaker5,shaker6];

      for(let i=0;i<shakers.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 6: // Snaps
      text("Category - Snaps",0.75*width,0.175*height);
      let snaps =[snap1,snap2,snap3,snap4,snap5,snap6];

      for(let i=0;i<snaps.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 7: // Snares
      text("Category - Snares",0.75*width,0.175*height);
      let snares =[snare1,snare2,snare3,snare4,snare5,snare6,snare7,snare8,snare9,snare10];

      for(let i=0;i<snares.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;

    case 8: // Rimshots
      text("Category - Rimshots",0.75*width,0.175*height);
      let rimshots=[rimshot1,rimshot2,rimshot3,rimshot4];

      for(let i=0;i<rimshots.length;i++){
        push();
        noStroke();
        fill(255, 228, 169);
        ellipse(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height) ,0.08*width,0.08*width);
        fill(255, 202, 69);
        text(i+1,width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height));
        if(c== 0){
          c=1;
        }
        else {
          c=0;
          r++;
        }
        pop();
      }
      break;
  }
}

function assignSFX(){ // Tries to assign new SFX based on mouse position.

  let r=0;
  let c=0;
  let d;

  switch(selection){
    case 0: // Claps
      let claps =[clap1,clap2,clap3,clap4,clap5,clap6,clap7,clap8];
      for(let i=0;i<claps.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = claps[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;

    case 1: // Hi Hat Open

      let hihatopen =[hho1,hho2,hho3,hho4,hho5];
      for(let i=0;i<hihatopen.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = hihatopen[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;

    case 2: // Hi Hat Closed
      let hihatclosed =[hhc1,hhc2,hhc3,hhc4,hhc5,hhc6];
      for(let i=0;i<hihatclosed.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = hihatclosed[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }

      break;

    case 3: // Kicks

      let kicks =[kick1,kick2,kick3,kick4,kick5,kick6,kick7];
      for(let i=0;i<kicks.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = kicks[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;

    case 4: // Percussion

      let perc =[perc1,perc2,perc3,perc4,perc5,perc6,perc7,perc8,perc9,perc10];
      for(let i=0;i<perc.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = perc[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;

    case 5: // Shakers

      let shakers =[shaker1,shaker2,shaker3,shaker4,shaker5,shaker6];
      for(let i=0;i<shakers.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = shakers[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;

    case 6: // Snaps

      let snaps =[snap1,snap2,snap3,snap4,snap5,snap6];
      for(let i=0;i<snaps.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = snaps[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;

    case 7: // Snares

      let snares =[snare1,snare2,snare3,snare4,snare5,snare6,snare7,snare8,snare9,snare10];
      for(let i=0;i<snares.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = snares[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }

      break;

    case 8: // Rimshots
      let rimshots=[rimshot1,rimshot2,rimshot3,rimshot4];

      for(let i=0;i<rimshots.length;i++){
        d=dist(width*0.65 +(0.2*width*c) ,height*0.275 + (r*0.125*height), mouseX,mouseY);
        if(d<=(0.08*width)/2){
          option=i;
          notes[target].sfx = rimshots[i];
          selectingSFX=false;
          break;
        }
        else{
          if(c== 0){
            c++;
          }
          else {
            c=0;
            r++;
          }
        }
      }
      break;
    }
}

function deleteTargetNote(){ // Call to delete target note.
  console.log("Deleting target: ",target," Source: Delete target button");
  notes.splice(target,1);
  target=-1;
}

function spawnCopyNote(){ // Spawns a copy of target note.
  newNote();
  notes[notes.length-1].size=notes[target].size;
  notes[notes.length-1].sfx=notes[target].sfx;
  notes[notes.length-1].color=notes[target].color;
  notes[notes.length-1].channel=notes[target].channel;
}

function setNoteVolume(target, x){ // Sets the valume of target note to x.
  notes[target].volume=x;
  notes[target].volume=constrain(notes[target].volume,0,100);
}

function toggleMetronome() { // Toggles the metronome on and off.
  if (metronome) {
    metronome = false;
    console.log("Metronome: ", metronome, " (Source: metronome button)");
  } else {
    metronome = true;
    console.log("Metronome: ", metronome, " (Source: metronome button)");
  }
}

function setToPlay() { // Sets the playing variable to true.

  playing = true;
  console.log("Resumed. (Source: Play Button)");
}

function setToPause() { // Sets the playing variable to false.

  playing = false;
  console.log("Paused. (Source: Pause Button)");
}

function setLooping() { // Sets the looping variable to true.

  looping = true;
  console.log("Looping: ,", looping, " (Source: Loop Button)");
}

function setnoloop() { // Sets the looping variable to false.
  looping = false;
  console.log("Looping: ,", looping, " (Source: Noloop Button)");

}

function updatePlayhead() { // Updates playhead position.

  if (playhead.isBeingMoved) {
    dragPlayhead();
  }
  else if (playing) {

    let pxPerRefresh = (width/16)*(bpm)*(1/(60*frameRate())) ;

    playhead.x += pxPerRefresh;

    console.log(playhead.x,pxPerRefresh , millis());

    if (playhead.x >= width) {
      playhead.x=0;
      for (let i = 0; i < notes.length; i++) {
        notes[i].played = false;
      }
      if (!looping) { // check if playlist looping is on
        playing = false;
        playhead.last = 0;
        console.log("Paused. (Looping is: ", looping, ")");
      }
    }
  }
}

function dragPlayhead() { // Handles user dragging playhead.
  playhead.x = mouseX + playhead.offsetX;
  playhead.x = constrain(playhead.x, 0, width);
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
  for (let i = 0; i < notes.length; i++) {
    let d = dist(playhead.x, notes[i].y, notes[i].x, notes[i].y);
    if (d < notes[i].size*0.05  && !(notes[i].played)) {
      notes[i].sfx.play();
      notes[i].played = true;
    }
  }
}

function pickupNote(n){ // note with index n will be set as being dragged.
  notes[n].isBeingMoved = true;
  notes[n].offsetX = notes[n].x - mouseX;
  notes[n].offsetY = notes[n].y - mouseY;
  spawningNewNote=false;
}

function mouseIsInsidePlayhead() { // Checks if mouse is inside the playhead.
  let d = dist(playhead.x,0.113 * height, mouseX,mouseY);
  if(d<=0.025 * height){
    return true;
  }
  else{
    return false;
  }

}

function mouseisInsideNote() { // Checks if the mouse is inside a note.
  for (let i=0;i<notes.length;i++){
    let d = dist(notes[i].x,notes[i].y,mouseX,mouseY);
    if(d<=notes[i].size){
      pickupNote(i);
      target=i;
      break;
    }
  }
}

function mouseReleased() { // Handles mouse releases.

  if (playhead.isBeingMoved) {
    for (let i = 0; i < notes.length; i++) {
      notes[i].played = false;
    }
    playhead.isBeingMoved = false;
    playhead.offsetX = 0;
    playhead.offsetY = 0;
    playhead.last = playhead.x;
  } else {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].isBeingMoved && !spawningNewNote) {
        for (let j = 0; j < notes.length; j++) {
          notes[j].played = false;
        }
        notes[i].y=constrain(notes[i].y,0.15*height,0.85*height);
        notes[i].isBeingMoved = false;
        notes[i].offsetX = 0;
        notes[i].offsetY = 0;
      }
    }
  }

}

function mousePressed() { // Handles what happens when mouse is clicked.

  if(mouseY<0.9*height){
    if(!selectingSFX){
      target=-1;
    }
  }

  if (mouseIsInsidePlayhead()) {
    playhead.isBeingMoved = true;
    playhead.offsetX = playhead.x - mouseX;
    selectingSFX=false;
  }
  else if(mouseY <0.125 * height && mouseY >0.10 * height){
    playhead.x=mouseX;
    playhead.last=mouseX;
    for (let i = 0; i < notes.length; i++) {
      notes[i].played = false;
    }

  }
  else if(selectingOption && selectingSFX){
    assignSFX();
  }
  else{
    mouseisInsideNote();
  }
}

function keyPressed(){ // Handles keyboard inputs.

  switch(keyCode){
    case 32: // Spacebar - Pause/Unpause
      if (playing) {
        console.log("Paused.");
        playing = false;
        playhead.x = playhead.last;
      } else {
        console.log(millis());
        console.log("Resumed.");
        playing = true;
        for (let i = 0; i < notes.length; i++) {
          notes[i].played = false;
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

    case 8: // Backspace  - Delete target Note.
      console.log("Deleting target: ",target, "Source: backspace");
      if(target>=0){
        deleteTargetNote();
      }
      target=-1;
      break;

    case 67: // C - Copy target Note.
    if(target>=0){
      spawnCopyNote();
    }
  }
}

function clapsSelected(){
  selection = 0;
  selectingOption=true;
}
function hhcSelected(){
  selection = 1;
  selectingOption=true;
}
function hhoSelected(){
  selection = 2;
  selectingOption=true;
}
function kicksSelected(){
  selection = 3;
  selectingOption=true;
}
function percsSelected(){
  selection = 4;
  selectingOption=true;
}
function shakersSelected(){
  selection = 5;
  selectingOption=true;
}
function snapsSelected(){
  selection = 6;
  selectingOption=true;
}
function snaresSelected(){
  selection = 7;
  selectingOption=true;
}
function rimshotsSelected(){
  selection = 8;
  selectingOption=true;
}
