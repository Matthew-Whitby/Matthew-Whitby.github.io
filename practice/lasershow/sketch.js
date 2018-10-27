var lasers = [];

function setup(){
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  colorMode(HSB);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  if(random(1) < 1){
    if(lasers.length > 0){
      clear();
      lasers.splice(0,1);
    }
    let sx;
    let ex;
    let sy;
    let ey;
    let colour = random(255);
    let dir = (random(1) > 0.5) ? 1 : -1;
    if(dir == 1){ //create 'vertical laser'
      sx = Math.round(random(windowWidth));
      ex = Math.round(random(windowWidth));
      sy = -100;
      ey = -100;
    }else{ //create 'horizontal laser'
    sy = Math.round(random(windowHeight));
    ey = Math.round(random(windowHeight));
    sx = -100;
    ex = -100;
    }
    lasers.push(new Laser(sx,ex,sy,ey,colour));
  }
    for (let i = lasers.length - 1; i >= 0; i--) {
      //lasers[i].update();
      lasers[i].render();
      if(lasers[i].done()){
        lasers.splice(i,1);
      }
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
