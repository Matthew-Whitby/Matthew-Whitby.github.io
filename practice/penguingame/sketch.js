var backgrounds=[];//levels 0-5 then game over
var penguinL=[];
var penguinR=[];
var penguinPeck=[];//0=left|1=right
var bigBoiBossWhale;
var hearts=[];//0=full|1=empty
var badgerL=[];
var badgerR=[];
var spleen;
var soundTrack=[];
var currentBg;
var cols=237;
var rows=63;
var pixelUnit;

function preload(){
   createCanvas(cols,rows);
   background(loadImage('resources/SplashScreen.png'));
   for(var i=0;i<=5;i++){
      var img=loadImage('resources/Scene'+i+'.png');
      backgrounds.push(img);
   }
   for(var i=1;i<=2;i++){
      penguinL.push(loadImage('resources/PenguinLeft'+i+'.png'));
      penguinR.push(loadImage('resources/PenguinRight'+i+'.png'));
      badgerL.push(loadImage('resources/BadgerL'+i+'.png'));
      badgerR.push(loadImage('resources/BadgerR'+i+'.png'));
   }
   backgrounds.push(loadImage('resources/GameOver.png'));
   penguinPeck.push(loadImage('resources/PenguinLeftPeck.png'));
   penguinPeck.push(loadImage('resources/PenguinRightPeck.png'));
   bigBoiBossWhale=loadImage('resources/Whale.png');
   hearts.push(loadImage('resources/HeartFull.png'));
   hearts.push(loadImage('resources/HeartEmpty.png'));
   spleen=loadImage('resources/Spleen.png');
   soundTrack.push(loadSound('resources/Penguin_Horror_long.wav'));
   soundTrack.push(loadSound('resources/Penguin_Game_Backing_Music_1_final.wav'));

}

function setup(){
   createCanvas(cols,rows);
   currentBg=backgrounds[0];
   background(currentBg);
   pixelUnit=createVector(width/cols,height/rows);
}

function draw(){

}

function windowResized(){
   resizeCanvas(cols,rows);
   background(currentBg);
   pixelUnit.x=width/cols;
   pixelUnit.y=height/rows;
 }

 function keyPressed(){
   if(keyCode === 72){
     var x = document.getElementsByTagName("Button");
     if(x.length > 0){
        if(x[0].hidden == false){
           for(var i = 0; i < x.length; i++){
              x[i].hidden = true;
            }
        }else{
           for(var i = 0; i < x.length; i++){
              x[i].hidden = false;
            }
        }
     }
   }
 }