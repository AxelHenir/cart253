// Exercise 5: Love, Actually.
// Alex Henri - 40108348

"use strict";

let user = {face:'up',vision:3}
let GRID_SIZE = 30;

let grid = new Array(GRID_SIZE); // Creates an N x N array. (Where N = GRID_SIZE)
for (let i=0;i<grid.length;i++){
  grid[i]=new Array(GRID_SIZE);
}

let state = 'title'; // title, searching, foundLove, foundSecret
let input = '0';
let newState = true;

let userUp;
let userDown;
let userRight;
let userLeft;
let love;
let wall;
let upgrade;
let empty1;
let empty2;
let empty3;
let empty4;
let empty5;
let empty6;
let empty7;
let empty8;
let empty9;

function preload() {
userUp = loadImage('assets/images/user-up.png');
userDown = loadImage('assets/images/user-down.png');
userLeft = loadImage('assets/images/user-left.png');
userRight = loadImage('assets/images/user-right.png');

love= loadImage('assets/images/love.png');

wall = loadImage('assets/images/wall.png');

upgrade = loadImage('assets/images/upgrade.png');

empty1 = loadImage('assets/images/empty-1.png');
empty2 = loadImage('assets/images/empty-2.png');
empty3 = loadImage('assets/images/empty-3.png');
empty4 = loadImage('assets/images/empty-4.png');
empty5 = loadImage('assets/images/empty-5.png');
empty6 = loadImage('assets/images/empty-6.png');
empty7 = loadImage('assets/images/empty-7.png');
empty8 = loadImage('assets/images/empty-8.png');
empty9 = loadImage('assets/images/empty-9.png');
}

function setup() {
  createCanvas(windowHeight,windowHeight);
  newSearch();
}

function draw() {
  switch (state){
    case 'title':
      title();
      break;
    case'searching':
      searching();
      break;
    case 'foundLove':
      foundLove();
      break;
    case 'foundSecret':
      foundSecret();
      break;
  }
}

function foundLove(){
  background(255);
  push();
  textSize(64);
  fill(237, 149, 203);
  textAlign(CENTER,CENTER);
  text('LOVELY.',windowHeight/2,windowHeight*0.45);
  textSize(32);
  text('TYPE "AGAIN" \n TO GO AGAIN', windowHeight/2,windowHeight*0.55);
  pop();

  if (input.includes('again')) {
    state = 'searching';
    input ="0";
    newSearch();
  }
}

function title(){
  background(255);
  push();
  textSize(64);
  fill(237, 149, 203);
  textAlign(CENTER,CENTER);
  text('FIND LOVE',windowHeight/2,windowHeight*0.45);
  textSize(32);
  text('TYPE "BEGIN" \n TO BEGIN', windowHeight/2,windowHeight*0.55);

  fill(252, 186, 3);
  textSize(32);
  text('TYPE "UP" \n TO MOVE UP', windowHeight/2,windowHeight*0.2);
  text('TYPE "DOWN" \n TO MOVE DOWN', windowHeight/2,windowHeight*0.8);
  text('TYPE "LEFT" \n TO MOVE LEFT', windowHeight*0.2,windowHeight/2);
  text('TYPE "RIGHT" \n TO MOVE RIGHT', windowHeight*0.8,windowHeight/2);
  pop();

  if (input.includes('begin')) {
    state = 'searching';
    input ="0";
    newSearch();
  }
}

function searching() {
  checkInstruction();
  if (newState){
    showGrid();
    newState=false;
  }
}

