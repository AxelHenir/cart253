class Cell{

  constructor(x,y){

    // Cartesion Tracking
    this.x = x; // Position X
    this.y = y; // Position Y
    this.fill = random(50,200); // Color of cell

    this.o_x = this.x; // Origin X
    this.o_y = this.y; // Origin Y

    // Polar Coordinate Tracking
    this.theta = random(0,180); // Angle
    this.vtheta = 0.025; // Angular velocity
    this.radius = 0; // Radius

    this.o_theta = this.theta // Angle origin
    this.o_r = this.radius // Radius origin

    this.o_fill = this.fill;

    this.evolutionBehavior=2; // ID that decides evolution pattern
  }

  // Getters
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getFill(){
    return this.fill;
  }

  // Setters
  setX(x){
    this.x = x;
  }
  setY(y){
    this.y = y;
  }
  setFill(fill){
    this.fill = fill;
  }


  // Evolve the cell
  evolve(){

    // Each evolution behavior is given an ID.
    switch (this.evolutionBehavior){

      case 1:
        this.orbit();
        break;

      case 2:
        this.shootingStar();
        break;

      case 3:
        this.blink();
        break;

    }

  }

  respawn(){
    this.x = 500;
    this.y = 500;
    this.fill = this.fill; // Fill carries over
    this.theta = random(0,180);
    this.vtheta = 0.025;
    this.radius = 0;

    this.evolutionBehavior=random([1,2]); // Orbits
  }

  // Movement functions (Evolution behaviors) ==================================

  // Spawn in center, expand outwards in orbital motion
  orbit(){

    if(this.radius >= 750){
      this.respawn();
    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) + 500; // Orbits x w/r/t origin x
    this.y = this.radius*sin(this.theta) + 500; // Orbits y w/r/t origin y

    // Adjust the roation speed to slow down as R increases
    this.vtheta=map(this.radius,0,600,0.025,0.005);

    // Increment theta
    this.theta+=this.vtheta;

    // Increment radius
    this.radius+=0.25;

  }

  // Spawn in center, fly outwards quickly
  shootingStar(){

    // Respawn site if leaving page
    if(this.radius >= 750){
      this.respawn();
    }

    // Update site position using polar coords
    this.x = this.radius*cos(this.theta) +this.o_x; // Orbits x w/r/t origin x
    this.y = this.radius*sin(this.theta) +this.o_y; // Orbits y w/r/t origin y

    // Increment radius, speed based on distance from center.
    this.radius+= map(this.radius,0,750,5,1);

  }

  // Spawn in random spot on page
  blink(){

    // Respawn site if leaving page
    if(this.r >= 750){
      this.respawn();
    }

    // If a condition is met, the cell will teleport
    if(true){
      this.x = random(this.x-20,this.x+20);
      this.y = random(this.y-20,this.y+20);
    }

  }




}
