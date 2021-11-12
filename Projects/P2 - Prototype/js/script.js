// Alex Henri - CART 253 Project 2 Prototype

"use strict";
let jitterAmount = 0; // Tracks jitter amount. Add to this to make the cells more jittery. 0 = no jitter.
let cells = []; // Stores the cell objects.
let cellAmount = 150; // Amount of cells to generate in the program.
let spawnerInterval = setInterval(spawnSite,250); // The interval which spawns the initial sites.
let siteStrokeOn=true; // Tracks if the cells sites get drawn
let cellStrokeOn = true; // Tracks if the cells' borders get drawn


function preload() {

}

function setup() {

  createCanvas(1000, 1000);

  // Update the voronoi diagram (With sites from cells[])
  for(let i=0; i<cells.length; i++){
    voronoiSite(cells[i].getX(),cells[i].getY(), cells[i].getFill());
  }

  // Calculate the diagram
  voronoi(1000,1000,true);

  // Set jitter parameters.
  voronoiJitterStepMin(30);
  voronoiJitterStepMax(100);

}

function draw(){

  // Background
  background(150);

  // Redraw the diagram
  redrawVoronoiDiagram();
}

function spawnSite(){ // Function responsible for spawning sites

  if(cellAmount>0){
    cells.push(new Cell(500,500,random([true,false])));
    cellAmount--;
  }
}

function redrawVoronoiDiagram(){ // Function responsible for updating the diagram

  // Decrement jitter
  decrementJitter();

  // Update Cells: Voronoi.p5 doesnt allow the movement of cells once the graph is drawn.
  // therefore, we must clear the diagram and redraw it with updated data to animate it.
  updateCells();

  // "Calculate" the diagram, required by library.
  voronoi(1000,1000,true);

  // Draw the diagram (finally!)
  voronoiDraw(0,0,true,true);
}

function updateCells(){

  // Clear previous diagram, we're gonna rebuild him, we have the technology.
  voronoiClearSites();

  // Update the voronoi diagram (With cell objects stored in cells[])
  for(let i=0; i<cells.length; i++){

    // spinspin() "spins" the cells. It's how the cells move between iterations.
    // In the future, this function can be something entirely different to create cool(er) patterns!
    cells[i].spinspin();

    // fadeCell() adjusts the cells shade as it moves.
    cells[i].fadeCell();

    // The library's function to add a site to the diagram. My cell class tracks the charcateristics of each cell.
    voronoiSite(cells[i].getX(),cells[i].getY(), cells[i].getFill());
  }
}

function decrementJitter(){   // Decrement jitter (Introduce jitter by clicking, it's subtle)

  if(jitterAmount>0){
    jitterAmount-=0.3; // Jitter amount decay, Low = slow.
  }
  else{
    jitterAmount=0;
  }
  voronoiJitterFactor(jitterAmount);
}

function mousePressed(){ // Mouse Click = Introduce Jitter

  // This is an arbitrary amount of jitter I find works best. Increase for more, decrease for less.
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

    case 81: // Q = Draw sites on/off
      if(siteStrokeOn){
        voronoiSiteStrokeWeight(0);
        siteStrokeOn=false;
      }
      else{
        voronoiSiteStrokeWeight(3);
        siteStrokeOn=true;
      }
      break;

    case 87: // W = Draw cell stroke on/off
      if(cellStrokeOn){
        voronoiCellStrokeWeight(0);
        cellStrokeOn=false;
      }
      else{
        voronoiCellStrokeWeight(1);
        cellStrokeOn=true;
      }
      break;



  }

}
