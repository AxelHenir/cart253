// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";

let CW = 1000; // Canvas Width (CW)
let CANDLE_AMOUNT=75; // Number of candles to be sorted

let state = 'title'; // Can be: (title, running, paused, finished)

let cHolder = new Array();
function candle(){
  this.width=CW/CANDLE_AMOUNT;
  this.height=0;
  this.y=CW;
  this.x=0;
  this.hue=0;
}

function preload() {

}

function setup() {
  createCanvas(CW,CW);

  setupCandles();
  scrambleCandles();

  bubbleSort();
  showCandles();

}

function draw() {

  switch(state){
    case 'title':
      title();
      break;
    case 'running':
      running();
      break;
    case 'finished':
      finished();
  }
}

function title(){

}

function running(){

}

function finished(){
  console.log('Done!');
}

function setupCandles(){
  for(let i=0;i<CANDLE_AMOUNT;i++){
    for (let i=0;i<CANDLE_AMOUNT;i++){
      cHolder.push(new candle);
    }
    cHolder[i].x = cHolder[i].width*i;
    cHolder[i].height = (cHolder[i].width*i)+cHolder[i].width;
    cHolder[i].hue = cHolder[i].height*360/CW // Hue depends on height
  }
}

function scrambleCandles(){
  for(let i = 0; i<150; i++){
    let a = int(random(0,CANDLE_AMOUNT));
    let b = int(random(0,CANDLE_AMOUNT));
    let temp = cHolder[a].x;
    cHolder[a].x=cHolder[b].x;
    cHolder[b].x=temp;
  }

}

function showCandles(){
  for(let i=0;i<CANDLE_AMOUNT;i++){
    colorMode(HSL);
    rectMode(CORNERS);
    fill(cHolder[i].hue,100,50);
    rect(cHolder[i].x,cHolder[i].y,cHolder[i].x+cHolder[i].width,height-cHolder[i].height);
  }
}

function bubbleSort(){
  let sorted=false;
   for (let i = 0; i < CANDLE_AMOUNT - 1; i++){
     for(let j= 0; j < CANDLE_AMOUNT - i - 1; j++){
       if(cHolder[j].x > cHolder[j+1].x){
         let temp = cHolder[j].x;
         cHolder[j].x=cHolder[j+1].x;
         cHolder[j+1].x=temp;
       }
     }
   }
}
