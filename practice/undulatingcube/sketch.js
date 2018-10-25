let angle = 0;
let w= 24;
let mangle,maxD;
var canvas;
var changesizebtn = 0;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight,WEBGL);
  mangle = atan(1/sqrt(2));
  maxD = dist(0,0,200,200);
  button = createButton('Change Size');
  button.position(0,0);
  button.mousePressed(changeSize);
}

function changeSize(){
  if(changesizebtn == 0){
    resizeCanvas(400,400);
    canvas.position(windowWidth/4,windowHeight/4);
    changesizebtn = 1;
  }else if(changesizebtn == 1){
    resizeCanvas(800,600);
    changesizebtn = 2;
    canvas.position(windowWidth/4,windowHeight/4);
  }else{
    resizeCanvas(windowWidth,windowHeight);
    changesizebtn = 0;
    canvas.position(0,0);
  }
}

function draw(){
  background(0);
  ortho(-1000,1000,1000,-1000,0,10000);
  rotateX(QUARTER_PI);
  rotateY(mangle);
  for(let z = 0; z < height; z += w){
    for(var x = 0;x<width;x += w){
      push();
      let d = dist(x,z,width/2,height/2);
      let offset = map(d,0,maxD,-PI,PI);
      let a = angle + offset;
      let h = floor(map(sin(a),-1,1,200,450));
      normalMaterial();
      translate(x - width/2,0,z-height/2);
      box(w-2,h,w-2);
      //rect(x - width/2 + w/2,0,w-2,h);

      pop();
    }
  }
  angle -= 0.2;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
