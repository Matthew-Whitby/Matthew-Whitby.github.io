function Firework(){
  this.firework = new Particle(random(width),height);

  this.update = function() {
    this.firework.applyForce(gravity);
    this.firework.update();

    if(this.firework.vel >= 0){
      this.firework = null;
    }
  }

  this.show = function(){
    this.firework.show();
  }
}
