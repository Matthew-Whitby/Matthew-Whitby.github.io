function Planet(m,x,y){
  this.mass = m;
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
}

Planet.prototype.applyForce = function(force){
  var f = p5.Vector.div(force,this.mass);
  this.acc.add(f);
}

Planet.prototype.update = function(){
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
  /*var zoom = createVector(0,0);
  if(this.pos.x > windowWidth) zoom.x = this.pos.x;
  else if(this.pos.x < 0) zoom.x = abs(this.pos.x);
  if(this.pos.y > windowHeight) zoom.y = this.pos.y;
  else if(this.pos.y < 0) zoom.y = abs(this.pos.y);
  return zoom;*/
}

Planet.prototype.display = function(){
  stroke(255);
  strokeWeight(2);
  fill(0,100);
  ellipse(this.pos.x,this.pos.y,this.mass*24,this.mass*24);
}

Planet.prototype.attract = function(p){
  var force = p5.Vector.sub(this.pos,p.pos);
  var distance = force.mag();
  distance = constrain(distance,5,25);
  force.normalize();
  var strength = (this.g*this.mass*p.mass) / (distance*distance);
  force.mult(strength);
  return force;
}
