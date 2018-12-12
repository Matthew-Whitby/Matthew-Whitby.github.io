let clockType=0,button,particles=[],secondPoints=[],minutePoints=[],hourPoints=[];

function preload(){font=loadFont('07にくまるフォント.otf');}

function setup(){
  let canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  angleMode(DEGREES);
  button=createButton('Change Clock Type');
  button.position(0,0);
  button.mousePressed(changeClockType);
}

function draw(){(!clockType)?analogDraw():digitalDraw();}

function digitalDraw(){

}

function analogDraw(){
  background(0);
  translate(200,200);
  rotate(-90);
  let hr=hour();
  let mn=minute();
  let sec=second();
  strokeWeight(4);
  noFill();
  stroke(255,100,150);
  let secAng=map(sec,0,60,0,360);
  arc(0,0,300,300,0,secAng);
  push()
  rotate(secAng);
  line(0,0,100,0)
  pop();
  stroke(100,255,150);
  let minAngle=map(mn,0,60,0,360);
  arc(0,0,280,280,0,minAngle);
  push()
  rotate(minAngle);
  line(0,0,75,0)
  pop();
  stroke(150,100,255);
  let hourAngle=map(hr%12,0,12,0,360);
  arc(0,0,260,260,0,hourAngle);
  push()
  rotate(hourAngle);
  line(0,0,50,0)
  pop();
  stroke(255);
  point(0,0);
}

function digitalClockSetup(){
  
}

function changeClockType(){
  if(clockType==0)clockType=1;
  else{
    clockType=0;
    digitalClockSetup();
  }
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