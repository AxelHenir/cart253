class VDiagram{

  constructor(){

    this.cellAmount = 150; // Total cells in simulation
    this.jitterAmount = 0;

    this.activeCells = []; // The collection of cells being displayed
    this.enqueuedCells = []; // The collection of cells waiting to be displayed
    this.reserveCells = []; // The collection of cells ready to be displayed

    for(let i = 0; i<this.cellAmount; i++){ // Populate reserve using cellAmount
      this.reserveCells.push(new Cell());
    }

  }

  redraw(){ // Redraws the diagram

    // Clear previous diagram
    voronoiClearSites();

    // Cleanup activeCells - moves cells from Active to Reserve if they are marked for cleanup.
    this.cleanupActiveCells();

    // Update the voronoi diagram (With cell objects stored in activeCells)
    for(let i=0; i<this.activeCells.length; i++){

      // Tell each cell to evolve accoridng to its individual parameters
      this.activeCells[i].evolve();

      // The library's function to add a site to the diagram.
      voronoiSite(this.activeCells[i].x,this.activeCells[i].y,this.activeCells[i].cellColor);
    }

    // Handle jitter
    this.handleJitter();

    // "Calculate" the diagram, required by library.
    voronoi(1000,1000,true,true);

    // draw the diagram
    voronoiDraw(0,0,true,true);

    console.log("Reserve: ",this.reserveCells.length," Enqueued: ",this.enqueuedCells.length," Active: ",this.activeCells.length);

  }

  handleJitter(){ // Decrements jitter
    this.jitterAmount-=0.25;
    this.jitterAmount=constrain(this.jitterAmount,0,10);
    voronoiJitterFactor(this.jitterAmount);
  }

  cleanupActiveCells(){ // Cleans up the city

    // Scans for inactive cells and removes them from active.
    for(let i=0; i<this.activeCells.length; i++){

      // If a marked cell is found,
      if(this.activeCells[i].active == false){

        // Copy the cell from active to reserve.
        this.reserveCells.push(this.activeCells[i]);

        // Destroy the evidence.
        this.activeCells.splice(i,1);

        // Check for respawn
        let c = this.reserveCells.pop();

        if(c.respawn == true){

          // Respawn the cell. (Move this cell back to active)
          this.respawnCell(c);

        }
        else {

          // Otherwise, add it to reserve.
          this.reserveCells.push(c);
        }

      }

    }

  }

  cullActiveCells(){ // Naturally stops the BG.

    for(let i = 0; i<this.activeCells.length; i++){
      this.activeCells[i].respawn = false;
      console.log(this.activeCells[i].respawn);
    }

  }

  respawnCell(cell){
    let b = cell.b;
    switch(b){

      case 0:
        this.BG_passBy(cell);
        break;

      case 1:
        this.BG_Orbit(cell);
        break;

      case 2:
        this.BG_Spiral(cell);
        break;

      case 3:
        this.BG_Vortex(cell);
        break;

    }
  }


  // EFFECTS (FX) & BACKGROUNDS (BG) ===========================================

  BG_passBy(c){ // passBy spawner and evolution (0)

    // Apply respawn math to cell.
    c.x = -100; // passBy
    c.y = random(0,1000); // passBy
    c.oy = c.y; // passBy
    c.b = 0 // passBy
    c.respawn = true; // passBy (BG = respawn)
    c.active = true;

    // Push onto enqueuedCells
    this.enqueuedCells.push(c);

  }

  BG_Orbit(c){ // Orbit spawner and evolution (1)

    c.active = true;
    c.theta = random(0,360); // Orbit
    c.radius = random(240,260); // Orbit
    c.ox = 500; // Orbit
    c.oy = 500; // Orbit
    c.b = 1; // Orbit
    c.respawn = true; // Orbit (BG = respawn)


    // Push onto enqueuedCells
    this.enqueuedCells.push(c);

  }

  BG_Spiral(c){ // Spiral spawner and evolution (2)

    c.active = true;
    c.theta = random(0,360); // Spiral
    c.radius = 0; // Spiral
    c.ox = 500; // Spiral
    c.oy = 500; // Spiral
    c.b = 2; // Spiral
    c.respawn = true; // Spiral (BG = respawn)

    // Push onto enqueuedCells
    this.enqueuedCells.push(c);

  }

  BG_Vortex(c){ // Vortex spawner and evolution (3)

    c.active = true;
    c.theta = random(0,360); // Vortex
    c.radius = 750; // Vortex
    c.ox = 500; // Vortex
    c.oy = 500; // Vortex
    c.b = 3; // vortex
    c.respawn = true; // Vortex (BG = respawn)

    // Push onto enqueuedCells
    this.enqueuedCells.push(c);

  }

  FX_Explosion(c){ // Explosion and evolution (4)

    c.active = true;
    c.theta = random(0,360); // Explosion
    c.radius = 0; // Explosion
    c.ox = 500; // Explosion
    c.oy = 500; // Explosion
    c.b = 4; // Explosion
    c.respawn = false; // Orbit (FX = no respawn)


    // Push onto activeCells
    this.activeCells.push(c);

  }

  // EFFECT QUEUES & SCENES ====================================================

  queue_Explosion(n){
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.FX_Explosion(this.reserveCells.pop());
      }
    }
  }

  queue_passBy(n){
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_passBy(this.reserveCells.pop());
      }
    }
  }

  queue_Orbit(n){
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_Orbit(this.reserveCells.pop());
      }
    }
  }

  queue_Spiral(n){
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_Spiral(this.reserveCells.pop());
      }
    }
  }

  queue_Vortex(n){
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_Vortex(this.reserveCells.pop());
      }
    }
  }

  dequeueCell(){ // Pushes cells from enqueuedCells to activeCells

    if(this.enqueuedCells.length>=1){
      this.activeCells.push(this.enqueuedCells.pop());
    }

  }

  changeScene(){
    this.cullActiveCells();
    let scene = random([0,1,2,3]);
    switch(scene){
      case 0:
        this.queue_passBy(25);
        break;

      case 1:
        this.queue_Orbit(25);
        break;

      case 2:
        this.queue_Spiral(25);
        break;

      case 3:
        this.queue_Vortex(25);
        break;
    }

  }

}
