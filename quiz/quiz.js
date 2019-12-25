allQuestions=[];
currentQuestions=[];
function answeredQuestion(qNum,arrPos){
   length=currentQuestions.length;
   console.log(length);
}

function LoadQuestions(){
   question=new Question();
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
   //console.log("File "+oFrame.src+" has "+arrLines.length+" lines");
   var idCounter=0;
   var currentQuestion=new Question(idCounter);
   var counter=0;
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
            currentQuestion=new Question(++idCounter);
            break;
       }
       //console.log("Line #"+(i+1)+" is: '"+curLine+"'");
   }
   console.log(allQuestions);
}