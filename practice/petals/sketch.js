let petals = [];
let gravity;

let zOff = 0;

let spritesheet;
let textures = [];
function preload(){
  spritesheet = loadImage('petals32.png'); //gets image file
}

function setup() {
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  gravity = createVector(0, 0.3); //strength of gravity pushing down
  for(let x = 0; x < spritesheet.width; x+=32){
    for(let y = 0; y < spritesheet.height; y+=32){
      let img = spritesheet.get(x,y,32,32); //loads images
      textures.push(img);
    }
  }
  for(let i = 0; i < 700; i++){
    let x = random(width); //randomizes staring locations of petals
    let y = random(height);
    let design = random(textures); //gets random petal design
    petals.push(new Petal(x,y,design));
  }
}

function draw(){
  background(0);
  zOff += 1; //changes the wind parameter over time
  for (petal of petals) {
    let xOff = petal.pos.x / width;
    let yOff = petal.pos.y / height;
    let wAngle = noise(xOff,yOff,zOff) * TWO_PI; //generates wind based off oscillating wave
    let wind = p5.Vector.fromAngle(wAngle); //creates angle wind will blow in
    wind.mult(0.1); //strength of wind manipulator

    petal.applyForce(gravity); //applies gravity
    petal.applyForce(wind); //applies wind
    petal.update(); //updates current wind/ gravity
    petal.render(); //moves to new location
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