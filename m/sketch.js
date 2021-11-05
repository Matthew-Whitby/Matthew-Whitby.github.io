var happyFireworks=[],birthdayFireworks=[],mumFireworks=[],fireworks=[];
var font;
var gravity;
var stage=0;
var windowWidth=window.screen.width;
var windowHeight=window.screen.height;

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

  let happyPoints=font.textToPoints('I',100,200,192);
  let birthdayPoints=font.textToPoints('Can',100,200,192);
  let mumPoints=font.textToPoints('Game',100,200,192);

  let happyPointsLength=counterplz(happyPoints);
  let birthdayPointsLength=counterplz(birthdayPoints);
  let mumPointsLength=counterplz(mumPoints);

  happyPoints=font.textToPoints('I',(windowWidth/2)-(happyPointsLength/2),200,192);
  birthdayPoints=font.textToPoints('Can',(windowWidth/2)-(birthdayPointsLength/2),200,192);
  mumPoints=font.textToPoints('Game',(windowWidth/2)-(mumPointsLength/2),200,192);

  for(ipoint of happyPoints)
    happyFireworks.push(new Firework(ipoint.x,ipoint.y));
  for(ipoint of birthdayPoints)
    birthdayFireworks.push(new Firework(ipoint.x,ipoint.y));
  for(ipoint of mumPoints)
    mumFireworks.push(new Firework(ipoint.x,ipoint.y));
}

function counterplz(pointList){
  let maxX=0;
  let minX=0;
  for(ipoint of pointList){
    if(ipoint.x>maxX)maxX=ipoint.x;
    else if(ipoint.x<minX)minX=ipoint.x;
  }
  return maxX-minX;
}

function draw(){
  colorMode(RGB);
  background(0,0,0,25);
  if(stage==0)drawHappy();
  else if(stage==1)drawBirthday();
  else if(stage==2)drawMum();
  else{
    if(random(1)<0.1)fireworks.push(new Firework(-1000,-1000));
    for (let i=fireworks.length-1;i>=0;i--) {
      fireworks[i].update();
      fireworks[i].show();
      if(fireworks[i].done())fireworks.splice(i,1);
    }
  }
}

function drawHappy(){
  for(let i=happyFireworks.length-1;i>=0;i--){
    happyFireworks[i].update();
    happyFireworks[i].show();
    if(happyFireworks[i].done()){
      happyFireworks.splice(i,1);
      if(happyFireworks.length==0)stage=1;
    }
  }
}

function drawBirthday(){
  for(let i=birthdayFireworks.length-1;i>=0;i--){
    birthdayFireworks[i].update();
    birthdayFireworks[i].show();
    if(birthdayFireworks[i].done()){
      birthdayFireworks.splice(i,1);
      if(birthdayFireworks.length==0)stage=2;
    }
  }
}

function drawMum(){
  for(let i=mumFireworks.length-1;i>=0;i--){
    mumFireworks[i].update();
    mumFireworks[i].show();
    if(mumFireworks[i].done()){
      mumFireworks.splice(i,1);
      if(mumFireworks.length==0)stage=3;
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
          for(var i=0;i<x.length;i++)
             x[i].hidden=true;
       }else{
          for(var i=0;i<x.length;i++)
             x[i].hidden=false;
       }
    }
  }
}
