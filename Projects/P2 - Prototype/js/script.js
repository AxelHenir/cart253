// Alex Henri - CART 253 Project 2 Prototype

"use strict";
let jitterAmount = 0; // Tracks jitter amount. Add to this to make the cells more jittery. 0 = no jitter.
let siteCoords = []; // Stores the coordinates of the sites.

function preload() {

}

function setup() {

  createCanvas(1000, 1000);

  // Generate initial sites and store the coordinate pairs.
  for(let i=0; i<75; i++){

    let x=random(0,1000);
    let y=random(0,1000);

    siteCoords.push([x,y]);
  }

  // Make the voronoi diagram (With sites from siteCoords[])
  for(let i=0; i<siteCoords.length; i++){
    voronoiSite(siteCoords[i][0],siteCoords[i][1], random(25,255));
  }

  // Calculate the diagram
  voronoi(1000,1000,true);

  // Get the diagrams info
  let diagram = voronoiGetCells();
	console.log(diagram);

  voronoiJitterStepMin(30);
  voronoiJitterStepMax(100);

}

function draw() {

  //  Background
  background(150);

  // Decrement jitter
  decrementJitter();

  // Redraw graph
  redrawSites();

  // Displace Cells
  displaceCells();

  // Calculate the diagram
  voronoi(1000,1000,true);

  // Draw the diagram
  voronoiDraw(0,0,true,true);
}

function redrawSites(){

  // Clear previous diagram
  voronoiClearSites();

  // Make the voronoi diagram (With sites from siteCoords[])
  for(let i=0; i<siteCoords.length; i++){
    voronoiSite(siteCoords[i][0],siteCoords[i][1], 150);
  }
}

function displaceCells(){
  for(let i=0;i<siteCoords.length;i++){
    siteCoords[i]=[siteCoords[i][0]+random(0,10),siteCoords[i][1]+random(0,10)];
    if(siteCoords[i][0] >= 1000){
      siteCoords[i][0]=0;
    }
    if(siteCoords[i][1] >= 1000){
      siteCoords[i][1]=0;
    }
  }
}

function decrementJitter(){   // Decrement jitter

  if(jitterAmount>0){
    jitterAmount-=0.3; // Jitter amount decay, Low = slow.
  }
  else{
    jitterAmount=0;
  }
  voronoiJitterFactor(jitterAmount);
}

function newDiagram(){

  // Clear previous diagram
  voronoiClearSites();

  // Clear Previous site coordinates
  siteCoords=[];

  // Generate & store the sites' coordinate pairs
  for(let i=0; i<75; i++){

    let x=random(0,1000);
    let y=random(0,1000);

    siteCoords.push([x,y]);
  }

  // Make the voronoi diagram (With sites from siteCoords[])
  for(let i=0; i<siteCoords.length; i++){
    voronoiSite(siteCoords[i][0],siteCoords[i][1], random(25,255));
  }
}

function mousePressed(){ // Mouse Click = Introduce Jitter
  jitterAmount=12;
}

function keyPressed(){ // Checks all keys pressed
  switch(keyCode){

    case 32: // Spacebar = play / pause
      if(isLooping()){
        noLoop();
      }
      else{
        loop();
      }
      break;

    case 81: // Q = Brand new diagram
      newDiagram();
      break;


  }

}
