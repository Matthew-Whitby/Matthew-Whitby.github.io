var mr=0.01;

function Vehicle(x,y,dna){
  this.acc=createVector(0,0);
  this.vel=createVector(0,-2);
  this.pos=createVector(x,y);
  this.r=4;
  this.maxspeed=5;
  this.maxforce=0.5;
  this.health=1;
  this.dna=[];
  if(dna===undefined){
    // Food weight
    this.dna[0]=random(-2,2);
    // Poison weight
    this.dna[1]=random(-2,2);
    // Food perception
    this.dna[2]=random(0,100);
    // Poision Percepton
    this.dna[3]=random(0,100);
  }else{
    // Mutation
    this.dna[0]=dna[0];
    if(random(1)<mr)this.dna[0]+=random(-0.1,0.1);
    this.dna[1]=dna[1];
    if(random(1)<mr)this.dna[1]+=random(-0.1,0.1);
    this.dna[2]=dna[2];
    if(random(1)<mr)this.dna[2]+=random(-10,10);
    this.dna[3]=dna[3];
    if(random(1)<mr)this.dna[3]+=random(-10,10);
  }

  //Method to update location
  this.update=()=>{
    this.health-=0.005;
    //Update velocity
    this.vel.add(this.acc);
    //Limit speed
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    //Reset accelerationelertion to 0 each cycle
    this.acc.mult(0);
  }

  this.applyForce=(force)=>{
    //We could add mass here if we want A = F / M
    this.acc.add(force);
  }

  this.behaviors=(good,bad)=>{
    var steerG=this.eat(good,0.2,this.dna[2]);
    var steerB=this.eat(bad,-1,this.dna[3]);
    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  this.clone=function(){
    if(random(1)<0.002)return new Vehicle(this.pos.x,this.pos.y,this.dna);
    return null;
  }

  this.eat=(list,nutrition,perception)=>{
    var record=Infinity;
    var closest=null;
    for(var i=list.length-1;i>=0;i--){
      var d=this.pos.dist(list[i]);
      if(d<this.maxspeed){
        list.splice(i,1);
        this.health+=nutrition;
      }else{
        if(d<record&&d<perception){
          record=d;
          closest=list[i];
        }
      }
    }
    //This is the moment of eating!
    if(closest!=null)return this.seek(closest);
    return createVector(0,0);
  }

  //A method that calculates a steering force towards a target
  //STEER=DESIRED MINUS VELOCITY
  this.seek=(target)=>{
    var desired=p5.Vector.sub(target,this.pos);//A vector pointing from the location to the target
    desired.setMag(this.maxspeed);
    var steer=p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxforce);//Limit to maximum steering force
    return steer;
  }

  this.dead=()=>{
    return(this.health<0)
  }

  this.display=()=>{
    //Draw a triangle rotated in the direction of velocity
    var angle=this.vel.heading()+PI/2;
    push();
    translate(this.pos.x,this.pos.y);
    rotate(angle);
    if(debug.checked()){
      strokeWeight(3);
      stroke(0,255,0);
      noFill();
      line(0,0,0,-this.dna[0]*25);
      strokeWeight(2);
      ellipse(0,0,this.dna[2]*2);
      stroke(255,0,0);
      line(0,0,0,-this.dna[1]*25);
      ellipse(0,0,this.dna[3]*2);
    }
    var gr=color(0,255,0);
    var rd=color(255,0,0);
    var col=lerpColor(rd,gr,this.health);
    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0,-this.r*2);
    vertex(-this.r,this.r*2);
    vertex(this.r,this.r*2);
    endShape(CLOSE);
    pop();
  }

  this.boundaries=()=>{
    var d=25;
    var desired=null;
    if(this.pos.x<d)desired=createVector(this.maxspeed,this.vel.y);
    else if(this.pos.x>width-d)desired=createVector(-this.maxspeed,this.vel.y);
    if(this.pos.y<d)desired=createVector(this.vel.x,this.maxspeed);
    else if(this.pos.y>height-d)desired=createVector(this.vel.x,-this.maxspeed);
    if(desired!==null){
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer=p5.Vector.sub(desired,this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}