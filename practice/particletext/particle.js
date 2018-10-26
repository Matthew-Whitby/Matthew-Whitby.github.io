function Particle(x,y,jpx,jpy){
  this.jtarget = createVector(jpx,jpy);
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.settled = false;
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Particle.prototype.setSettled = function(set) {
  if(this.jtarget.x != -200 && this.jtarget.y != -200){
    this.settled = set;
  }
}

Particle.prototype.behaviors = function(){
  let arrive;
  if(!this.settled) arrive = this.arrive(this.target);
  else arrive = this.arrive(this.jtarget);

  let mouse = createVector(mouseX,mouseY);
  let flee = this.flee(mouse);
  arrive.mult(1);
  flee.mult(5);
  this.applyForce(arrive);
  this.applyForce(flee);
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
  let desired = p5.Vector.sub(target,this.pos);
  let distance = desired.mag();
  let speed = this.maxspeed;
  if(distance < 100) speed = map(distance,0,100,0,this.maxspeed);
  desired.setMag(speed);
  let steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Particle.prototype.flee = function(target){
  let desired = p5.Vector.sub(target,this.pos);
  let distance = desired.mag();
  if(distance < 50){
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    let steer = p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxforce);
    return steer;
  }else return createVector(0,0);
}
