class Laser {
  constructor(slx,etx,sly,ery,colour){
    this.sx=slx;
    this.ex=etx;
    this.sy=sly;
    this.ey=ery;
    this.colour=colour;
    this.thickness=10;
  }

  render(){
    push();
    colorMode(HSB);
    stroke(this.colour,255,255);
    strokeWeight(5);
    if(this.ex==-100)this.glow(0,this.sy,windowWidth,this.ey);
    else this.glow(this.sx,0,this.ex,windowHeight);
    pop();
  }

  glow(x,y,w,h) {
    colorMode(HSB);
    stroke(this.colour,255,255,0.1);
    strokeWeight(4+this.thickness);
    line(x,y,w,h);
    stroke(this.colour,255,255,0.1);
    strokeWeight(9+this.thickness);
    line(x,y,w,h);
    stroke(this.colour,255,255,0.1);
    strokeWeight(16+this.thickness);
    line(x,y,w,h);
    stroke(this.colour,255,255,0.1);
    strokeWeight(25+this.thickness);
    line(x,y,w,h);
    strokeWeight(5+this.thickness);
    stroke(this.colour,255,255);
    line(x,y,w,h);
  }
  done(){return false;}
}
