var currentQuestions=[],allQuestions=[];
var progressBar;
function answeredQuestion(qNum,arrPos){
   length=currentQuestions.length;
   console.log(length);
}

function Initialise(){
   currentQuestions=allQuestions;
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
   var idCounter=0,counter=-1;
   var currentQuestion=new Question(idCounter);
   progressBar=document.getElementById("myBar");
   console.log(arrLines.length);
   for(var i=0;i<arrLines.length;i++){
       var curLine=arrLines[i];
       if(curLine=="")continue;
       switch(counter=(counter==2)?0:counter+1){
          case 0:currentQuestion.setQuestion(curLine);break;
          case 1:currentQuestion.setAnswer(curLine);break;
          case 2:
            currentQuestion.setCategory(curLine);
            allQuestions.push(currentQuestion);
            var percentage=Math.round((i/(arrLines.length-1))*100);
            move(percentage);
            currentQuestion=new Question(++idCounter);
            break;
       }
   }
   move(100);
   console.log(allQuestions);
   document.getElementById("quizWindow").style.display="block";
   document.getElementById("loadingScreen").style.display="none";
   Initialise();
}

function move(percentage){
   progressBar.style.width=percentage+'%'; 
   progressBar.innerHTML=percentage*1+'%';
 }