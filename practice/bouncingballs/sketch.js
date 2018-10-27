let planets = [];

function setup(){
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  for(var i = 0; i < 20; i++){
    planets.push(new Planet(random(1,4),0,0));
  }
}

function draw(){
  background(20);
  for(planet of planets){
    var wind = createVector(0.01,0);
    var gravity = createVector(0,0.1*planet.mass);
    planet.applyForce(wind);
    planet.applyForce(gravity);
    planet.update();
    planet.show();
    planet.checkEdges();
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
