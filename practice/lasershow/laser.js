class Laser {

  constructor(slx,etx,sly,ery,colour){
    this.sx = slx;
    this.ex = etx;
    this.sy = sly;
    this.ey = ery;
    this.colour = colour;
  }

  render() {
    push();
    colorMode(HSB);
    stroke(this.colour,255,255);
    strokeWeight(5);
    if(this.ex == -100){
      //line(0,this.sy,windowWidth,this.ey);
      this.glow(0,this.sy,windowWidth,this.ey);
    }else{
    //  line(this.sx,0,this.ex,windowHeight);
      this.glow(this.sx,0,this.ex,windowHeight);
    }
    pop();
  }

  glow(x,y,w,h) {
    stroke(this.colour,255,255,10);
    strokeWeight(4);
    line(x,y,w,h);

    stroke(this.colour,255,255,10);
    strokeWeight(9);
    line(x,y,w,h);

    stroke(this.colour,255,255,10);
    strokeWeight(16);
    line(x,y,w,h);

    stroke(this.colour,255,255,10);
    strokeWeight(25);
    line(x,y,w,h);

    strokeWeight(5);
    stroke(this.colour,255,255);
    line(x,y,w,h);
  }

  done(){
    return false;
  }
}
