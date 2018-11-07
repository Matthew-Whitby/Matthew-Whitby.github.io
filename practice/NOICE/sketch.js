var fireworks = [];
var gravity;
var img;

function preload(){
  
}

function setup(){
  img = loadGif('rob-happy2.gif');
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  colorMode(HSB);
  gravity = createVector(0,0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0,0,0,25);
  if(random(1) < 0.1){
    fireworks.push(new Firework(img));
  }
    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if(fireworks[i].done()){
        fireworks.splice(i,1);
      }
  }
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