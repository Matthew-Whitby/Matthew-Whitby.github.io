function Firework(x,y){
  this.hu = random(255);
  this.explosionNo = 5;
  if(x == -1000 && y == -1000){
    x = random(width);
    y = 0;
    this.explosionNo = 100;
  }
  this.firework = new Particle(x,y+windowHeight,this.hu,true,this.explosionNo);
  this.exploded = false;
  this.particles = [];
  this.done = function(){
    if(this.exploded && this.particles.length === 0) return true;
    else return false;
  }

  this.update = function() {
    if(!this.exploded){
      this.firework.applyForce(gravity);
      this.firework.update();
      if(this.firework.vel.y >= 0){
        this.exploded = true;
        this.explode();
      }
    }
    for(let i = this.particles.length - 1; i >= 0; i--){
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if(this.particles[i].done()) this.particles.splice(i,1);
    }
  }

  this.explode = function(){
    for (let i = 0; i < this.explosionNo; i++){
      let p = new Particle(this.firework.pos.x,this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

  this.show = function(){
    colorMode(HSB);
    if(!this.exploded) this.firework.show();
    for(let i = 0; i < this.particles.length; i++){
      this.particles[i].show();
    }
  }
}
