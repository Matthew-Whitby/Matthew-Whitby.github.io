var lasers=[];
function setup(){
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  colorMode(HSB);
  stroke(255);
  strokeWeight(4);
  background(0);
}

async function draw() {
  await sleep(100);
  if(random(1)<1){
    if(lasers.length>0){
      clear();
      lasers.splice(0,1);
    }
    let colour=random(255);
    if(random(1)>0.5){//create 'vertical laser'
      sx=Math.round(random(windowWidth));
      ex=Math.round(random(windowWidth));
      sy=-100;
      ey=-100;
    }else{//create 'horizontal laser'
    sy=Math.round(random(windowHeight));
    ey=Math.round(random(windowHeight));
    sx=-100;
    ex=-100;
    }
    lasers.push(new Laser(sx,ex,sy,ey,colour));
  }
    for(let i=lasers.length-1;i>=0;i--){
      //lasers[i].update();
      lasers[i].render();
      if(lasers[i].done()){
        lasers.splice(i,1);
      }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function keyPressed(){
  if(keyCode === 72){
    var x=document.getElementsByTagName("Button");
    if(x.length>0){
       if(!x[0].hidden)for(var i=0;i<x.length;i++)x[i].hidden=true;
       else for(var i = 0; i < x.length; i++)x[i].hidden=false;
    }
  }
}
