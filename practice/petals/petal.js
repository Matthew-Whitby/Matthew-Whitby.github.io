function getRandomSize(){
  let r = pow(random(0,1),2); //generate small number
  return constrain(r * 32,2,32); //expand number into suitable size range
}

class Petal {

  constructor(sx,sy,img) {
    let x = sx || random(width); //gets initial random x or generates a random x if no inital is given
    let y = sy || random(-100,-10); //gets inital random y or generates a random y somewhere above the top of the screen so petals fall from differnt heights
    this.img = img; //sets petal design
    this.pos = createVector(x,y);
    this.vel = createVector(0, 0); //inital velocity
    this.acc = createVector();
    this.angle = random(TWO_PI); //randomizes the starting angle of petal
    this.dir = (random(1 > 0.5) ? 1 : -1); //randomizes whether petal will spin clockwise or anti-clockwise
    this.xOff = 0; //x offput of petal

    this.r = getRandomSize(); //chooses a random size for the petal
  }

  applyForce(force) {
    //parallax effect
    let f = force.copy();
    f.mult(this.r);
    this.acc.add(f);
  }

  randomize() {
    let x = random(width);
    let y = random(-100,-10);
    this.pos = createVector(x,y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }

  update() {
    this.xOff = sin(this.angle) * 2 * this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if(this.vel.mag() < 1){
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);

    if(this.pos.y > height + this.r){
      this.randomize();
    }

    if(this.pos.x < -this.r){ //wrapping left and right
      this.pos.x = width + this.r;
    }
    if(this.pos.x > width + this.r){
      this.pos.x = -this.r;
    }

    this.angle += this.dir * this.vel.mag() / 200;
  }

  render()
    push();
    translate(this.pos.x + this.xOff,this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img,0,0,this.r,this.r);
    pop();


  }

  offScreen(){
    return (this.pos.y > height + this.r || this.pos.x < -this.r || this.pos.x > width + this.r);
  }
}
