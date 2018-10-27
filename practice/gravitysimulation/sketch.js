var planets = [];
var zoom = 1;
var zmin = 0.05;
var zmax = 9;
var sensativity = 0.005;
//20
var g = 0.4;

function setup() {
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  for (let i = 0; i < 10; i++) {
    planets.push(new Planet(random(0.1,2),random(width),random(height)));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < planets.length; i++) {
    for (let j = 0; j < planets.length; j++) {
      if (i != j) {
        force = planets[j].attract(planets[i]);
        planets[i].applyForce(force);
      }
    }
    planets[i].update();
    //var zoomint = -1 * (zoom.x + zoom.y);
    planets[i].display();
  }

}

function mouseWheel(event){
  zoom += sensativity * event.delta;
  zoom = constrain(zoom,zmin,zmax);
  scale(zoom);
  resizeCanvas(windowWidth,windowHeight);
  return false;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function keyPressed(){
  if(keyCode === 72){
    var x = document.getElementsByTagName("Button");
    if(x.length > 0){
       if(x[0].hidden == false){
          for(var i = 0; i < x.length; i++){
             x[i].hidden = true;
           }
       }else{
          for(var i = 0; i < x.length; i++){
             x[i].hidden = false;
           }
       }
    }
  }
}