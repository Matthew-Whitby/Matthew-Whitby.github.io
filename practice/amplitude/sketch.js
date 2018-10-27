var song;
var button;
var amp;
var fft;
var volhistory = [];
var ampPath = false;
var w;

function preload(){
  song = loadSound('05 Again×Again.mp3');
}

function toggleSong(){
  if(song.isPlaying()) song.pause();
  else song.play();
}

function toggleGraph(){
  if(!ampPath) ampPath = true;
  else ampPath = false;
}

function setup(){
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  button = createButton('play/pause');
  button2 = createButton('Change Graph');
  button2.position(100,0);
  button2.mousePressed(toggleGraph);
  colorMode(HSB);
  button.position(0,0);
  button.mousePressed(toggleSong);
  song.setVolume(0.4);
  song.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.85,128);
  w = windowWidth / 90;
}

function draw(){
  background(0);
  let vol = amp.getLevel();
  volhistory.push(vol);
  if(ampPath) ampDraw();
  else fftDraw();
}

function fftDraw(){
  noStroke();
  let spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length;i++){
    let amplit = spectrum[i];
    fill(i,255,255);
    let y = map(amplit,0,256,height,0);
    rect(i*w,y,w -2,height-y);
  }
}

function ampDraw(){
  stroke(255);
  noFill();
  beginShape();
  for(var i = 0; i < volhistory.length;i++){
    let y = map(volhistory[i],0,0.4,height/2,-height/2);
    vertex(i,y);
  }
  endShape();
  beginShape();
  for(let i = 0; i < volhistory.length;i++){
    let y = map(volhistory[i],0,0.4,height/2,height*1.5);
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

