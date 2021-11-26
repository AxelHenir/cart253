class VDiagram{

  constructor(){

    this.cells = []; // Holds the cell objects
    this.cellsAmount = 125; // Tells us how many cells to make for the diagram

    this.spawningQueue = []; // Holds onto cells while we wait for them to spawn. Prevents clumping
    for (let i = 0; i<this.cellsAmount; i++){
      this.spawningQueue[i] = new Cell(500,500); // Cells are all set to spawn at 500,500.
    }

    this.siteStrokeOn = true; // Tracks if the cells sites get drawn
    this.cellStrokeOn = true; // Tracks if the cells' borders get drawn
    this.jitterAmount = 0; // tracks how much jitter is in the diagram
  }

  redraw(){ // Redraws the diagram

    // Decrement jitter (Introduced via clicking or by music)
    this.jitterAmount-=0.5;
    this.jitterAmount = constrain(this.jitterAmount,0,20);
    voronoiJitterFactor(this.jitterAmount);

    // Update Cells: Voronoi.p5 doesnt allow the movement of cells once the graph is drawn.
    // therefore, we must clear the diagram and redraw it with updated data to "animate" it.

    // Clear previous diagram
    voronoiClearSites();

    // Update the voronoi diagram (With cell objects stored in cells[])
    for(let i=0; i<this.cells.length; i++){

      // Tells each cell to evolve according to its evolution behavior.
      this.cells[i].evolve();

      // Return the color of the cell to its original
      if(this.cells[i].fill > this.cells[i].o_fill){

        // If the cell is brighter than it should be, dim it.
        this.cells[i].fill-=random(0,5);
        this.cells[i].fill = constrain(this.cells[i].fill,this.cells[i].o_fill,255);
      }
      else{

        // Otherwise, make the cell brighter.
        this.cells[i].fill+=random(0,5);
        this.cells[i].fill = constrain(this.cells[i].fill,0,this.cells[i].o_fill);
      }


      // The library's function to add a site to the diagram.
      voronoiSite(this.cells[i].x,this.cells[i].y,this.cells[i].fill);
    }

    // "Calculate" the diagram, required by library.
    voronoi(1000,1000,true);

    // Draw the diagram (finally!)
    voronoiDraw(0,0,true,true);
  }

  spawnSite(){

    if(this.spawningQueue.length>0){

      // Move the cell into the diagram
      this.cells.push(this.spawningQueue[0]);

      //console.log("Site Spawned. Cells[] now contains ",this.cells.length," elements.");

      // Remove the cell from the queue
      this.spawningQueue.splice(0,1);

      //console.log("SpawningQueue[] now contains ",this.spawningQueue.length," elements.");

    }
  }

  siteStroke(s){ // Sets or toggles the sites' stroke

    if(s==undefined){ // No stroke designated = toggle
      if(this.siteStrokeOn){ // If it's on, turn it off.
        voronoiSiteStrokeWeight(0);
        this.siteStrokeOn = false;
        console.log("Site stroke off");
      }
      else{ // If it's off, turn it on. (3 by default)
        voronoiSiteStrokeWeight(3);
        this.siteStrokeOn = true;
        console.log("Site stroke on");
      }
    }
    else{ // Stroke was designated = set it to the value given.
      voronoiSiteStrokeWeight(s);
      this.siteStrokeOn = true;
      console.log("Site stroke set to ",s);
    }
  }

  cellStroke(s){ // Sets or toggles the cells' stroke

    if(s==undefined){ // No stroke designated = toggle
      if(this.cellStrokeOn){ // If it's on, turn it off.
        voronoiCellStrokeWeight(0);
        this.cellStrokeOn=false;
        console.log("Cell stroke off");
      }
      else{ // If it's off, turn it on. (1 by default)
        voronoiCellStrokeWeight(1);
        this.cellStrokeOn=true;
        console.log("Cell stroke on");
      }
    }
    else{ // Stroke was designated = set it to the value given.
      voronoiCellStrokeWeight(s);
      this.cellStrokeOn=true;
      console.log("Cell stroke set to ",s);
    }

  }

  addJitter(j){ // Adds jitter to the diagram
    this.jitterAmount += j;
    this.jitterAmount = constrain(this.jitterAmount, 0, 20);
  }

  whiteout(){ // Makes everything white
    for(let i=0;i<this.cells.length;i++){
      this.cells[i].fill+=150;
    }
  }

  blackout(){
    for(let i=0;i<this.cells.length;i++){
      this.cells[i].fill-=150;
    }
  }

}
