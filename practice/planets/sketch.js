let planets;

function setup() {
  planets = new Planet[20];
  createCanvas(640, 360);
  for (planet of planets) {
    planet = new Planet(random(1, 4), 0, 0);
  }
}

function draw() {
  background(255);

  for (planet of planets) {

    var wind = new PVector(0.01, 0);
    var gravity = new PVector(0, 0.1*planet.mass);

    planet.applyForce(wind);
    planet.applyForce(gravity);
    planet.update();
    planet.display();
    planet.checkEdges();
  }
}
