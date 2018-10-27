var planet;
var star;

function setup() {
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  planet = new Planet();
  star = new Star();
}

function draw() {
  background(0);
  let force = star.attract(planet);
  planet.applyForce(force);
  planet.update();
  star.drag();
  star.hover(mouseX,mouseY);
  star.display();
  planet.display();
}

function mousePressed() {
  star.clicked(mouseX,mouseY);
}

function mouseReleased() {
  star.stopDragging();
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