class Player{
   constructor(){}
   SetValues(pId,pName){this.mId=pId;this.mName=pName;this.mScore=0;}
   SetName(pName){this.mName=pName;}
   GetName(){return this.mName;}
   SetScore(pScore){this.mScore=pScore;}
   UpdateScore(n){this.mScore+=n;}
   GetScore(){return this.mScore;}
   GetId(){return this.mId;}
}

class Question{
   constructor(pId){this.mId=pId;}
   SetQuestion(pQuestion){this.mQuestion=pQuestion;}
   GetQuestion(){return this.mQuestion;}
   SetAnswer(pAnswer){this.mAnswer=pAnswer;}
   GetAnswer(){return this.mAnswer;}
   SetCategory(pCategory){this.mCategory=pCategory;}
   GetCategory(){return this.mCategory;}
   GetId(){return this.mId;}
}