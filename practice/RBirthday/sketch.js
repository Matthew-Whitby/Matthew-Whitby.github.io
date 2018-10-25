var happyFireworks = [];
var birthdayFireworks = [];
var robertFireworks = [];
var font;
var gravity;
var stage = 0;
var fireworks = [];

function preload(){
  font = loadFont('07にくまるフォント.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  gravity = createVector(0,0.1);
  background(0);
  textFont(font);
  stroke(255);
  strokeWeight(4);

  var happyPoints = font.textToPoints('Happy',100,200,192);
  var birthdayPoints = font.textToPoints('Birthday',100,200,192);
  var robertPoints = font.textToPoints('Robert',100,200,192);

  var happyPointsLength = counterplz(happyPoints);
  var birthdayPointsLength = counterplz(birthdayPoints);
  var robertPointsLength = counterplz(robertPoints);

  happyPoints = font.textToPoints('Happy',(windowWidth/2)-(happyPointsLength/2),200,192);
  birthdayPoints = font.textToPoints('Birthday',(windowWidth/2)-(birthdayPointsLength/2),200,192);
  robertPoints = font.textToPoints('Robert',(windowWidth/2)-(birthdayPointsLength/2),200,192);

  for(ipoint of happyPoints){
    happyFireworks.push(new Firework(ipoint.x,ipoint.y));
  }
  for(ipoint of birthdayPoints){
    birthdayFireworks.push(new Firework(ipoint.x,ipoint.y));
  }
  for(ipoint of robertPoints){
    robertFireworks.push(new Firework(ipoint.x,ipoint.y));
  }
}

function counterplz(pointList){
  var maxX = 0;
  var minX = 0;
  for(ipoint of pointList){
    if(ipoint.x > maxX) maxX = ipoint.x;
    else if(ipoint.x < minX) minX = ipoint.x;
  }
  var lengthOfText = maxX - minX;
  return lengthOfText;
}

function draw(){
  colorMode(RGB);
  background(0,0,0,25);
  if(stage == 0) drawHappy();
  else if(stage == 1) drawBirthday();
  else if(stage == 2) drawRobert();
  else{
    if(random(1) < 0.1){
      fireworks.push(new Firework(-1000,-1000));
    }
      for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if(fireworks[i].done()){
          fireworks.splice(i,1);
        }
    }
  }
}

function drawHappy(){
  for(let i = happyFireworks.length-1; i >= 0;i--){
    happyFireworks[i].update();
    happyFireworks[i].show();
    if(happyFireworks[i].done()) {
      happyFireworks.splice(i,1);
      if(happyFireworks.length == 0) stage = 1;
    }
  }
}

function drawBirthday(){
  for(let i = birthdayFireworks.length-1; i >= 0;i--){
    birthdayFireworks[i].update();
    birthdayFireworks[i].show();
    if(birthdayFireworks[i].done()) {
      birthdayFireworks.splice(i,1);
      if(birthdayFireworks.length == 0) stage = 2;
    }
  }
}

function drawRobert(){
  for(let i = robertFireworks.length-1; i >= 0;i--){
    robertFireworks[i].update();
    robertFireworks[i].show();
    if(robertFireworks[i].done()) {
      robertFireworks.splice(i,1);
      if(robertFireworks.length == 0) stage = 3;
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
