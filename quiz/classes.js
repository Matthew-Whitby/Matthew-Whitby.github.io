class Player{
   constructor(){this.mID=++currentPlayers;}
   SetName(pName){this.mName=pName;}
   GetName(){return this.mName;}
   SetScore(pPoints){this.mPoints=pPoints;}
   UpdatePoint(n){this.mPoints+=n;}
   GetScore(){return this.mScore;}
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