let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];
function preload(){
  spritesheet = loadImage('snowflakes32.png');
}

function setup() {
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  gravity = createVector(0, 0.3);
  for(let x = 0; x < spritesheet.width; x+=32){
    for(let y = 0; y < spritesheet.height; y+=32){
      let img = spritesheet.get(x,y,32,32);
      textures.push(img);
    }
  }
  for(let i = 0; i < 700; i++){
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x,y,design));
  }
}

function draw(){
  background(0);
  zOff += 0.05;
  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff,yOff,zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);
    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function keyPressed(){
  if(keyCode === 72){
    var x = document.getElementsByTagName("Button");
    if(x.length > 0){
       if(x[0].hidden == false){
          for(var i = 0; i < x.length; i++){
             x[i].hidden = true;
           }
       }else{
          for(var i = 0; i < x.length; i++){
             x[i].hidden = false;
           }
       }
    }
  }
}