class Planet {
  Planet(m, x, y) {
    this.acceleration = createVector(1,1);
    this.mass = m;
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
  }
}

  Planet.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  Planet.prototype.applyForce = function(force) {
    //var f = createVector(force,this.mass);
    this.acceleration.add(createVector(force,this.mass));
  }

  Planet.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(0,127);
    ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
  }

  Planet.prototype.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
