class Planet {
  Planet(m, x, y) {
    /*this.acceleration = createVector(0,0);
    this.mass = m;
    this.pos = createVector(x,y);
    this.velocity = createVector(0,0);*/
  }
}

  Planet.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
  }

  Planet.prototype.applyForce = function(force) {
    //var f = createVector(force,this.mass);
    this.acceleration.add(createVector(force,this.mass));
  }

  Planet.prototype.declareGravity = function(m, x, y){
    console.log(y);
    this.acceleration = createVector(0,0);
    this.mass = m;
    this.pos = createVector(x,y);
    this.velocity = createVector(0,0);
  }

  Planet.prototype.show = function() {
    stroke(255);
    strokeWeight(16*this.mass);
    point(this.pos.x,this.pos.y);
    //ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
  }

  Planet.prototype.checkEdges = function() {
    if (this.pos.x > width) {
      this.pos.x = width;
      this.velocity.x *= -1;
    } else if (this.pos.x < 0) {
      this.velocity.x *= -1;
      this.pos.x = 0;
    }
    if (this.pos.y > height) {
      this.velocity.y *= -1;
      this.pos.y = height;
    }
  }
