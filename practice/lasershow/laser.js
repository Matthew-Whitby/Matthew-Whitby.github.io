class Laser {

  constructor(slx,etx,sly,ery){
    let sx = slx;
    let ex = etx;
    let sy = sly;
    let ey = ery;

  }

  render() {
    stroke(255);
    strokeWeight(10);
    if(ex == -100){
      line(0,sy,windowWidth,ey);
    }else{
      line(sx,0,ex,windowHeight);
    }
  }

  this.done = function() {
    return false;
  }
}
