var currentQuestions=[],allQuestions=[],progressBarLevel=0;
function answeredQuestion(qNum,arrPos){
   length=currentQuestions.length;
   console.log(length);
}

class Question{
   constructor(pId){this.mId=pId;}
   setQuestion(pQuestion){this.mQuestion=pQuestion;}
   getQuestion(){return this.mQuestion;}
   setAnswer(pAnswer){this.mAnswer=pAnswer;}
   getAnswer(){return this.mAnswer;}
   setCategory(pCategory){this.mCategory=pCategory;}
   getCategory(){return this.mCategory;}
   getID(){return this.mId;}
}

function LoadFile(){
   var oFrame=document.getElementById("frmFile");
   var strRawContents=oFrame.contentWindow.document.body.childNodes[0].innerHTML;
   while(strRawContents.indexOf("\r")>=0)
       strRawContents=strRawContents.replace("\r","");
   var arrLines=strRawContents.split("\n");
   var idCounter=0,counter=0;
   var currentQuestion=new Question(idCounter);
   for(var i=0;i<arrLines.length;i++){
       var curLine=arrLines[i];
       if(curLine=="")continue;
       switch(counter){
          case 0:currentQuestion.setQuestion(curLine);counter++;break;
          case 1:currentQuestion.setAnswer(curLine);counter++;break;
          case 2:
            currentQuestion.setCategory(curLine);
            counter=0;
            allQuestions.push(currentQuestion);
            var percentage=(i/arrLines.length-1)*100;
            move(percentage);
            currentQuestion=new Question(++idCounter);
            break;
       }
   }
   console.log(allQuestions);
   document.getElementById("quizWindow").style.display="block";
   //document.getElementById("loadingScreen").style.display="none";
}

function move(percentage){
   var elem=document.getElementById("myBar");   
   var id=setInterval(frame,10);
   function frame(){
     if(progressBarLevel>=percentage){
       clearInterval(id);
     }else{
      progressBarLevel++; 
       elem.style.width=progressBarLevel+'%'; 
       elem.innerHTML=progressBarLevel*1+'%';
     }
   }
 }