var font;

function preload() {
  font = loadFont('07にくまるフォント.otf');
}

function setup(){
  createCanvas(windowHeight,windowWidth);
  background(20);
  textFont(font);
  textSize(128);
  fill(255);
  noStroke();
  text('Whitby,100,200');

  var whitbyPoints = font.textToPoints('Whitby',100,200);

  for(pt of whitbyPoints){
    stroke(0,255,0);
    strokeWeight(4);
    point(pt.x,pt.y);
  }
}
