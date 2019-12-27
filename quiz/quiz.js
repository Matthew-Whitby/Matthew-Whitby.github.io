var currentQuestions=[],allQuestions=[],players=[];
var currentQuestionID,progressBar,currentPlayers=1;
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
   newPanel.classList.add("PP");
   newPanel.id="PP_"+pNum;
   var span=document.createElement("span");
   span.innerHTML="Player/Team Name:";
   newPanel.appendChild(span);
   var name=document.createElement("input");
   name.type="text";
   name.id="PP_"+pNum+"_Name";
   name.value="Player "+pNum;
   newPanel.appendChild(name);
   var scoreBox=document.createElement("div");
   scoreBox.id="PP_"+pNum+"_ScoreBox";
   scoreBox.addEventListener("click",UpdatePoint);
   var pointLabel=document.createElement("h2");
   pointLabel.classList.add("unselectable");
   pointLabel.innerHTML="Points";
   scoreBox.appendChild(pointLabel);
   var pointDisplay=document.createElement("h2");
   pointDisplay.classList.add("unselectable");
   pointDisplay.id="PP_"+pNum+"_points";
   pointDisplay.innerHTML="0";
   scoreBox.appendChild(pointDisplay);
   newPanel.appendChild(scoreBox);
   var addPointButton=document.createElement("button");
   addPointButton.addEventListener("click",UpdatePoint);
   addPointButton.id="PP_"+pNum+"_AddPoint";
   addPointButton.innerHTML="Add Point";
   newPanel.appendChild(addPointButton);
   var removePointBtn=document.createElement("button");
   removePointBtn.addEventListener("dblclick",UpdatePoint);
   removePointBtn.id="PP_"+pNum+"_RemovePoint";
   removePointBtn.innerHTML="Remove Point";
   newPanel.appendChild(removePointBtn);
   panels.appendChild(newPanel);
   console.log(players);
}

function UpdatePoint(player,point){
   pNum=player.id.split('_')[1];
   var pl=GetPlayer(pNum);
   pl.UpdateScore(point);
   document.getElementById("PP_"+pNum+"_points").innerText=pl.GetScore();
}

function GetPlayer(pNum){
   for(var i=0;i<players.length;i++){
      if(players[i].GetId()==pNum)return players[i];
   }
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
   progressBar.innerHTML=percentage*1+'%';
 }