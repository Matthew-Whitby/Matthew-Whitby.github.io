function Star(sx,sy,ex,ey,img){
  this.img = img;
  this.pos = createVector(sx,sy);
  this.endpos = createVector(ex,ey);
  this.size = random(10,30);
  this.vel = createVector(random(-10,10),random(-10,10));
  this.acc = createVector(0,0);
  this.angle = random(TWO_PI);
  this.maxspeed = 2;
  this.maxforce = 0.1;
  this.settled = false;
  this.dir = (random(1) > 0.5) ? 1 : -1;
}

Star.prototype.checkSettled = function(){
  if(this.pos.x > this.endpos.x - 1 && this.pos.y > this.endpos.y - 1 && this.pos.x < this.endpos.x + 1 && this.pos.y < this.endpos.y + 1){
    this.settled = true;
  }
}

Star.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.angle += this.dir * this.vel.mag() / 200;
  this.checkSettled();
}

Star.prototype.behaviors = function(){
  var arrive = this.arrive(this.endpos);
  arrive.mult(1);
  this.applyForce(arrive);
}

Star.prototype.applyForce = function(f){
  this.acc.add(f);
}

Star.prototype.show = function(){
  push();
  rotate(this.angle);
  imageMode(CENTER);
  image(this.img,this.pos.x,this.pos.y,this.size,this.size);
  pop();
}

Star.prototype.arrive = function(endpos){
  var desired = p5.Vector.sub(endpos,this.pos);
  var distance = desired.mag();
  var speed = this.maxspeed;
  if(distance < 100){
    speed = map(distance,0,100,0,this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxforce);
  return steer;
}
