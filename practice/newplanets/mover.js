function Mover(){
  this.position = createVector(400,50);
  this.velocity = createVector(1,0);
  this.acceleration = createVector(0,0);
  this.mass = 1;
}

Mover.prototype.applyForce = function(force){
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
}

Mover.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}

Mover.prototype.display = function(){
  stroke(255);
  strokeWeight(2);
  ellipse(this.position.x,this.position.y,16,16);
}

Mover.prototype.checkEdges = function(){
  if (this.position.x > width) {
    this.position.x = 0;
  } else if (this.position.x < 0) {
    this.position.x = width;
  }
  if (this.position.y > height) {
    this.velocity.y *= -1;
    this.position.y = height;
  }
}
