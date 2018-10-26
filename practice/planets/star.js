function Star(){
  this.pos = createVector(width/2,height/2);
  this.mass = 20;
  this.grav = 1;
  this.dragOffset = createVector(0.0,0.0);
  this.dragging = false;
  this.rollover = false;
}

Star.prototype.attract = function(mover){
  let force = p5.Vector.sub(this.pos,mover.pos);
  let d = force.mag();
  d = constrain(d,5,25);
  force.normalize();
  let strength = (this.grav * this.mass) / (d*d);
  force.mult(strength);
  return force;
}

Star.prototype.display = function(){
  ellipseMode(CENTER);
  strokeWeight(4);
  stroke(255);
  if(this.dragging) fill(50);
  else if(this.rollover) fill(100);
  else fill(172,200);
  ellipse(this.pos.x,this.pos.y,this.mass*2,this.mass*2);
}

Star.prototype.clicked = function(mx,my){
  let d = dist(mx,my,this.pos.x,this.pos.y);
  if(d < this.mass){
    this.dragging = true;
    this.dragOffset.x = this.pos.x-mx;
    this.dragOffset.y = this.pos.y-my;
  }
}

Star.prototype.hover = function(mx,my){
  let d = dist(mx,my,this.pos.x,this.pos.y);
  this.rollover = (d < this.mass) ? true : false;
}

Star.prototype.stopDragging = function(){
  this.dragging = false;
}

Star.prototype.drag = function(){
  if(this.dragging){
    this.pos.x = mouseX + this.dragOffset.x;
    this.pos.y = mouseY + this.dragOffset.y;
  }
}
