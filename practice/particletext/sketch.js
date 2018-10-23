var font;
var particles = [];
var tapped = false;

function preload() {
  font = loadFont('07にくまるフォント.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(20);
  textFont(font);

  var instructionsPoints = font.textToPoints('press up/down arrows',100,200,100);
  var whitbyPoints = font.textToPoints('Whitby',100,400,192);
  var whitbyjpPoints = font.textToPoints('ウイトビー',100,600,192);
  for(ipoint of instructionsPoints){
    var particle = new Particle(ipoint.x,ipoint.y,-200,-200);
    particles.push(particle);
    stroke(255);
    strokeWeight(4);
    point(ipoint.x,ipoint.y);
  }
  for(var i = 0; i < whitbyPoints.length; i++){
    if(whitbyjpPoints[i] != null){
      var particle = new Particle(whitbyPoints[i].x,whitbyPoints[i].y,whitbyjpPoints[i].x,whitbyjpPoints[i].y);
    }else{
      var particle = new Particle(whitbyPoints[i].x,whitbyPoints[i].y,-10,-10);
    }

    particles.push(particle);
    stroke(255);
    strokeWeight(4);
    point(whitbyPoints[i].x,whitbyPoints[i].y);
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

function keyPressed() {
  if (keyCode === UP_ARROW) {
    for(particle of particles){
      particle.setSettled(true);
    }
  } else if (keyCode === DOWN_ARROW) {
    for(particle of particles){
      particle.setSettled(false);
    }
  }
}

function touchStarted() {
  if(tapped == false){
    for(particle of particles){
      particle.setSettled(true);
    }
    tapped = true;
  }else{
    for(particle of particles){
      particle.setSettled(false);
    }
    tapped = false;
  }
}
