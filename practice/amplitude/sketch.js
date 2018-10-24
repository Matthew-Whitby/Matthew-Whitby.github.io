var song;
var button;
var amp;
var volhistory = [];

function preload(){
  song = loadSound('Youtube Outro Long Ver.mp3');
}

function toggleSong(){
  if(song.isPlaying()) song.pause();
  else song.play();
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  button = createButton('toggle');
  button.position(0,0);
  button.mousePressed(toggleSong);
  song.setVolume(0.8);
  song.play();
  amp = new p5.Amplitude();
}

function draw(){
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
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

function resizeCanvas(){
  resizeCanvas(windowWidth,windowHeight);
}
