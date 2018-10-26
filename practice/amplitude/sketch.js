var song;
var button;
var amp;
var fft;
var volhistory = [];
var ampPath = false;
var w;

function preload(){
  song = loadSound('03_BLAST_.mp3');
}

function toggleSong(){
  if(song.isPlaying()) song.pause();
  else song.play();
}

function toggleGraph(){
  if(ampPath == false) ampPath = true;
  else ampPath = false;
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  button = createButton('play/pause');
  button2 = createButton('Graph Type');
  button2.position(100,0);
  button2.mousePressed(toggleGraph);
  colorMode(HSB);
  button.position(0,0);
  button.mousePressed(toggleSong);
  song.setVolume(0.4);
  song.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.9,128);
  w = windowWidth / 128;
}

function draw(){
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  if(ampPath == true) ampDraw();
  else fftDraw();
}

function fftDraw(){
  noStroke();
  var spectrum = fft.analyze();
  for(var i = 0; i < spectrum.length;i++){
    var amplit = spectrum[i];
    fill(i,255,255);
    var y = map(amplit,0,256,height,0);
    rect(i*w,y,w -2,height-y);
  }
}

function ampDraw(){
  stroke(255);
  noFill();
  beginShape();
  for(var i = 0; i < volhistory.length;i++){
    var y = map(volhistory[i],0,1,height/2,0);
    vertex(i,y);
  }
  endShape();
  if(volhistory.length > width){
    volhistory.splice(0,1);
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