function newSearch(){ // "Call to restart the search."
  console.log('new search started');
  for(let i =0;i<GRID_SIZE;i++){ // Empty grid.
    for(let j =0;j<GRID_SIZE;j++){
      grid[i][j] = 'empty';
    }
  }

  let a = random([0,1,2,GRID_SIZE-1,GRID_SIZE-2,GRID_SIZE-3]); // Spawn user
  let b = int(random(0,GRID_SIZE-1));
  grid[a][b] = 'user';
  user.x = a;
  user.y = b;
  console.log("User spawned -  A:",a," B:",b);

  if(a<GRID_SIZE/2){ // Spawn Love
    a= (GRID_SIZE - int(random(1,10)));
  }
  else{
    a = int(random(0,10));
  }
    b = int(random(1,GRID_SIZE-2));
  grid[a][b] = 'love';
  console.log("Love spawned -  A:",a," B:",b);


  for(let i=0;i<6;i++){ // Spawn X Large obstacles.
    let placing = true;
    while(placing){
      let a = int(random(4,GRID_SIZE-5));
      let b = int(random(4,GRID_SIZE-5));
      let occupied = false;
      for(let j=a-3;j<a+3;j++){
        for(let k=b-3;k<b+3;k++){
          if(grid[j][k]!='empty'){
            occupied = true;
          }
        }
      }
      if(!occupied){
        for(let j=a-3;j<a+3;j++){
          for(let k=b-3;k<b+3;k++){
            grid[j][k]='wall';
            }
          }
        placing = false
      }
    }
  }

  for(let i=0;i<3;i++){ // Spawn X upgrades
    let placing = true;
    while(placing){
      let a = int(random(4,GRID_SIZE-5));
      let b = int(random(4,GRID_SIZE-5));
      let occupied = false;
      if(grid[a][b]=='empty'){
        grid[a][b]='upgrade';
        placing=false;
      }
      }
    }

}

function showGrid(){ // Call to print the grid state to the screen.
  imageMode(CENTER,CENTER);
  rectMode(RADIUS);
  fill(130);
  stroke(0);
  rect(windowHeight/2,windowHeight/2,0.45*windowHeight,0.45*windowHeight);

  let rows = 2*user.vision + 1;
  let gLine = 1/rows;

  for(let i=1;i<rows;i++){ // Print gridlines.
    stroke(0);
    line((0.05*windowHeight + i*gLine*0.9*windowHeight),0.05*windowHeight,(0.05*windowHeight + i*gLine*0.9*windowHeight),0.95*windowHeight);
    line(0.05*windowHeight,(0.05*windowHeight + i*gLine*0.9*windowHeight),0.95*windowHeight,(0.05*windowHeight + i*gLine*0.9*windowHeight));
  }
  let r=0;
  let c=0;

  for(let i=(user.x-user.vision);i<(user.x+user.vision+1);i++){
    r++;
    c=0;
    for(let j=user.y-user.vision;j<user.y+user.vision+1;j++){
      c++;
      if(i<0 || i>GRID_SIZE-1 || j<0 || j>GRID_SIZE-1){
        image(wall,(0.05*windowHeight + (r*gLine-0.5*gLine)*0.9*windowHeight),(0.05*windowHeight + (c*gLine-0.5*gLine)*0.9*windowHeight),gLine*0.9*windowHeight,gLine*0.9*windowHeight);
      }
      else{
        let result = grid[i][j];
        switch (result){
          case "user":
            drawUser(0.05*windowHeight + (r*gLine-0.5*gLine)*0.9*windowHeight,(0.05*windowHeight + (c*gLine-0.5*gLine)*0.9*windowHeight),gLine*0.9*windowHeight,gLine*0.9*windowHeight);
            break;
          case "wall":
            image(wall,(0.05*windowHeight + (r*gLine-0.5*gLine)*0.9*windowHeight),(0.05*windowHeight + (c*gLine-0.5*gLine)*0.9*windowHeight),gLine*0.9*windowHeight,gLine*0.9*windowHeight);
            break;
          case "empty":
            fill(155, 141, 166);
            drawEmpty(0.05*windowHeight + (r*gLine-0.5*gLine)*0.9*windowHeight,(0.05*windowHeight + (c*gLine-0.5*gLine)*0.9*windowHeight),gLine*0.9*windowHeight,gLine*0.9*windowHeight);
            break;
          case "upgrade":
            image(upgrade,(0.05*windowHeight + (r*gLine-0.5*gLine)*0.9*windowHeight),(0.05*windowHeight + (c*gLine-0.5*gLine)*0.9*windowHeight),gLine*0.9*windowHeight,gLine*0.9*windowHeight);
            break;
          case "love":
            drawLove(0.05*windowHeight + (r*gLine-0.5*gLine)*0.9*windowHeight,(0.05*windowHeight + (c*gLine-0.5*gLine)*0.9*windowHeight),gLine*0.9*windowHeight,gLine*0.9*windowHeight);
            break;
          case "secret":

        }
      }
    }
  }

}

function drawEmpty(x,y,w,h){
  let empties = [empty1,empty2,empty3,empty4,empty5,empty6,empty7,empty8,empty9];
  image(random(empties),x,y,w,h);
}

function drawLove(x,y,w,h){
  image(love,x,y,w,h);
}

