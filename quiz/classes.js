class Player{
   constructor(){}
   SetValues(pId,pName){this.mId=pId;this.mName=pName;this.mScore=0;}
   SetName(pName){this.mName=pName;}
   GetName(){return this.mName;}
   SetScore(pPoints){this.mScore=mScore;}
   UpdatePoint(n){this.mScore+=n;}
   GetScore(){return this.mScore;}
   GetId(){return this.mId;}
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