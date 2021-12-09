class VDiagram{

  constructor(){

    this.cellSpeed = 0.5; // A value which manages the speed of effects

    this.cellAmount = 150; // Total cells in simulation

    this.jitterAmount = 0; // Jitter in diagram
    this.cellStrokeWeight = 3; // Cell stroke weight
    this.siteStrokeWeight = 3; // Site stroke weight

    this.activeCells = []; // The collection of cells actively being displayed
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

    // Handle diagram effects (Jitter, Strokeweight, etc.)
    this.diagramEffects();

    // "Calculate" the diagram, required by library.
    voronoi(1000,1000,true,true);

    // draw the diagram
    voronoiDraw(0,0,true,true);

    //console.log("Reserve: ",this.reserveCells.length," Enqueued: ",this.enqueuedCells.length," Active: ",this.activeCells.length);

  }

  diagramEffects(){

    // Decrement cellSpeed
    this.cellSpeed *= 0.95;
    diagram.cellSpeed = constrain(diagram.cellSpeed,0,6);

    // Reduce jitter
    this.jitterAmount-=0.2;
    this.jitterAmount=constrain(this.jitterAmount,0,10);
    voronoiJitterFactor(this.jitterAmount);

    // Reduce cellStrokeWeight
    this.cellStrokeWeight -= 0.15;
    this.cellStrokeWeight = constrain(this.cellStrokeWeight,0,10);
    voronoiCellStrokeWeight(this.cellStrokeWeight);

    // Reduce siteStrokeWeight
    this.siteStrokeWeight -= 0.05;
    this.siteStrokeWeight = constrain(this.siteStrokeWeight,3,10);
    voronoiSiteStrokeWeight(this.siteStrokeWeight);

    // Do color update for activeCells
    for(let i = 0; i<this.activeCells.length; i++){
      this.activeCells[i].cellColor = color(this.activeCells[i].cellHue,this.activeCells[i].cellSaturation,this.activeCells[i].cellBrightness);
    }

    // Do color update for enqueuedCells
    for(let i = 0; i<this.enqueuedCells.length; i++){
      this.enqueuedCells[i].cellColor = color(this.enqueuedCells[i].cellHue,this.enqueuedCells[i].cellSaturation,this.enqueuedCells[i].cellBrightness);
    }

    // Darken brightened activeCells
    for(let i = 0; i<this.activeCells.length; i++){
      if(this.activeCells[i].cellSaturation > 50){
        this.activeCells[i].cellSaturation -= 0.5;
        this.activeCells[i].cellSaturation = constrain(this.activeCells[i].cellSaturation,50,100);
      }
    }

    // Darken brightened enqueuedCells
    for(let i = 0; i<this.enqueuedCells.length; i++){
      if(this.enqueuedCells[i].cellSaturation > 50){
        this.enqueuedCells[i].cellSaturation -= 0.5;
        this.enqueuedCells[i].cellSaturation = constrain(this.enqueuedCells[i].cellSaturation,50,100);
      }
    }

    // Brighten darkened activeCells
    for(let i = 0; i<this.activeCells.length; i++){
      if(this.activeCells[i].cellSaturation < 50){
        this.activeCells[i].cellSaturation += 0.5;
        this.activeCells[i].cellSaturation = constrain(this.activeCells[i].cellSaturation,0,50);
      }
    }

    // Brighten darkened enqueuedCells
    for(let i = 0; i<this.enqueuedCells.length; i++){
      if(this.enqueuedCells[i].cellSaturation < 50){
        this.enqueuedCells[i].cellSaturation += 0.5;
        this.enqueuedCells[i].cellSaturation = constrain(this.enqueuedCells[i].cellSaturation,0,50);
      }
    }


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

  cullActiveCells(){ // Naturally stops the BG. (Sets all cells not to repsawn)

    for(let i = 0; i<this.activeCells.length; i++){
      this.activeCells[i].respawn = false;
      console.log(this.activeCells[i].respawn);
    }

  }

  cullEnqueuedCells(){ // Removes all cells from enqueuedCells and moves them to reserveCells

    // Move each element in enqueuedCells to reserveCells
    let len = this.enqueuedCells.length;
    for(let i = 0 ; i<len ; i++){

      // Moves the cell from enqueuedCells to reserveCells
      this.reserveCells.push(this.enqueuedCells.pop());

    }

  }

  respawnCell(cell){ // Takes Cell as input and calls its associated spawning function.
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

      case 5:
        this.BG_SwerveDown(cell);
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

  BG_SwerveDown(c){ // Swervedown and evolution (5)

    // Apply respawn math to cell.
    c.x = random(350,1100); // swerveDown
    c.y = -100; // swerveDown
    c.ox = c.x; // swerveDown
    c.b = 5 // swerveDown
    c.respawn = true; // swerveDown (BG = respawn)
    c.active = true;

    // Push onto enqueuedCells
    this.enqueuedCells.push(c);

  }

  // EFFECT QUEUES & SCENES ====================================================

  add_Jitter(j=5){ // Adds j amount of jitter to the diagram

    this.jitterAmount += j;
    this.jitterAmount = constrain(this.jitterAmount,0,12);

  }

  whiteout(){ // Sharply brightens all cells

    // Brighten all active cells
    for(let i = 0 ; i<this.activeCells.length ; i++){
      this.activeCells[i].cellSaturation -= 45;
      //this.activeCells[i].cellSaturation += 25;
    }

    // Brighten all enqueued cells
    for(let i = 0 ; i<this.enqueuedCells.length ; i++){
      this.enqueuedCells[i].cellSaturation -= 45;
      //this.enqueuedCells[i].cellSaturation -= 55;
    }

  }

  blackout(){ // Sharply darkens all cells

    // Darken all active cells
    for(let i = 0 ; i<this.activeCells.length ; i++){
      this.activeCells[i].cellSaturation += 45;
    }

    // Darken all enqueued cells
    for(let i = 0 ; i<this.enqueuedCells.length ; i++){
      this.enqueuedCells[i].cellSaturation += 45;
    }

  }

  thickenCellStroke(){ // Sharply increases the thickness of the cell's stroke

    this.cellStrokeWeight += 3;
    this.cellStrokeWeight = constrain(this.cellStrokeWeight, 0, 10);

  }

  thickenSiteStroke(){ // Sharply increases the thickness of the site's stroke

    this.siteStrokeWeight += 3;
    this.siteStrokeWeight = constrain(this.siteStrokeWeight, 0, 10);

  }

  queue_Explosion(n){ // Passes n cells to FX_Explosion
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.FX_Explosion(this.reserveCells.pop());
      }
    }
  }

  queue_passBy(n){ // Passes n cells to BG_passBy
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_passBy(this.reserveCells.pop());
      }
    }
  }

  queue_Orbit(n){ // Passes n cells to BG_Orbit
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_Orbit(this.reserveCells.pop());
      }
    }
  }

  queue_Spiral(n){ // Passes n cells to BG_Spiral
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_Spiral(this.reserveCells.pop());
      }
    }
  }

  queue_Vortex(n){ // Passes n cells to BG_Vortex
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_Vortex(this.reserveCells.pop());
      }
    }
  }

  queue_swerveDown(n){ // Passes n cells to BG_SwerveDown
    for (let i=0; i<n ; i++){
      if (this.reserveCells.length >= 1){
        this.BG_SwerveDown(this.reserveCells.pop());
      }
    }
  }

  dequeueCell(){ // Pushes cells from enqueuedCells to activeCells

    // Checks if there is an enqueued cell
    if(this.enqueuedCells.length>=1){

      // Moves the cell from enqueuedCells to activeCells
      this.activeCells.push(this.enqueuedCells.pop());

    }

  }

  newScene(){ // Generates and transitions to new scene

    // De-activate the current cells
    this.cullActiveCells();

    // Empty enqueued cells
    this.cullEnqueuedCells();

    // Randomly detemrine new BG
    let scene = random([0,1,2,3,5]);
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

      case 5:
        this.queue_swerveDown(25);
        break;
    }

  }

}
