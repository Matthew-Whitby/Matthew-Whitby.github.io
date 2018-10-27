var angle = 0;
var points = [];
var toggleXYZ = 0;
var button;

function setup() {
  colorMode(RGB);
  let canvas = createCanvas(windowWidth,windowHeight,WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  points.push(new P4Vector(-1, -1, -1, 1));
  points.push(new P4Vector(1, -1, -1, 1));
  points.push(new P4Vector(1, 1, -1, 1));
  points.push(new P4Vector(-1, 1, -1, 1));
  points.push(new P4Vector(-1, -1, 1, 1));
  points.push(new P4Vector(1, -1, 1, 1));
  points.push(new P4Vector(1, 1, 1, 1));
  points.push(new P4Vector(-1, 1, 1, 1));
  points.push(new P4Vector(-1, -1, -1, -1));
  points.push(new P4Vector(1, -1, -1, -1));
  points.push(new P4Vector(1, 1, -1, -1));
  points.push(new P4Vector(-1, 1, -1, -1));
  points.push(new P4Vector(-1, -1, 1, -1));
  points.push(new P4Vector(1, -1, 1, -1));
  points.push(new P4Vector(1, 1, 1, -1));
  points.push(new P4Vector(-1, 1, 1, -1));
  button = createButton('Change Spin Axis');
  button.position(0,0);
  button.mousePressed(changeSpinAxis);
}

function changeSpinAxis(){
  if(toggleXYZ == 0) toggleXYZ = 1;
  else if(toggleXYZ == 1) toggleXYZ = 2;
  else toggleXYZ = 0;
}

function draw() {
  background(0);
  //translate(width/2, height/2);
  if(toggleXYZ == 0) rotateY(-PI/2);
  else if(toggleXYZ == 1) rotateX(-PI/2);
  else rotateZ(-PI/2);
  let projected3d = []; //16
  for (let i = 0; i < points.length; i++) {
    let v = points[i];
    let rotationXY = [
      [cos(angle), -sin(angle), 0, 0],
      [sin(angle), cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    let rotationZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)]
    ];
    let rotated = matmul4(rotationXY, v, true);
    rotated = matmul4(rotationZW, rotated, true);
    let distance = 2;
    let w = 1 / (distance - rotated.w);
    let projection = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];
    let projected = createVector(0,0,0);
    projected = matmul(projection, rotated);
    projected = createVector(projected[0][0],projected[1][0],projected[2][0]);
    projected.mult(windowWidth/8);
    projected3d.push(projected);
    stroke(255,255,0);
    strokeWeight(12);
    noFill();
    point(projected.x, projected.y, projected.z);
  }

  // Connecting
  for (let i = 0; i < 4; i++) {
    connect(0, i, (i+1) % 4, projected3d );
    connect(0, i+4, ((i+1) % 4)+4, projected3d);
    connect(0, i, i+4, projected3d);
  }

  for (let i = 0; i < 4; i++) {
    connect(8, i, (i+1) % 4, projected3d );
    connect(8, i+4, ((i+1) % 4)+4, projected3d);
    connect(8, i, i+4, projected3d);
  }

  for (let i = 0; i < 8; i++) {
    connect(0, i, i + 8, projected3d);
  }
  angle -= 0.02;
}

function connect(offset,i,j,points) {
  let a = points[i+offset];
  let b = points[j+offset];
  strokeWeight(3);
  stroke(255,0,0);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function keyPressed(){
  if(keyCode === 72){
    var x = document.getElementsByTagName("Button");
    if(x.length > 0){
       if(x[0].hidden == false){
          for(var i = 0; i < x.length; i++){
             x[i].hidden = true;
           }
       }else{
          for(var i = 0; i < x.length; i++){
             x[i].hidden = false;
           }
       }
    }
  }
}