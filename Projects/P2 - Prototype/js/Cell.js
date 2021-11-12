class Cell{

  constructor(x,y,fade){
    this.x = x;
    this.y = y;
    this.fill = random(100,150);
    this.theta = random(0,180);
    this.vtheta = 0.025;
    this.radius = 0;
    this.darken = fade;
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

  // Movement function
  spinspin(){

    // Update site position with trig (ooooh spooooooky trig!!!)
    this.x = this.radius*cos(this.theta) +500;
    this.y = this.radius*sin(this.theta) +500;

    // Adjust the roation speed to slow down as R increases.
    this.vtheta=map(this.radius,0,600,0.025,0.005);

    // Increment theta = (you spin me right round baby, right round..)
    this.theta+=this.vtheta;

    // Increment radius = (and I ran, I ran so far awaaaaay..)
    this.radius+=0.25+random(0.05,0.25);

    // Respawn site if leaving page
    if(this.x>=1100 || this.x<= -1100 || this.y>=1100 || this.y<= -1100){
      this.x = 500;
      this.y= 500;
      this.radius= 0;
      this.theta= random(0,180);
      this.vtheta=0.025;
      this.fill=random(100,150);
    }
  }

  // Color adjustment
  fadeCell(){

    // Each cell has a darken boolean, if it's true, the cell darkens over the course of its lifetime. If it's false, it becomes lighter.
    if(this.darken){
      this.fill+=0.1;
    }
    else{
      this.fill-=0.1;
    }
  }

}
