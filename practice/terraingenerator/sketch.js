var cols,rows,w,h;
var scl = 20;
var terrain = [];
var flying = 0;
var button;
var changesizebtn = false;
var translationval = -1;
var canvas;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight,WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  w = windowWidth*2;
  h = windowHeight*2;
  cols = w/scl;
  rows = h/scl;
  for(let i = 0;i < cols;i++){
    terrain.push([]);
    for(let j = 0;j<rows;j++){
      terrain[i].push(0.0);
    }
  }
  button = createButton('Change Size');
  button.position(0,0);
  button.mousePressed(changeSize);
}

function resetup(newW,newH){
  resizeCanvas(newW,newH);
  w = newW*2;
  h = newH*2;
  cols = w/scl;
  rows = h/scl;
  for(let i = 0;i < cols;i++){
    terrain.push([]);
    for(let j = 0;j<rows;j++){
      terrain[i].push(0.0);
    }
  }
}

function changeSize(){
  if(!changesizebtn){
    resetup(900,350);
    canvas.position(windowWidth/4,windowHeight/4);
    changesizebtn = true;
  }else{
    resetup(windowWidth,windowHeight);
    changesizebtn = false;
    canvas.position(0,0);
  }
}

function draw(){
  flying -= 0.1;
  let yoff = flying;
  for(var y = 0; y < rows; y++){
    let xoff = 0;
    for(var x = 0; x < cols;x++){
      terrain[x][y] = map(noise(xoff,yoff),0,1,-120,120);
      xoff += 0.15;
    }
    yoff += 0.15;
  }
  background(0);
  stroke(255);
  noFill();
  rotateX(PI/3);
  translate(w/-2,h/-2);
  for(let y = 0; y < rows; y++){
    beginShape(TRIANGLE_STRIP);
    for(let x = 1; x < cols;x++){
      vertex(x*scl,y*scl,terrain[x][y]);
      vertex(x*scl,(y+1)*scl,terrain[x][y+1]);
      vertex((x-1)*scl,y*scl,terrain[x-1][y]);
    }
    endShape();
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
