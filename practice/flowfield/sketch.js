var inc=0.1;
var scl=10;
var cols,rows;
var zoff=0;
var fr;
var particles=[];
var flowfield;
var button;
var changesizebtn = 0;
var canvas;

function setup(){
  canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  colorMode(HSB,255);
  cols=floor(width/scl);
  rows=floor(height/scl);
  fr=createP('');
  flowfield=new Array(cols*rows);
  for(var i=0;i<300;i++){
    particles[i]=new Particle();
  }
  background(30);
  button=createButton('Change Size');
  button.position(0,0);
  button.mousePressed(changeSize);
}

function draw(){
  var yoff=0;
  for(var y=0;y<rows;y++){
    var xoff=0;
    for(var x=0;x<cols;x++){
      var index=x+y*cols;
      var angle=noise(xoff,yoff,zoff)*TWO_PI*4;
      var v=p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index]=v;
      xoff+=inc;
      stroke(0,50);
    }
    yoff+=inc;
    zoff+=0.0003;
  }
  for(var i=0;i<particles.length;i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));
}

function changeSize(){
   if(changesizebtn == 0){
      resizeCanvas(400,400);
      canvas.position(windowWidth/4,windowHeight/4);
      background(30);
      changesizebtn = 1;
    }else if(changesizebtn == 1){
      resizeCanvas(800,600);
      changesizebtn = 2;
      canvas.position(windowWidth/4,windowHeight/4);
      background(30);
    }else{
      resizeCanvas(windowWidth,windowHeight);
      changesizebtn = 0;
      canvas.position(0,0);
      background(30);
    }
}

function keyPressed(){
   if(keyCode===72){
     var x=document.getElementsByTagName("Button");
     if(x.length>0){
        if(x[0].hidden==false){
           for(var i=0;i<x.length;i++){
              x[i].hidden=true;
            }
        }else{
           for(var i=0;i<x.length;i++){
              x[i].hidden=false;
            }
        }
     }
   }
 }