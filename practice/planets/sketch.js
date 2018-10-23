let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  for (var i = 0; i < 20; i++) {
    planets.push(new Planet(random(1,4),200,20));
    planets[i].declareGravity(random(1,4),200,20);
  }
}

function draw() {
  background(20);

  for (planet of planets) {
    var wind = createVector(0.01, 0);
    var gravity = createVector(0, 0.1*planet.mass);
    planet.applyForce(wind);
    planet.applyForce(gravity);
    planet.update();
    planet.show();
    planet.checkEdges();
  }
}
