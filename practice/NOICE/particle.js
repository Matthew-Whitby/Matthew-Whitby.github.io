function Particle(x,y,hu,img,firework){
  this.pos = createVector(x,y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;
  this.img = img;
  if(this.firework){
    this.vel = createVector(0, random(-7,(windowHeight / 100)*-2)); //Upwards velocity 2p before -10
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2,10)); //magnitude of explosion
  }

  this.acc = createVector(0,0);

this.applyForce = function(force) {
  this.acc.add(force);
}

  this.update = function(){
    if(!this.firework){
      this.vel.mult(0.9); //how quickly particles slow down
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0){
      return true;
    }else{
      return false;
    }
  }

  this.show = function(){
    colorMode(HSB);
    var width,height;
    if(!this.firework){
      width = 2;
      height = 2;
      //strokeWeight(2);
      //stroke(hu,255,255,this.lifespan);
    }else{
      width = 4;
      height = 4;
      //strokeWeight(4);
      //stroke(hu,255,255);
    }
    image(this.img,this.pos.x,this.pos.y,width,height);
    //point(this.pos.x,this.pos.y);
  }
}
