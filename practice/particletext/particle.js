function Particle(){
  this.pos = createVector();
  this.vel = createVector();
  this.acc = createVector();
  this.target = createVector();
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
}

Particle.prototype.show = function(){
  stroke(255);
  strokeWeight(8);
  point(this.pos.x,this.pos.y);
}
