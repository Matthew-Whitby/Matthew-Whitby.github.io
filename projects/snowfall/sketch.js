let snow = [];
let gravity;

let textures = [];
function preload(){
  textures = loadImage('snowflakes32.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.03);
  for(let i = 0; i < 300; i ++){
    let x = random(width);
    let y = random(height);
    snow.push(new Snowflake(x,y));
  }
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
