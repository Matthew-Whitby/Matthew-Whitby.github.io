var mover;
var attractor;

function setup() {
  createCanvas(windowWidth,windowHeight);
  mover = new Mover();
  attractor = new Attractor();
}

function draw() {
  background(0);

  var force = attractor.attract(mover);
  mover.applyForce(force);
  mover.update();

  attractor.drag();
  attractor.hover(mouseX,mouseY);

  attractor.display();
  mover.display();
}

function mousePressed() {
  attractor.clicked(mouseX,mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}
