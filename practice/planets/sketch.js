let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (var i = 0; i < 20; i++) {
    var planet = new Planet(random(1,4),0,0);
    planets.push(planet);
    planets[i].declareGravity(random(1,4),0,0);
  }
}

function draw() {
  background(0);

  for (planet of planets) {
    var wind = createVector(0.01, 0);
    var gravity = createVector(0, 0.1*planet.mass);
    planet.declareGravity();
    planet.applyForce(wind);
    planet.applyForce(gravity);
    planet.update();
    planet.display();
    planet.checkEdges();
  }
}
