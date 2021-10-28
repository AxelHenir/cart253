class Gold{

  constructor(){
    this.x=random(50,width-50);
    this.y=random(0.5*width,0.9*width);
    this.size=50;
    this.phase=0;
    this.collected=false;

  }

  phaseUp(){
    this.phase++;
    this.phase=constrain(this.phase,0,5);
  }

  display(){
    if(!this.collected){ // Only print non-collected golds.
      push();
      switch(this.phase){
        case 0:
          fill(255, 210, 46,42);
          break;
        case 1:
          fill(255, 210, 46,84);
          break;
        case 2:
          fill(255, 210, 46,126);
          break;
        case 3:
          fill(255, 210, 46,168);
          break;
        case 4:
          fill(255, 210, 46,210);
          break;
        case 5:
          fill(255, 210, 46,255);
          break;
      }
      stroke(0);
      ellipse(this.x,this.y,this.size);
      pop();
    }

  }

  collect(ball){
    if (this.collected || this.phase<5){
      return false;
    }
    else {
      let d = dist(ball.x,ball.y,this.x,this.y);
      if(d<= (this.size + ball.size)/2){
        this.collected=true;
        return true;
      }
      else{
        return false;
      }
    }


  }


}
