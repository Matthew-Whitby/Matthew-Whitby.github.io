var font;

function preload() {
  font = loadFont('07にくまるフォント.otf');
}

function setup(){
  createCanvas(windowHeight,windowWidth);
  background(20);
  textFont(font);
  textSize(192);
  fill(255);
  noStroke();
  text('Whitby,100,200');

  var whitbyPoints = font.textToPoints('Whitby',100,200,192);

  for(pt of whitbyPoints){
    stroke(255);
    strokeWeight(4);
    point(pt.x,pt.y);
  }
}
