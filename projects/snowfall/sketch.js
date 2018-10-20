let snow = [];
let gravity;

let spritesheet;
let textures = [];
function preload(){
  spritesheet = loadImage('snowflakes32.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.03);
  for(let x = 0; x < spritesheet.width; x+=32){
    for(let y = 0; y < spritesheet.height; y+=32){
      let img = spritesheet.get(x,y,32,32);
      //image(img,x,y);
      textures.push(img);
    }
  }
  for(let i = 0; i < 300; i++){
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x,y,design));
  }
  //background(0);

}

function draw(){
  background(0);
  image(textures,0,0);
  //snow.push(new Snowflake());
  for (flake of snow) {
    flake.applyForce(gravity);
    flake.update();
    flake.render();
  }

  /*for (let i = snow.length - 1;i >= 0; i--){
    if(snow[i].offScreen()){
      snow.splice(i,1);
    }
  }*/
}
