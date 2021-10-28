class Ball {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 50;
    this.active = true;
  }

  gravity(force) {
    this.ay = this.ay + force;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y - this.size/2 > height) {
      this.active = false;
    }
  }

  bounce(paddle) {
    if (this.x > paddle.x - paddle.width/2 - 0.8*this.size/2 && // Ball's x is within the X bounds of the paddle
        this.x < paddle.x + paddle.width/2 + 0.8*this.size/2 &&
        this.y > height-2*paddle.height) {

      let dx = this.x - paddle.x; // Bounce
      this.vx = this.vx + map(dx,-paddle.width/2,paddle.width/2,-2.3,2.3);

      this.vy = -this.vy;
      this.ay = 0;

      return true;
    }
    else if(this.x>=width-this.size/2){ // Bounce off right wall,
      if(this.vx>=0){
        this.vx *= -1;
      }
    }
    else if(this.x<this.size/2){ // Bounce off left wall,
      if(this.vx<=0){
        this.vx *= -1;
      }
    }
  }

  display() {
    push();
    fill(255,50,50);
    stroke(0);
    ellipse(this.x,this.y,this.size);
    pop();
  }

}
