// Diagram Class - Responsible for displaying the diagram and maintaining the cells' behaviors.

// There are 2 "pools" and a Queue which manage each cell in the diagram.
// The activeCells and reserveCells are the pools which hold cell objects.
// Active cells are cells which are currently onscreen, ie: in the diagram LIVE.
// Reserve cells are cells which COULD be added to the diagram. They're like backup cells in case we need more for the effect.
// The queue is the "waiting line" for cells to move from reserve to active.

// The diagram class also handles the spawning conditions of cell objects. BG_(EFFECT NAME) are example implementations.
// Cells will evolve on their own but the diagram handles how, where and when they spawn.
// The diagram also manages diagram-wide effects like jitter, border thickness, evolution speed and more.

class VDiagram{

  constructor(){

    this.cellSpeed = 0.5; // A value which manages the speed of effects

    this.cellAmount = 150; // Total cells in simulation

    this.jitterAmount = 0; // Jitter in diagram
    this.cellStrokeWeight = 3; // Cell stroke weight
    this.siteStrokeWeight = 0; // Site stroke weight

    this.activeCells = []; // The collection of cells actively being displayed
    this.enqueuedCells = []; // The collection of cells waiting to be displayed
    this.reserveCells = []; // The collection of cells that currently have no use

    for(let i = 0; i<this.cellAmount; i++){ // Populate reserve using cellAmount
      this.reserveCells.push(new Cell());
    }

    this.currentColor = Math.round(random(0,170));
    this.targetColor = this.currentColor;

  }

  redraw(){ // MAIN FUNCTION - Updates and redraws the diagram, essentially printing the next frame of the animation.

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

  diagramEffects(){ // Handles the evolution of diagram effects: cellSpeed, jitter, strokeweight, color, brightness.

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
    this.siteStrokeWeight = constrain(this.siteStrokeWeight,0,10);
    voronoiSiteStrokeWeight(this.siteStrokeWeight);

    // Cycle the color if needed.
    this.cycleColor();

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

  cleanupActiveCells(){ // Cleans up the city: scans activeCells for cells which are ready to de-spawn.

    // Scans for inactive cells and removes them from active.
    for(let i=0; i<this.activeCells.length; i++){

      // If a marked cell is found,
      if(this.activeCells[i].active == false){

        // Create a temporary container for the marked cell.
        let target = [];

        // Copy the cell from active to reserve.
        target.push(this.activeCells[i]);

        // Destroy the evidence.
        this.activeCells.splice(i,1);

        // Check for respawn
        if(target[0].respawn == true){

          // Respawn the cell. (Move this cell back to active)

          switch(target[0].b){

            case 0:
              this.BG_passBy(target[0]);
              break;

            case 1:
              this.BG_Orbit(target[0]);
              break;

            case 2:
              this.BG_Spiral(target[0]);
              break;

            case 3:
              this.BG_Vortex(target[0]);
              break;

            case 5:
              this.BG_SwerveDown(target[0]);
              break;

          }

        }
        else {

          // Otherwise, add it to reserve.
          this.reserveCells.push(target[0]);
        }

      }

    }

  }

  cullActiveCells(){ // Sets all active cells not to respawn.

    for(let i = 0; i<this.activeCells.length; i++){
      this.activeCells[i].respawn = false;
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

  cycleColor(){ // Adjusts the current color until it's the target color set by newScene()

    //
    if(this.currentColor != this.targetColor){
      this.currentColor +=0.25;
      this.currentColor = this.currentColor%360;

      for(let i = 0 ; i<this.activeCells.length; i++){
        this.activeCells[i].cellHue += 0.25;
        this.activeCells[i].cellHue = this.activeCells[i].cellHue%360;

      }

      for(let i = 0 ; i<this.enqueuedCells.length; i++){
        this.enqueuedCells[i].cellHue += 0.35;
        this.enqueuedCells[i].cellHue = this.enqueuedCells[i].cellHue%360;

      }

      for(let i = 0 ; i<this.reserveCells.length; i++){
        this.reserveCells[i].cellHue += 0.5;
        this.reserveCells[i].cellHue = this.reserveCells[i].cellHue%360;

      }

      //console.log("Current color ",this.currentColor,"target color",this.targetColor);

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

    this.cellStrokeWeight += 0.5;
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

    // Randomly determine new color
    this.targetColor += Math.round(random(100,150));
    this.targetColor = this.targetColor%360; // Cycles the current color

    switch(scene){

      case 0:
        this.queue_passBy(50);
        break;

      case 1:
        this.queue_Orbit(50);
        break;

      case 2:
        this.queue_Spiral(50);
        break;

      case 3:
        this.queue_Vortex(50);
        break;

      case 5:
        this.queue_swerveDown(50);
        break;
    }

  }

}
