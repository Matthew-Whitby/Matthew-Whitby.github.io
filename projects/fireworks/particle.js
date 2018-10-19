function Particle(x,y,firework){
  this.pos = createVector(x,y);
  this.firework = firework;
  if(this.firework){
    this.vel = createVector(0, random(-7,-10));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1,6);
  }

  this.acc = createVector(0,0);

this.applyForce = function(force) {
  this.acc.add(force);
}

  this.update = function(){
    if(!this.firework){
      this.vel.mult(0.85);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function(){
    point(this.pos.x,this.pos.y);
  }
}
