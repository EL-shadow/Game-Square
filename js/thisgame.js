function setOldBrowser(){
	var checkbox = document.getElementById("oldBrowserCheckBox");
	var rendmode="";
	rendmode = checkbox.checked?0:1;
	gameRenderMode=rendmode;
}
function reload1(){
	 var t1 = new gameSquares('game1');
}	
function reload2(){
	 var t2 = gameSquares('game2',gameRenderMode,15,15,495,495,2,3);
}	