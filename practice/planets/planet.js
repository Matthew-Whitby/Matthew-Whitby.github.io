function Planet(){
  this.pos = createVector(400,50);
  this.vel = createVector(1,0);
  this.acc = createVector(0,0);
  this.mass = 1;
}

Planet.prototype.applyForce = function(force){
  var f = p5.Vector.div(force,this.mass);
  this.acc.add(f);
}

Planet.prototype.update = function(){
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Planet.prototype.display = function(){
  stroke(255);
  strokeWeight(2);
  ellipse(this.pos.x,this.pos.y,16,16);
}

Planet.prototype.checkEdges = function(){
  if (this.pos.x > width) this.pos.x = 0;
  else if (this.pos.x < 0) this.pos.x = width;
  if (this.pos.y > height) {
    this.vel.y *= -1;
    this.pos.y = height;
  }
}
