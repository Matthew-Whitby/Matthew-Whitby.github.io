function Particle(){
  this.pos = createVector();
  this.vel = createVector();
  this.acc = createVector();
  this.target = createVector();
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Particle.prototype.behaviors = function(){
  var seek = this.seek(this.target);
  this.applyForce(seek);
}

Particle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Particle.prototype.show = function(){
  stroke(255);
  strokeWeight(8);
  point(this.pos.x,this.pos.y);
}
