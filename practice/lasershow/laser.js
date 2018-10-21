class Laser {

  constructor(slx,etx,sly,ery){
    let sx = slx;
    let ex = etx;
    let sy = sly;
    let ey = ery;
console.log(sx);
console.log(ex);
console.log(sy);
console.log(ey);
  }

  render() {
    stroke(255);
    strokeWeight(10);
    if(this.ex == -100){
      //line(0,this.sy,windowWidth,this.ey);
    }else{
      //line(this.sx,0,this.ex,windowHeight);
    }
  }

  done(){
    return false;
  }
}
