let petals = [];
let gravity;

let zOff = 0;

let spritesheet;
let textures = [];
function preload(){
  spritesheet = loadImage('petals32.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.3);
  for(let x = 0; x < spritesheet.width; x+=32){
    for(let y = 0; y < spritesheet.height; y+=32){
      let img = spritesheet.get(x,y,32,32);
      //image(img,x,y);
      textures.push(img);
    }
  }
  for(let i = 0; i < 700; i++){
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    petals.push(new Petal(x,y,design));
  }
  //background(0);

}

function draw(){
  background(0);
  //image(textures,0,0);
  //snow.push(new Snowflake());
  zOff += 0.05;
  for (petal of petals) {
    let xOff = petal.pos.x / width;
    let yOff = petal.pos.y / height;
    let wAngle = noise(xOff,yOff,zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);

    petal.applyForce(gravity);
    petal.applyForce(wind);
    petal.update();
    petal.render();
  }

  /*for (let i = snow.length - 1;i >= 0; i--){
    if(snow[i].offScreen()){
      snow.splice(i,1);
    }
  }*/
}
