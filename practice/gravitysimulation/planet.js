function Planet(m,x,y){
  this.mass=m;
  this.pos=createVector(x,y);
  this.vel=createVector(0,0);
  this.acc=createVector(0,0);
}

Planet.prototype.applyForce=(force)=>{
  let f=p5.Vector.div(force,this.mass);
  this.acc.add(f);
}

Planet.prototype.update=()=>{
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Planet.prototype.display=()=>{
  stroke(255);
  strokeWeight(2);
  fill(0,100);
  ellipse(this.pos.x,this.pos.y,this.mass*24,this.mass*24);
}

Planet.prototype.attract=(p)=>{
  let force=p5.Vector.sub(this.pos,p.pos);
  let distance=force.mag();
  distance=constrain(distance,5,25);
  force.normalize();
  let strength=(this.g*this.mass*p.mass)/(distance*distance);
  force.mult(strength);
  return force;
}
