let planets = [];

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 20; i++) {
    planets.push(new Planet(random(1, 4), 0, 0));
  }
}

function draw() {
  background(255);

  for (planet of planets) {

    var wind = createVector(0.01, 0);
    var gravity = createVector(0, 0.1*planet.mass);

    planet.applyForce(wind);
    planet.applyForce(gravity);
    planet.update();
    planet.display();
    planet.checkEdges();
  }
}
