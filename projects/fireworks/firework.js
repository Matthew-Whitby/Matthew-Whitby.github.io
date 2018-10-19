function Firework(){
  this.firework = new Particle(random(width),height);
  this.exploded = false;

  this.update = function() {
    if(!this.exploded){
      this.firework.applyForce(gravity);
      this.firework.update();
      if(this.firework.vel.y >= 0){
        this.exploded = true;
      }
    }
  }

  this.show = function(){
    if(!this.exploded){
      this.firework.show();
    }
  }
}
