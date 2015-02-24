/**
 * Created by EL.
 * Date: 16.10.12
 * Time: 12:35
 * Description: test task on HTML5
 */
//document.write(getScore(6));

function gameSquares(htmlBlockId, renderMode, buttonW,buttonH,fieldW,fieldH,rounded,colorCount) {

    this.reDraw=function(area){
        if(this.renderMode==0){
            if (area=="block"){
                for (x=0;x<this.activeBlock.length;x++){
                    this.htmlContainer.children[this.activeBlock[x].ver].children[this.activeBlock[x].hor].className="ballButton col0";
                }
            }
            if (area=="all"){
                for (y=0;y<this.butonsCountH;y++){
    //                console.log(this.buttons[y]);
                    for (x=0;x<this.butonsCountW;x++){
                        this.htmlContainer.children[y].children[x].className="ballButton col"+this.buttons[y][x];
                    }
                }
            }
            if (area=="markBlock"){
               for (x=0;x<this.activeBlock.length;x++){
                    this.htmlContainer.children[this.activeBlock[x].ver].children[this.activeBlock[x].hor].classList.add("active");
               }
            }
            if (area=="unMarkPrevBlock"){
               for (x=0;x<this.prevActiveBlock.length;x++){
                    this.htmlContainer.children[this.prevActiveBlock[x].ver].children[this.prevActiveBlock[x].hor].classList.remove("active");
               }
               this.prevActiveBlock=[];
            }
        }
        if (this.renderMode==1){
            if (area=="all"){
                canvClean(this.htmlContainer,{tX:0,tY:0,bX:this.fieldWidth,bY:this.fieldHeight},0);
                for (y=0;y<this.butonsCountH;y++){
                    for (x=0;x<this.butonsCountW;x++){
                        cDraw(this.htmlContainer,this.getBallPos(y,x),this.fieldHeight,this.fieldWidth,this.buttons[y][x],this.ButtonsRounded);
                        //console.log(this.getBallPos(y,x));
                    }
                }
            }
            if (area="markBlock"){
                for (x=0;x<this.activeBlock.length;x++){
                    var bX=this.activeBlock[x].hor;
                    var bY=this.activeBlock[x].ver;
                    cDraw(this.htmlContainer,this.getBallPos(bY,bX),this.fieldHeight,this.fieldWidth,0,this.ButtonsRounded);
                    cDraw(this.htmlContainer,this.getBallPos(bY,bX),this.fieldHeight,this.fieldWidth,this.buttons[bY][bX]+10,this.ButtonsRounded);
                }
            }
            if (area="unMarkPrevBlock"){
                for (x=0;x<this.prevActiveBlock.length;x++){
                    var bX=this.prevActiveBlock[x].hor;
                    var bY=this.prevActiveBlock[x].ver;
                    cDraw(this.htmlContainer,this.getBallPos(bY,bX),this.fieldHeight,this.fieldWidth,0,this.ButtonsRounded);
                    cDraw(this.htmlContainer,this.getBallPos(bY,bX),this.fieldHeight,this.fieldWidth,this.buttons[bY][bX],this.ButtonsRounded);
                }
            }
        }
    }

    this.flowButtons=function(){
        var tempButtons=new Array();
        for (y=0;y<this.butonsCountH;y++){
            tempButtons[y]=new Array(this.butonsCountW);
            for (x=0;x<this.butonsCountW;x++){
                tempButtons[y][x]=0;
            }
        }
        var tX = 0;
        var tY = 0;
        var shiftCol = false;
        for (x=0;x<this.butonsCountW;x++){
            if (shiftCol){tX++; shiftCol=false;}
            tY = this.butonsCountH-1;
            for (y=this.butonsCountH-1;y>=0;y--){
                //console.log("x="+x+"; y="+y+"; tX="+tX);
                if (this.buttons[y][x]!=0){
                    tempButtons[tY][tX]=this.buttons[y][x];
                    shiftCol=true;
                    tY--;
                }
            }

        }
        this.buttons= tempButtons;
        this.flowFlag=1;
    }
this.flowFlag=0;
    this.ballsFill=function(elem, color){
        if ((elem.ver<0)||(elem.hor<0)||(elem.ver>=this.butonsCountH)||(elem.hor>=this.butonsCountW)){return;}
        if (this.buttons[elem.ver][elem.hor]==color){
            this.activeBlock[this.activeBlock.length]=elem;
            this.buttons[elem.ver][elem.hor]=0;
        }
        else return;
        this.ballsFill({ver:elem.ver, hor:elem.hor-1},color);
        this.ballsFill({ver:elem.ver, hor:elem.hor+1},color);
        this.ballsFill({ver:elem.ver-1, hor:elem.hor},color);
        this.ballsFill({ver:elem.ver+1, hor:elem.hor},color);
        return;
    }

    this.getBallNum=function(pY,pX){
        var ver = parseInt(pY/(this.fieldHeight/this.butonsCountH));
        var hor = parseInt(pX/(this.fieldWidth/this.butonsCountW));
    //    console.log(ver+"_"+hor)
        return {ver: ver, hor: hor };
    }
    this.getBallPos=function(Y,X){
        var vDim = parseInt(this.fieldHeight/this.butonsCountH);
        var hDim = parseInt(this.fieldWidth/this.butonsCountW);
        var ver=Y*vDim;
        var hor=X*hDim;
        return{tY:ver, tX:hor, bY:ver+vDim, bX:hor+hDim};
    }

    //evMode - режим события - если кликаем то "click"
    //если просто водим мышкой то "move"
    this.checkBalls=function(ballNum, evMode){
        this.prevActiveBlock=this.activeBlock;
        this.activeBlock=new Array();
        if ((ballNum.ver<0)||(ballNum.hor<0)||(ballNum.ver>=this.butonsCountH)||(ballNum.hor>=this.butonsCountW)){return false;}
        if (this.buttons[ballNum.ver][ballNum.hor]==0) {return false;}
        var color = this.buttons[ballNum.ver][ballNum.hor];
        this.ballsFill(ballNum, color);
        if (this.activeBlock.length<=1){
            this.buttons[ballNum.ver][ballNum.hor]=color;
            this.activeBlock=[];
            return false;
        }
        else {
            if (evMode=="move"){
                for (x=0;x<this.activeBlock.length;x++){
                    this.buttons[this.activeBlock[x].ver][this.activeBlock[x].hor]=color;
                }
            }
            return true;
        }
    }

    this.checkIsGameOver=function(){
        var result=true;
        for (x=0;x<this.butonsCountW;x++){
            for (y=this.butonsCountH-1;y>=0;y--){
                if (this.checkBalls({ver: y, hor: x },"move")){
                    result=false;
                    return result;
                }
            }
        }
        return result;
    }

    this.gameOver=function(){
        this.infoPad.childNodes[3].innerHTML="Game Over!";

        if (this.renderMode==0){
            var clickPad = this.htmlContainer.getElementsByClassName("clickPad")[0];
        }
        if (this.renderMode==1){
            var clickPad = this.htmlContainer;
        }
        Event.remove(clickPad,"click",this.clickHandler);
        Event.remove(clickPad,"mousemove", this.moveHandler);
        Event.remove(clickPad,"mouseout", this.moutHandler);
        clickPad.style.cursor="auto";
        this.infoPad.childNodes[4].innerHTML="";
        alert("Game Over");
    }

    this.clickON= function(pY, pX){
        //alert("point Y = "+pY+"; point X = "+pX+";");
        var ballNum=this.getBallNum(pY,pX);
        if (this.checkBalls(ballNum,"click")) {
            this.gameScore+=this.getScore(this.activeBlock.length);
            this.infoPad.childNodes[1].innerHTML=""+this.gameScore;
            //this.reDraw("block");
            this.flowFlag=0;
            this.flowButtons();
            this.activeBlock=[];
            this.reDraw("all");
            if (this.checkIsGameOver()){
                this.gameOver();
            }
            else{
                pY=this.bNum.ver*this.fieldHeight/this.butonsCountH;
                pX=this.bNum.hor*this.fieldWidth/this.butonsCountW;
                this.bNum={ver:-1, hor: -1}
                this.activeBlock=[];
                this.moveON(pY,pX);
            }
        }

    }

    this.moveON = function(pY, pX){
        var ballNum=this.getBallNum(pY,pX);
//        console.log(ballNum.ver+"_"+ballNum.hor);
//        console.log("bnum[ ver: "+this.bNum.ver+"; "+ballNum.ver +"; hor:"+this.bNum.hor+"; "+ballNum.hor);
        if ((this.bNum.ver==ballNum.ver)&&(this.bNum.hor==ballNum.hor)){return;}
        this.bNum=ballNum;
        for (x=0;x<this.activeBlock.length;x++){
            if ((ballNum.ver==this.activeBlock[x].ver)&&(ballNum.hor==this.activeBlock[x].hor)){return;}
        }
        if (this.checkBalls(ballNum,"move")) {
            this.reDraw("markBlock");
            this.infoPad.childNodes[4].innerHTML=""+this.getScore(this.activeBlock.length);
        }
        else{this.infoPad.childNodes[4].innerHTML="";}
        this.reDraw("unMarkPrevBlock");
    }
    this.createEventHandler=function(eventObj){
        this.clickPad=getOffset(eventObj);
        var link = this;
        this.clickHandler = function(event){
            link.clickON(event.pageY-link.clickPad.top,event.pageX-link.clickPad.left);
        };
        this.moveHandler = function(event) {
            link.clickPad=getOffset(eventObj);
            link.moveON(event.pageY-link.clickPad.top,event.pageX-link.clickPad.left);
        };
        this.moutHandler = function(event) {
            link.moveON(-1*link.fieldHeight/link.butonsCountH,-1*link.fieldWidth/link.butonsCountW);
        };
        this.touchMoveHandler = function(event) {
            link.clickPad=getOffset(eventObj);
            link.moveON(event.touches[0].pageY-link.clickPad.top,event.touches[0].pageX-link.clickPad.left);
        };

        Event.add(eventObj, "click", this.clickHandler);
        Event.add(eventObj,"mousemove", this.moveHandler);
        Event.add(eventObj,"mouseout", this.moutHandler);
        Event.add(eventObj,"touchmove", this.touchMoveHandler);
        Event.add(eventObj,"touchend", this.moutHandler);
    }

    this.htmlDOMeCreate=function(){
        for (y=0;y<this.butonsCountH;y++){
        var grid = document.createElement("div");
        grid.className="ballGrid";
        this.htmlContainer.appendChild(grid);
        for (x=0;x<this.butonsCountW;x++){
            var ball = document.createElement("div");
            ball.className="ballButton col"+this.buttons[y][x];
            grid.appendChild(ball);
            }
        }
        var clickPad = document.createElement("div");
        clickPad.className="clickPad";
        this.htmlContainer.appendChild(clickPad);
        return clickPad;
    }

    this.initButtons=function(){
        this.buttons=new Array (this.butonsCountH);
        for (y=0;y<this.butonsCountH;y++){
            this.buttons[y]=new Array(this.butonsCountW);
            for (x=0;x<this.butonsCountW;x++){
                this.buttons[y][x]=getRandomInt(1,this.colorCount);
            }
        }
    }

    //добавлять стили
    this.writeStyle=function(){
        var styleContainer = document.createElement("style");
        styleContainer.id="GameSquareStyles"+this.htmlContainer.id;
        var w = Math.round(this.fieldWidth/this.butonsCountW)-2;//два пикселя на границу
        var h = Math.round(this.fieldHeight/this.butonsCountH)-2;
        var radius = w<h?w:h;
        radius = this.ButtonsRounded==0?"0":this.ButtonsRounded==1?radius/4+"px":radius+"px";
        styleContainer.innerHTML="#"+this.htmlContainer.id+" .ballButton{width:"+w+"px;height:"+h+"px; border-radius:"+radius+";}";
        styleContainer.innerHTML+="#"+this.htmlContainer.id+" .ballGrid{height:"+this.fieldHeight/this.butonsCountH+"px;}";
        var morecolor="";
        var cols="";
        var allColors=this.colorCount;
        if (allColors>5){
            morecolor="{position:absolute; text-align:center; width:"+w+"px; height:"+h+"px;}";
            cols+=".col6:after";
            morecolor+=' .col6:after{content:"6";}';
            for(x=7;x<=allColors;x++){
                cols+=", .col"+x+":after ";
                morecolor+=" .col"+x+":after{content:'"+x+"';}";
            }
            morecolor=cols+morecolor;
        }
        styleContainer.innerHTML+=morecolor;
        this.htmlContainer.appendChild(styleContainer);
    }

    this.createInfoPad=function(){
        var infoPad = document.createElement("div");
        infoPad.id="GameSquareInfo"+this.htmlContainer.id;
        var textSpan=document.createElement("span");
        textSpan.innerHTML="Score: ";
        infoPad.appendChild(textSpan);
        textSpan=document.createElement("span");
        textSpan.id="scoreResult"+this.htmlContainer.id;
        this.gameScore=0;
        textSpan.innerHTML=this.gameScore;
        infoPad.appendChild(textSpan);
        infoPad.appendChild(document.createElement("br"));
        textSpan=document.createElement("span");
        textSpan.innerHTML="Block score: ";
        infoPad.appendChild(textSpan);
        textSpan=document.createElement("span");
        textSpan.id="scoreBlock"+this.htmlContainer.id;
        textSpan.innerHTML="";
        infoPad.appendChild(textSpan);
        this.infoPad = infoPad;
        this.htmlContainer.parentNode.appendChild(infoPad);
    }

    this.newGame=function(){
        this.initButtons();
        if (this.renderMode==0){
            var clickPad = this.htmlDOMeCreate();
            this.createEventHandler(clickPad);
            this.writeStyle();
        }
        if (this.renderMode==1){
            this.htmlContainer.style.cursor="pointer";
            this.createEventHandler(this.htmlContainer);
            this.reDraw("all");
        }
        this.createInfoPad();
    }

    this.initial=function(blockId){
        if ((this.colorCount < 1 ) || (typeof(this.colorCount)!="number")){
            error(1); return;
        }
        this.htmlContainer = document.getElementById(blockId);
        this.htmlContainer.innerHTML="";
        if (this.renderMode==0){
            var wrap=document.createElement("div");
            wrap.id=this.htmlContainer.id+"Wrap";
            this.htmlContainer.appendChild(wrap);
            this.htmlContainer=wrap;
            this.htmlContainer.className="SquaresGameField";
        }
        if (this.renderMode==1){
            var canv=document.createElement("canvas");
            canv.id=this.htmlContainer.id+"Wrap";
            canv.width=this.fieldWidth;
            canv.height=this.fieldHeight;
            canv.innerHTML="<strong>Поиграть не получиться ваш браузер устарел.<br> Попробуйте перезапустить игру с установленной галочкой &laquo;Старый браузер&raquo;</strong>";
            this.htmlContainer.appendChild(canv);
            this.htmlContainer=canv;
        }

        this.htmlContainer.style.width=this.fieldWidth+"px";
        this.htmlContainer.style.height=this.fieldHeight+"px";
        this.newGame();
    }
	
	//Задача функции подсчитывать количество очков в зависимости от количества элементов в блоке
	this.getScore= function (blockCount){
		return parseInt(blockCount*blockCount*this.scoreFactor);
	}
    typeof(buttonW)== "number" ? this.butonsCountW = buttonW : this.butonsCountW = gameButtonsWidthCount;
    typeof(buttonH)== "number" ? this.butonsCountH = buttonH : this.butonsCountH = gameButtonsHeightCount;
	this.scoreFactor=maxGameScore/Math.pow(this.butonsCountH*this.butonsCountW,2);
    typeof(fieldW)== "number" ? this.fieldWidth = fieldW : this.fieldWidth = gameFieldWidth;
    typeof(fieldH)== "number" ? this.fieldHeight = fieldH : this.fieldHeight = gameFieldHeight;
    typeof(rounded)== "number" ? this.ButtonsRounded = rounded : this.ButtonsRounded = gameButtonsRounded;
    typeof(renderMode)== "number" ? this.renderMode = renderMode : this.renderMode = gameRenderMode;
    typeof(colorCount)== "number" ? this.colorCount = colorCount : this.colorCount = gameButtonsColourCount;
    this.bNum={ver: -1, hor: -1 };
    this.activeBlock=[];
    this.prevActiveBlock=[];
    this.initial(htmlBlockId);
}

function error(eCode){
    eCode==1 ? console.log("error: of Count Color in Config! Check Config file."):undefined;
    eCode==2 ? console.log("error: colors is more 5"):undefined;
}
