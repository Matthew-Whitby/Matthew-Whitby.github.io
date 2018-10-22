var font;
var particles = [];

function preload() {
  font = loadFont('07にくまるフォント.otf');
}

function setup(){
  createCanvas(windowHeight,windowWidth);
  background(20);
  textFont(font);

  var whitbyPoints = font.textToPoints('Whitby',100,200,192);

  for(pt of whitbyPoints){
    var particle = new Particle(pt.x,pt.y);
    particles.push(particle);
    stroke(255);
    strokeWeight(4);
    point(pt.x,pt.y);
  }
}

function draw() {
  background(20);
  for (particle of particles){
    particle.behaviors();
    particle.update();
    particle.show();
  }
}
