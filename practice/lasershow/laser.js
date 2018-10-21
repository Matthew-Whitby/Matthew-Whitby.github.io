class Laser {

  constructor(slx,etx,sly,ery,colour){
    this.sx = slx;
    this.ex = etx;
    this.sy = sly;
    this.ey = ery;
    this.colour = colour;
  }

  render() {
    colorMode(HSB);
    stroke(this.colour,255,255);
    strokeWeight(5);
    if(this.ex == -100){
      line(0,this.sy,windowWidth,this.ey);
    }else{
      line(this.sx,0,this.ex,windowHeight);
    }
  }

  done(){
    return false;
  }
}
