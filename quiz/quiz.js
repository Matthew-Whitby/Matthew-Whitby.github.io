var currentQuestions=[],allQuestions=[],answeredQuestions=[],players=[];
var generalQs=[],scienceQs=[],geographyQs=[],historyQs=[],tvFilmQs=[],celebQs=[],foodQs=[],artQs=[],musicQs=[];
var currentQuestion,progressBar,currentPlayers=1;

function NextQuestion(){
   if(currentQuestions.length>1){
      if(currentQuestion){
         AnsweredQuestion(currentQuestion.GetId());
         answeredQuestions.push(currentQuestion);
      }
      GetQuestion();
   }
   else{
      if(currentQuestions.length==1){
         AnsweredQuestion(currentQuestion.GetId());
         answeredQuestions.push(currentQuestion);
      }
      document.getElementById("question").innerText="END OF QUESTIONS";
      document.getElementById("answer").innerText="END OF QUESTIONS";
   }
}

function GetQuestion(){
   var id,pos;
   var select=document.getElementById("categorySelection");
   var selected=select.options[select.selectedIndex].value;
   switch(selected){
      case"All":
         pos=Math.floor(Math.random()*currentQuestions.length);
         id=currentQuestions[pos].GetId();
         break;
      case"General":
         pos=Math.floor(Math.random()*generalQs.length);
         id=generalQs[pos];
         break;
      case"ScienceNature":
         pos=Math.floor(Math.random()*scienceQs.length);
         id=scienceQs[pos];
         break;
      case"Georgraphy":
         pos=Math.floor(Math.random()*geographyQs.length);
         id=geographyQs[pos];
         break;
      case"History":
         pos=Math.floor(Math.random()*historyQs.length);
         id=historyQs[pos];
         break;
      case"TvFilm":
         pos=Math.floor(Math.random()*tvFilmQs.length);
         id=tvFilmQs[pos];
         break;
      case"Celebrities":
         pos=Math.floor(Math.random()*celebQs.length);
         id=celebQs[pos];
         break;
      case"Food":
         pos=Math.floor(Math.random()*foodQs.length);
         id=foodQs[pos];
         break;
      case"Art":
         pos=Math.floor(Math.random()*artQs.length);
         id=artQs[pos];
         break;
      case"Music":
         pos=Math.floor(Math.random()*musicQs.length);
         id=musicQs[pos];
         break;
   }
   
   var newQuestion=QuestionFromID(id);
   DisplayQuestion(newQuestion);
}

function AnsweredQuestion(qNum){
   var questionPos=QuestionPosFromID(qNum,currentQuestions);
   currentQuestions.splice(questionPos,1);
}

function QuestionPosFromID(n,array){
   var l=0,r=array.length-1,pointer;
   while(!found){
      pointer=Math.floor((l+r)/2);
      if(array[pointer].GetId()==n)return pointer;
      else if(array[pointer].GetId()<n)l=pointer+1;
      else r=pointer-1;
   }
}

function QuestionFromID(n,array){
   var l=0,r=array.length-1,pointer;
   while(!found){
      pointer=Math.floor((l+r)/2);
      if(array[pointer].GetId()==qNum){
         return array[pointer];
      }
      else if(array[pointer].GetId()<qNum)l=pointer+1;
      else r=pointer-1;
   }
}

function DisplayQuestion(question){
   document.getElementById("question").innerText=question.GetQuestion();
   document.getElementById("answer").innerText=question.GetAnswer();
   currentQuestion=question;
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
   name.addEventListener("change",function(){UpdatePlayerName(this)});
   name.id="PP_"+pNum+"_Name";
   name.value="Player "+pNum;
   newPanel.appendChild(name);
   var scoreBox=document.createElement("div");
   scoreBox.id="PP_"+pNum+"_ScoreBox";
   scoreBox.addEventListener("click",function(){UpdatePoint(this,1)});
   var pointLabel=document.createElement("h2");
   pointLabel.classList.add("unselectable");
   pointLabel.innerHTML="Points";
   scoreBox.appendChild(pointLabel);
   var pointDisplay=document.createElement("h2");
   pointDisplay.classList.add("unselectable");
   pointDisplay.id="PP_"+pNum+"_Points";
   pointDisplay.innerHTML="0";
   scoreBox.appendChild(pointDisplay);
   newPanel.appendChild(scoreBox);
   var addPointButton=document.createElement("button");
   addPointButton.addEventListener("click",function(){UpdatePoint(this,1)});
   addPointButton.id="PP_"+pNum+"_AddPoint";
   addPointButton.innerHTML="Add Point";
   newPanel.appendChild(addPointButton);
   var removePointBtn=document.createElement("button");
   removePointBtn.addEventListener("click",function(){UpdatePoint(this,-1)});
   removePointBtn.id="PP_"+pNum+"_RemovePoint";
   removePointBtn.innerHTML="Remove Point";
   newPanel.appendChild(removePointBtn);
   panels.appendChild(newPanel);
}

function ClearAllPoints(){
   players.map(p=>{
      p.SetScore(0);
      document.getElementById("PP_"+p.GetId()+"_points").innerHTML="0";
   });
}

function UpdatePoint(player,point){
   pNum=player.id.split('_')[1];
   var pl=GetPlayer(pNum);
   pl.UpdateScore(point);
   document.getElementById("PP_"+pNum+"_Points").innerText=pl.GetScore();
}

function UpdatePlayerName(n){
   var pNum=n.id.split('_')[1];
   var pl=GetPlayer(pNum);
   pl.SetName(n.value);
}

function GetPlayer(pNum){for(var i=0;i<players.length;i++)if(players[i].GetId()==pNum)return players[i];}

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
         case 0:currentQuestion.SetQuestion(curLine);break;
         case 1:currentQuestion.SetAnswer(curLine);break;
         case 2:
            currentQuestion.SetCategory(curLine);
            switch(curLine){
               case"science":scienceQs.push(currentQuestion.GetId());break;
               case"general":generalQs.push(currentQuestion.GetId());break;
               case"geography":geographyQs.push(currentQuestion.GetId());break;
               case"history":historyQs.push(currentQuestion.GetId());break;
               case"tvFilm":tvFilmQs.push(currentQuestion.GetId());break;
               case"celebrities":celebQs.push(currentQuestion.GetId());break;
               case"food":foodQs.push(currentQuestion.GetId());break;
               case"art":artQs.push(currentQuestion.GetId());break;
               case"music":musicQs.push(currentQuestion.GetId());break;
            }
            allQuestions.push(currentQuestion);
            move(Math.round((i/(arrLines.length-1))*100));
            currentQuestion=new Question(++idCounter);
            break;
      }
   }
   move(100);
   document.getElementById("quizWindow").style.display="block";
   document.getElementById("loadingScreen").style.display="none";
   Initialise();
}

function move(percentage){
   progressBar.style.width=percentage+'%'; 
   progressBar.innerHTML=percentage*1+'%';
 }