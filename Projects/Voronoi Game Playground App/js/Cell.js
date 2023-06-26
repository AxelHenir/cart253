// Cells are the moving parts of the diagram

// Cells are birthed by the diagram overlord (spawned in) but they evolve in their own personal way.
// Cells have attributes such as their position and color.
// Attributes are qualities of the cell which are affected by its behavior.
// A cell is given a designated behavior when it spawns and it tells it how to act in the diagram.
// When a cell is finished its evolution, it gets maked for inactivity.
// Diagram will see this mark and clean it up to maintain constant memory.

class Cell{

  constructor(x=0,y=0){

    this.x = x; // Position X
    this.y = y; // Position Y

    this.ox = this.x; // Origin X
    this.oy = this.y; // Origin Y

    this.active = true; // when true, cell is not ready to be cleaned up.
    this.respawn = false; // when true, respawn the cell when it gets cleaned up.

    this.cellHue = random(200,210);
    this.cellSaturation = 50;
    this.cellBrightness = 80;
    this.cellColor = (this.cellHue,this.cellSaturation,this.cellBrightness); // Color of cell

    this.theta = 0; // Angle from positive X axis
    this.radius = 0; // Radius

    this.b = 0; // Behavior

  }

  // Evolve the cell
  evolve(){

    // Each evolution behavior is given an ID.
    switch (this.b){

      case 0:
        this.passBy();
        break;

      case 1:
        this.orbit();
        break;

      case 2:
        this.spiral();
        break;

      case 3:
        this.vortex();
        break;

      case 4:
        this.explosion();
        break;

      case 5:
        this.swerveDown();
        break;

    }
  }

  markForCleanup(){ // Marks the cell for cleanup
    this.active=false;
  }

  // EVOLUTION BEHAVIORS =======================================================

  // passBy - 0
  passBy(){

    // Expiration check
    if(this.x > 1100){
      this.markForCleanup();
    }

    // Behavior math
    this.x+= (diagram.cellSpeed*2.5)+1;
    this.y = 75*sin(0.015*this.x)-(0.3*this.x)+this.oy+100;
  }

  // Orbit - 1
  orbit(){

    // Check for cleanup
    if(this.respawn == false){

      // Decay animation, stray to exterior
      this.radius += diagram.cellSpeed*1.5 +1;
      if(this.radius >= 750){
        this.markForCleanup();
      }


    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) + this.ox; // Orbits x w/r/t origin x
    this.y = this.radius*sin(this.theta) + this.oy; // Orbits y w/r/t origin y

    // Increment theta, angular velocity decreases with radius
    //this.theta += 0.015;

    this.theta += diagram.cellSpeed*0.005 + 0.01;

  }

  // Spiral - 2
  spiral(){

    if(this.radius >= 750){
      this.markForCleanup();
    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) + 500; // Orbits x w/r/t origin x
    this.y = this.radius*sin(this.theta) + 500; // Orbits y w/r/t origin y

    // Increment theta, angular velocity decreases with radius
    this.theta+=diagram.cellSpeed*random(0.005,0.01) + 0.015;

    // Increment radius
    this.radius+=diagram.cellSpeed*0.6 + random(0.25,0.75);

  }

  // Vortex - 3
  vortex(){

    if(this.radius <= 25){
      this.markForCleanup();
    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) + this.ox; // Orbits x w/r/t origin x
    this.y = this.radius*sin(this.theta) + this.oy; // Orbits y w/r/t origin y

    // Increment theta, angular velocity decreases with radius
    this.theta-=diagram.cellSpeed*random(0.005,0.01) + 0.015;


    // Decrement radius
    //this.radius-=0.5;
    this.radius-=diagram.cellSpeed*0.6 + random(0.25,0.75);

  }

  // Explosion - 4
  explosion(){

    // Respawn site if leaving page
    if(this.radius >= 750){
      this.markForCleanup();
    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) + this.ox;
    this.y = this.radius*sin(this.theta) + this.oy;

    // Increment radius, speed based on distance from center.
    this.radius+= map(this.radius,0,750,6,1);

  }

  // swerveDown - 5
  swerveDown(){

    // Expiration check
    if(this.y > 1100){
      this.markForCleanup();
    }

    // Behavior math
    this.x = 100*cos(0.0125*this.y) + (0.3*this.y) + this.ox -300;
    this.y += (diagram.cellSpeed*2.5) + 1 ;
  }

}