function drawUser(x,y,w,h){
  imageMode(CENTER,CENTER);
  switch (user.face){
    case 'up':
      image(userUp,x,y,w,h);
      break;
    case 'down':
      image(userDown,x,y,w,h);
      break;
    case 'right':
      image(userRight,x,y,w,h);
      break;
    case 'left':
      image(userLeft,x,y,w,h);
      break;
  }
}

function checkInstruction(){  //There are 4 instructions the user can type: Up, down, left and right.

  console.log(input);
  if(input.includes('down')){
    move('down');
    input = "0";
  }
  else if (input.includes('up')){
    move('up');
    input ="0";
  }
  else if (input.includes('left')){
    move('left');
    input ="0";
  }
  else if (input.includes('right')){
    move('right');
    input ="0";
  }
  else if (input.includes('begin')) {
    state = 'searching';
    input ="0";
  }
}

function move(str){
  let direction = str;
  switch (direction){

    case 'up':
    user.face='up';
      if(user.y-1<=0){
        break;
      }
      else if (grid[user.x][user.y-1]=='wall'){
        break;
      }
      else if (grid[user.x][user.y-1]=='upgrade'){
        grid[user.x][user.y-1]='empty';
        user.vision++;
        grid[user.x][user.y]=grid[user.x][user.y-1];
        user.y--;
        break;
      }
      else if (grid[user.x][user.y-1]=='love'){
        state='foundLove';
        break;
      }
      else{
        grid[user.x][user.y]=grid[user.x][user.y-1];
        user.y--;
        break;
      }
      break;


    case 'down':
    user.face='down';
      if(user.y+1>=GRID_SIZE){
        break;
      }
      else if (grid[user.x][user.y+1]=='wall'){
        break;
      }
      else if (grid[user.x][user.y+1]=='upgrade'){
        grid[user.x][user.y+1]='empty';
        user.vision++;
        grid[user.x][user.y]=grid[user.x][user.y+1];
        user.y++;
        break;
      }
      else if (grid[user.x][user.y+1]=='love'){
        state='foundLove';
        break;
      }
      else{
        grid[user.x][user.y]=grid[user.x][user.y+1];
        user.y++;
        break;
      }
      break;


    case 'left':
    user.face='left';
        if(user.x-1<=0){
          break;
        }
        else if (grid[user.x-1][user.y]=='wall'){
          break;
        }
        else if (grid[user.x-1][user.y]=='upgrade'){
          grid[user.x-1][user.y]='empty';
          user.vision++;
          grid[user.x][user.y]=grid[user.x][user.y-1];
          user.x--;
          break;
        }
        else if (grid[user.x-1][user.y]=='love'){
          state='foundLove';
          break;
        }
        else{
          grid[user.x][user.y]=grid[user.x-1][user.y];
          user.x--;
          break;
        }
        break;


      case 'right':
      user.face='right';
        if(user.x+1>=GRID_SIZE){
          break;
        }
        else if (grid[user.x+1][user.y]=='wall'){
          break;
        }
        else if (grid[user.x+1][user.y]=='upgrade'){
          grid[user.x+1][user.y]='empty';
          user.vision++;
          grid[user.x][user.y]=grid[user.x+1][user.y];
          user.x++;
          break;
        }
        else if (grid[user.x][user.y+1]=='love'){
          state='foundLove';
          break;
        }
        else{
          grid[user.x][user.y]=grid[user.x+1][user.y];
          user.x++;
          break;
        }
        break;
        }
      grid[user.x][user.y]='user';
      newState=true;

}

function keyPressed(){
  switch (keyCode){
    case 85:
      input = input.concat("u");
      break;
    case 68:
      input = input.concat("d");
      break;
    case 76:
      input = input.concat("l");
      break;
    case 82:
      input = input.concat("r");
      break;
    case 79:
      input = input.concat("o");
      break;
    case 87:
      input = input.concat("w");
      break;
    case 78:
      input = input.concat("n");
      break;
    case 80:
      input = input.concat("p");
      break;
    case 69:
      input = input.concat("e");
      break;
    case 70:
      input = input.concat("f");
      break;
    case 84:
      input = input.concat("t");
      break;
    case 71:
      input = input.concat("g");
      break;
    case 72:
      input = input.concat("h");
      break;
    case 73:
      input = input.concat("i");
      break;
    case 66:
      input = input.concat("b");
      break;
    case 65:
      input = input.concat("a");
      break;
  }
}
