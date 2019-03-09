var song,button,amp,fft,volhistory=[],ampPath=false,w;

function preload(){song=loadSound('05 Again×Again.mp3');}

function toggleSong(){(song.isPlaying())?song.pause():song.play();}

function toggleGraph(){ampPath=(ampPath)?false:true;}

function setup(){
  let canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  button=createButton('play/pause');
  button2=createButton('Change Graph');
  button2.position(100,0);
  button2.mousePressed(toggleGraph);
  colorMode(HSB);
  button.position(0,0);
  button.mousePressed(toggleSong);
  song.setVolume(0.1);
  song.play();
  amp=new p5.Amplitude();
  fft=new p5.FFT(0.85,128);
  w=windowWidth/90;
}

function draw(){
  background(0);
  let vol=amp.getLevel();
  volhistory.push(vol);
  (ampPath)?ampDraw():fftDraw();
}

function fftDraw(){
  noStroke();
  let spectrum=fft.analyze();
  for(let i=0;i<spectrum.length;i++){
    let amplit=spectrum[i];
    fill(i,255,255);
    let y=map(amplit,0,256,height,0);
    rect(i*w,y,w-2,height-y);
  }
}

function ampDraw(){
  stroke(255);
  noFill();
  beginShape();
  for(var i=0;i<volhistory.length;i++){
    let y=map(volhistory[i],0,0.5,height/2,-height/2);
    vertex(i,y);
  }
  endShape();
  beginShape();
  for(let i=0;i<volhistory.length;i++){
    let y=map(volhistory[i],0,0.5,height/2,height*1.5);
    vertex(i,y);
  }
  endShape();
  if(volhistory.length>width)volhistory.splice(0,1);
}

function windowResized(){resizeCanvas(windowWidth,windowHeight);}

function keyPressed(){
  if(keyCode===72){
    var x=document.getElementsByTagName("Button");
    if(x.length>0){
       if(x[0].hidden==false)for(var i=0;i<x.length;i++)x[i].hidden=true;
       else for(var i=0;i<x.length;i++)x[i].hidden=false;
    }
  }
}