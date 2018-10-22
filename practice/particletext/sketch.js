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
  text('Whitby,10,200');
}
