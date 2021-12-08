class Cell{

  constructor(x=0,y=0){

    this.x = x; // Position X
    this.y = y; // Position Y

    this.ox = this.x; // Origin X
    this.oy = this.y; // Origin Y

    this.active = true; // when true, cell is not ready to be cleaned up.
    this.respawn = false; // when true, respawn the cell when it gets cleaned up.

    this.cellBrightness = 75;
    this.cellColor = color(random(200,245),75,this.cellBrightness); // Color of cell

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
      this.markForCleanup(true); // Respawn = true
    }

    // Behavior math
    this.x+=random(1,3);
    this.y = 75*sin(0.015*this.x)-(0.3*this.x)+this.oy+100;
  }

  // Orbit - 1
  orbit(){

    // Check for cleanup
    if(this.respawn == false){

      this.markForCleanup();
    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) + this.ox; // Orbits x w/r/t origin x
    this.y = this.radius*sin(this.theta) + this.oy; // Orbits y w/r/t origin y

    // Increment theta, angular velocity decreases with radius
    this.theta+=0.015;

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
    this.theta+=map(this.radius,0,750,0.025,0.01);

    // Increment radius
    this.radius+=0.5;

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
    this.theta+=map(this.radius,25,750,0.025,0.01);

    // Decrement radius
    this.radius-=0.5;

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

}
