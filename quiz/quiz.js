var currentQuestions=[],allQuestions=[];
var progressBar;
var currentQuestionID;
var currentPlayers=1;
var players=[];
function answeredQuestion(qNum){
   length=currentQuestions.length;
   console.log(length);
   found=false;
   var l=0,r=currentQuestions.length-1,pointer;
   while(!found){
      pointer=Math.floor(l+r/2);
      if(currentQuestions[pointer].getID()==qNum){currentQuestions.splice(currentQuestions[pointer],1);found=true;}
      else if(currentQuestions[pointer].getID()<qNum)l=pointer+1;
      else r=pointer-1;
   }
   console.log("REMOVED");
}

function DisplayQuestion(question){
   document.getElementById("question").innerText=question.getQuestion();
   document.getElementById("answer").innerText=question.getAnswer();
   currentQuestionID=question.getID();
}

function AddPlayer(){
   var pNum=players[players.length-1].GetId()+1;
   var player=new Player();
   player.SetValues(pNum,"Player "+pNum);
   players.push(player);
   panels=document.getElementById("playerPanels");
   var newPanel=document.createElement("div");
   newPanel.classList.add("playerPanel");
   newPanel.id="playerPanel_"+pNum;



   panels.appendChild(newPanel);
   console.log(players);
}

function UpdatePoint(player,point){
   pNum=player.id.split('_')[1];
   players[pNum-1][2]+=point;
   document.getElementById("PP_"+pNum+"_points").innerText=players[pNum-1][2];
}

function Initialise(){
   currentQuestions=allQuestions;
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
   for(var i=0;i<arrLines.length;i++){
       var curLine=arrLines[i];
       if(curLine=="")continue;
       switch(counter=(counter==2)?0:counter+1){
          case 0:currentQuestion.setQuestion(curLine);break;
          case 1:currentQuestion.setAnswer(curLine);break;
          case 2:
            currentQuestion.setCategory(curLine);
            allQuestions.push(currentQuestion);
            move(Math.round((i/(arrLines.length-1))*100));
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
   progressBar.innerHTML=percentage+"%";
 }