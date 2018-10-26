function Particle(x,y,hu,firework,explosionNo){
  this.pos = createVector(x,y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;
  if(this.firework){
    if(explosionNo == 5) this.vel = createVector(0,-11);
    else this.vel = createVector(0,random(-3,(windowHeight / 100)*-1.5));
  }
  else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2,10)); //magnitude of explosion
  }
  this.acc = createVector(0,0);
  this.applyForce = function(force) {
  this.acc.add(force);
}

  this.update = function(){
    if(!this.firework){
      this.vel.mult(0.9); //how quickly particles slow down
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) return true;
    else return false;
  }

  this.show = function(){
    colorMode(HSB);
    if(this.firework){
      strokeWeight(4);
      stroke(hu,255,255);
    }
    else{
      strokeWeight(2);
      stroke(hu,255,255,this.lifespan);
    }
    point(this.pos.x,this.pos.y);
  }
}
