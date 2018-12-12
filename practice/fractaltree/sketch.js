var angle=0,slider;

function setup(){
  let canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  slider=createSlider(0,TWO_PI,PI/4,0.01);
  slider.position(0,0);
  colorMode(HSB);
}

function draw(){
    background(0);
    angle=slider.value();
    stroke(255);
    translate(windowWidth/2,height);
    branch(windowHeight/4,0);
}

function branch(len,color){
  color+=10;
  stroke(color,255,255);
  line(0,0,0,-len);
  translate(0,-len);
  if(len>4){
    push();
    rotate(angle);
    branch(len*0.67,color);
    pop();
    push();
    rotate(-angle,color);
    branch(len*0.67);
    pop();
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
