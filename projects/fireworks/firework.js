function Firework(){
  this.firework = new Particle(random(width),height);

  this.update = function() {
    if(this.firework){
      this.firework.applyForce(gravity);
      this.firework.update();
      if(this.firework.vel.y >= 0){
        this.firework = null;
      }
    }
  }

  this.show = function(){
    if(this.firework){
      this.firework.show();
    }
  }
}
