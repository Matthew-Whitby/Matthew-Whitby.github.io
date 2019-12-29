var currentQuestions=[],allQuestions=[],answeredQuestions=[],players=[];
var generalQs,scienceQs,geographyQs,historyQs,tvFilmQs,celebQs,foodQs,artQs,musicQs;
var currentQuestion,progressBar,currentPlayers=1;

function NextQuestion(){

}

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
   var id,pos,array;
   var select=document.getElementById("categorySelection");
   var selected=select.options[select.selectedIndex].value;
   switch(selected){
      case"All":array=currentQuestions;break;
      case"General":array=generalQs;break;
      case"ScienceNature":array=scienceQs;break;
      case"Geography":array=geographyQs;break;
      case"History":array=historyQs;break;
      case"TvFilm":array=tvFilmQs;break;
      case"Celebrities":array=celebQs;break;
      case"Food":array=foodQs;break;
      case"Art":array=artQs;break;
      case"Music":array=musicQs;break;
   }
   pos=Math.floor(Math.random()*array.length);
   id=array[pos];
   var newQuestion=QuestionFromID(id);
   DisplayQuestion(newQuestion);
}

function AnsweredQuestion(qNum){
   var questionPos=QuestionPosFromID(qNum,currentQuestions);
   currentQuestions.splice(questionPos,1);
}

function QuestionPosFromID(n,array){
   var l=0,r=array.length-1,pointer;
   while(1){
      pointer=Math.floor((l+r)/2);
      if(array[pointer].GetId()==n)return pointer;
      else if(array[pointer].GetId()<n)l=pointer+1;
      else r=pointer-1;
   }
}

function QuestionFromID(n){
   var l=0,r=currentQuestions.length-1,pointer;
   while(1){
      pointer=Math.floor((l+r)/2);
      if(currentQuestions[pointer].GetId()==n)return currentQuestions[pointer];
      else if(currentQuestions[pointer].GetId()<n)l=pointer+1;
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
      document.getElementById("PP_"+p.GetId()+"_Points").innerHTML="0";
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
   generalQs=[];
   scienceQs=[];
   geographyQs=[];
   historyQs=[];
   tvFilmQs=[];
   celebQs=[];
   foodQs=[];
   artQs=[];
   musicQs=[];
   allQuestions.map(q=>{
      switch(q.GetCategory()){
         case"General":generalQs.push(q);break;
         case"Science":scienceQs.push(q);break;
         case"Geography":geographyQs.push(q);break;
         case"History":historyQs.push(q);break;
         case"TvFilm":tvFilmQs.push(q);break;
         case"Celebrities":celebQs.push(q);break;
         case"Food":foodQs.push(q);break;
         case"Art":artQs.push(q);break;
         case"Music":musicQs.push(q);break;
      }
   });
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
      var curLine=arrLines[i].trim();
      if(curLine==""||curLine.substring(0,1)=="*")continue;
      switch(counter=(counter==2)?0:counter+1){
         case 0:currentQuestion.SetQuestion(curLine);break;
         case 1:currentQuestion.SetAnswer(curLine);break;
         case 2:
            currentQuestion.SetCategory(curLine);
            allQuestions.push(currentQuestion);
            move(Math.round((i/(arrLines.length-1))*100));
            currentQuestion=new Question(++idCounter);
            break;
      }
   }
   document.getElementById("quizWindow").style.display="block";
   document.getElementById("loadingScreen").style.display="none";
   Initialise();
   move(100);
}

function move(percentage){
   progressBar.style.width=percentage+'%'; 
   progressBar.innerHTML=percentage*1+'%';
 }

 function GenerateRandomNumber(){
    var range=document.getElementById("randomNumInput").value;
    var out=Math.floor(Math.random()*range)+1;
    document.getElementById("randomNumDisplay").innerHTML=out;
 }

 function PrintData(){
   var generalCount=0,scienceCount=0,geographyCount=0,historyCount=0,tvFilmCount=0,celebCount=0,foodCount=0,artCount=0,musicCount=0;
   allQuestions.map(q=>{
      switch(q.GetCategory()){
         case"General":generalCount++;break;
         case"Science":scienceCount++;break;
         case"Geography":geographyCount++;break;
         case"History":historyCount++;break;
         case"TvFilm":tvFilmCount++;break;
         case"Celebrities":celebCount++;break;
         case"Food":foodCount++;break;
         case"Art":artCount++;break;
         case"Music":musicCount++;break;
      }
   });
   console.log("Current Question Data:");
   console.log("Total Quesitons: "+allQuestions.length);
   console.log("General Questions: "+generalCount);
   console.log("Science Questions: "+scienceCount);
   console.log("Geography Questions: "+geographyCount);
   console.log("History Questions: "+historyCount);
   console.log("Tv/Film Questions: "+tvFilmCount);
   console.log("Celebrities Questions: "+celebCount);
   console.log("Food Questions: "+foodCount);
   console.log("Art Questions: "+artCount);
   console.log("Music Questions: "+musicCount);
}