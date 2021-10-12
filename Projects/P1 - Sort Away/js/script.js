// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";

let CW = 1000; // Canvas Width (CW)
let CANDLE_AMOUNT=75; // Number of candles to be sorted

let state = 'title'; // Can be: (title, running, paused, finished)

let arr = new Array; // Arr will hold the "height" of each candle. Their position within the array will describe their x position.
for (let i=0;i<CANDLE_AMOUNT;i++){ // Populate array with increasingly taller candles.
  arr[i]=i+1;
}

function preload() {

}

function setup() {
  createCanvas(CW,CW);
  background(255);
  scrambleArr();
  drawArr();


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

function scrambleArr(){ // Call to scramble the candles
  for(let i = 0; i<150; i++){
    let a = int(random(0,CANDLE_AMOUNT));
    let b = int(random(0,CANDLE_AMOUNT));
    let temp = arr[a];
    arr[a]=arr[b];
    arr[b]=temp;
  }

}

function drawSwap(a,b){ // Call to draw the swap between arr[a] and arr[b]
  
}

function drawArr(){
  rectMode(CORNERS);
  fill(0);
  for (let i=0;i<arr.length;i++){
    fill(arr[i]*5,0,150);
    rect(i*CW/CANDLE_AMOUNT,CW,(i*CW/CANDLE_AMOUNT)+CW/CANDLE_AMOUNT,CW-(arr[i]*CW/CANDLE_AMOUNT));
  }
}

function bubbleSort(){ // [1] - Bubble sort
   for (let i = 0; i < CANDLE_AMOUNT - 1; i++){
     for(let j= 0; j < CANDLE_AMOUNT - i - 1; j++){
       if(arr[j] > arr[j+1]){
         drawSwap(j,j+1);
         let temp = arr[j];
         arr[j]=arr[j+1];
         arr[j+1]=temp;
       }
     }
   }
}
