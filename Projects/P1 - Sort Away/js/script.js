// PROJECT 1: SORT-EM
// By: Alex Henri - Concordia University, CART Program Fall 2021.
"use strict";

let CW = 1000; // Canvas Width (CW)
let CANDLE_AMOUNT=100; // Number of candles to be sorted

let state = 'title'; // Can be: (title, running, paused, finished)

let candle ={
  width:CW/CANDLE_AMOUNT,
  height:0,
  y:CW,
  x:0,
  
}



function preload() {

}

function setup() {
  createCanvas(CW,CW);
}

function draw() {
  switch(state){
    case 'title':
      title();
      break;
    case 'running':
      running();
      break;
  }
}

function title(){

}

function running(){

}
