var planet;
var star;

function setup() {
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  planet = new Planet();
  star = new Star();
}

function draw() {
  background(0);
  let force = star.attract(planet);
  planet.applyForce(force);
  planet.update();
  star.drag();
  star.hover(mouseX,mouseY);
  star.display();
  planet.display();
}

function mousePressed() {
  star.clicked(mouseX,mouseY);
}

function mouseReleased() {
  star.stopDragging();
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
