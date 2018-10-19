function Firework(){
  this.Firework = new Particle(random(width),height);

  this.update() {
    this.firework.applyForce(gravity);
    this.firework.update();

  }

  this.show = function(){
    this.firework.show();
  }
}
