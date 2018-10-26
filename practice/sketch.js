let starimg;
let stars = [];

function preload(){
  starimg = loadImage('Star.png');
}

function setup(){
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
}

function draw(){
  clear();
  if(random(1) < 0.1) stars.push(new Star(random(windowWidth),random(windowHeight),random(windowWidth),random(windowHeight),starimg));
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].behaviors();
    stars[i].update();
    stars[i].show();
    if(stars[i].settled) stars.splice(i,1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
