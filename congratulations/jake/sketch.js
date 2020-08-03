var congratsFireworks=[],jakeFireworks=[],fireworks=[];
var font,gravity;
var stage=0;

function preload(){
  font=loadFont('https://matthewwhitby.co.uk/Resources/07にくまるフォント.otf');
}

function setup(){
  let canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  colorMode(HSB);
  gravity=createVector(0,0.1);
  background(0);
  textFont(font);
  stroke(255);
  strokeWeight(4);

  let congratsPoints=font.textToPoints('Congratulations',100,200,192);
  let jakePoints=font.textToPoints('Jake',100,200,192);

  let congratsPointsLength=counterplz(congratsPoints);
  let jakePointsLength=counterplz(jakePoints);

  congratsPoints=font.textToPoints('Congratulations',(windowWidth/2)-(congratsPointsLength/2),200,192);
  jakePoints=font.textToPoints('Jake',(windowWidth/2)-(jakePointsLength/2),200,192);

  for(ipoint of congratsPoints){
    congratsFireworks.push(new Firework(ipoint.x,ipoint.y));
  }
  for(ipoint of jakePoints){
    jakeFireworks.push(new Firework(ipoint.x,ipoint.y));
  }
}

function counterplz(pointList){
  let maxX=0;
  let minX=0;
  for(ipoint of pointList){
    if(ipoint.x>maxX)maxX=ipoint.x;
    else if(ipoint.x<minX)minX=ipoint.x;
  }
  let lengthOfText=maxX-minX;
  return lengthOfText;
}

function draw(){
  colorMode(RGB);
  background(0,0,0,25);
  if(stage==0)drawCongrats();
  else if(stage==1)drawJake();
  else{
    if(random(1)<0.1)fireworks.push(new Firework(-1000,-1000));
    for (let i=fireworks.length-1;i>=0;i--){
      fireworks[i].update();
      fireworks[i].show();
      if(fireworks[i].done())fireworks.splice(i,1);
    }
  }
}

function drawCongrats(){
  for(let i=congratsFireworks.length-1;i>=0;i--){
    congratsFireworks[i].update();
    congratsFireworks[i].show();
    if(congratsFireworks[i].done()){
      congratsFireworks.splice(i,1);
      if(congratsFireworks.length==0)stage=1;
    }
  }
}

function drawJake(){
  for(let i=jakeFireworks.length-1;i>=0;i--){
    jakeFireworks[i].update();
    jakeFireworks[i].show();
    if(jakeFireworks[i].done()){
      jakeFireworks.splice(i,1);
      if(jakeFireworks.length==0)stage=2;
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
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
