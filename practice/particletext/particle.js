function Particle(x,y){
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 5;
  this.maxforce = 0.3;
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Particle.prototype.behaviors = function(){
  var arrive = this.arrive(this.target);
  this.applyForce(arrive);
}

Particle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Particle.prototype.show = function(){
  stroke(255);
  strokeWeight(8);
  point(this.pos.x,this.pos.y);
}

Particle.prototype.arrive = function(target){
  var desired = p5.Vector.sub(target,this.pos);
  var distance = desired.mag();
  var speed = this.maxspeed;
  if(distance < 100) {
    speed = map(distance,0,100,0,this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Particle.prototype.seek = function(target){
  var desired = p5.Vector.sub(target,this.pos);
  desired.setMag(this.maxspeed);
  var steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxforce);
  return steer;
}
