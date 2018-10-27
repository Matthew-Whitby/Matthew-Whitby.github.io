function keyPressed() {
   if(keyCode === 75){
      var x = document.getElementsByTagName("Button");
      for(var i = 0; i < x.length; i++){
        console.log(x[i]);
        x[i].style.visbility = "hidden";
        console.log(x[i]);
      }
      
    }
}