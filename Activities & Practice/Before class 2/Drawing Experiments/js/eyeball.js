class Eyeball{
  constructor(xpos, ypos){
    let eyeColor = color(250, 251, 252);
    let pupilColor = color(28, 30, 31);
    fill(eyeColor);
    circle(xpos,ypos,125);
    fill(pupilColor);
    ellipse((xpos-30),ypos,40,55);
  }
}
