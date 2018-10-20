let snow = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  snow.push(new Snowflake());
}

function draw(){
  background(0);

  for (flake of snow) {
    flake.render();
  }
}
