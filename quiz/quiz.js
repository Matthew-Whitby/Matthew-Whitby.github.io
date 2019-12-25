allQuestions={};
function answeredQuestion(qNum,arrPos){
   length=currentQuestions.length;
   console.log(length);
}

function LoadQuestions(){
   question=new Question("");
}

class Question{
   constructor(pQuestion,pAnswer,pCategory){
      mQuestion=pQuestion;
      mAnswer=pAnswer;
      mCategory=pCategory;
   }
   getQuestion(){return mQuestion;}
   getAnswer(){return mAnswer;}
   getCategory(){return mCategory;}
}

function LoadFile() {
   var oFrame = document.getElementById("frmFile");
   var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
   while (strRawContents.indexOf("\r") >= 0)
       strRawContents = strRawContents.replace("\r", "");
   var arrLines = strRawContents.split("\n");
   console.log("File " + oFrame.src + " has " + arrLines.length + " lines");
   for (var i = 0; i < arrLines.length; i++) {
       var curLine = arrLines[i];
       console.log("Line #" + (i + 1) + " is: '" + curLine + "'");
   }
}