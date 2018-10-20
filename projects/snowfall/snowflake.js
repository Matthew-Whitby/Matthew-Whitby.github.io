class Snowflake {

  constructor() {
    let x = random(width);
    let y = random(-100,-10);
    this.pos = createVector(x,y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
  }

  update() {
    this.acc = gravity;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  render() {
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}
