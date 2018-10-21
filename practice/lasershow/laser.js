class Laser {

  constructor(slx,etx,sly,ery){
    this.sx = slx;
    this.ex = etx;
    this.sy = sly;
    this.ey = ery;
  }

  render() {
    stroke(255);
    strokeWeight(10);
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
