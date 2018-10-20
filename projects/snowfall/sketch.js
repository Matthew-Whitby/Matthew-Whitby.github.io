let snow = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.1);
}

function draw(){
  background(0);
  snow.push(new Snowflake());
  for (flake of snow) {
    flake.update();
    flake.render();
  }
}
