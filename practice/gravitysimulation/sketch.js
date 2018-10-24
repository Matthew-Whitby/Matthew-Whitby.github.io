var planets = [];
//20
var g = 0.4;

function setup() {
  createCanvas(windowWidth,windowHeight);
  for (var i = 0; i < 10; i++) {
    planets.push(new Planet(random(0.1,2),random(width),random(height)));
  }
}

function draw() {
  background(0);


  for (var i = 0; i < planets.length; i++) {
    for (var j = 0; j < planets.length; j++) {
      if (i != j) {
        force = planets[j].attract(planets[i]);
        planets[i].applyForce(force);
      }
    }

    planets[i].update();
    planets[i].display();
  }

}
