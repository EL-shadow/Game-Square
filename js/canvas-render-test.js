/**
 * Created by EL.
 * User: EL
 * Date: 30.10.12
 * Time: 21:03
 * Canvas functions
 */

function cDraw(canvas,ballPos,fH,fW,color){
    var myCanvas = canvas;
    var context = myCanvas.getContext('2d');


/*
    context.fillStyle = getGradient(0,context,0,0,300,300);
    context.fillRect(0,0,300,300);*/


    if (color==0){
    context.fillStyle = getGradient(color,context,0,0,fW,fH);
    }else {
        context.fillStyle="black";

    context.fillRect(ballPos.tX,ballPos.tY,ballPos.bX-ballPos.tX,ballPos.bY-ballPos.tY);

    context.clearRect(ballPos.tX+1,ballPos.tY+1,ballPos.bX-ballPos.tX-2,ballPos.bY-ballPos.tY-2);
        context.fillStyle = getGradient(color,context,ballPos.tX+1,ballPos.tY+1,ballPos.bX-1,ballPos.bY-1);

    }
    context.fillRect(ballPos.tX+1,ballPos.tY+1,ballPos.bX-ballPos.tX-2,ballPos.bY-ballPos.tY-2);
    //console.log(ballPos.tX+1,ballPos.tY+1,ballPos.bX-ballPos.tX-2,ballPos.bY-ballPos.tY-2)

}

function canvClean(canvas,ballPos,color){
    var myCanvas = canvas;
        var context = myCanvas.getContext('2d');
    context.fillStyle = getGradient(0,context,0,0,300,300);
    context.fillRect(0,0,300,300);
    //context.scale(1,0.5);

}

function getGradient(colNum,cntx,x1,y1,x2,y2){
    var gradient = cntx.createLinearGradient(x1, y1, x2, y2);
    if (colNum>colorsPresets.length){return gradient;}
    for (var x=0;x<colorsPresets[colNum].length;x++){
        gradient.addColorStop(colorsPresets[colNum][x][0],colorsPresets[colNum][x][1]);
    }
    return gradient;
}

function test(){
    var myCanvas = document.getElementById("canvas");
    var context = myCanvas.getContext('2d');
    context.fillStyle = getGradient(0,context,0,0,300,300);
    //context.fillStyle="white";
    context.fillRect(0,0,300,300);
    context.fillStyle="black";
    context.fillRect(120,140,20,20);
    context.fillStyle = getGradient(2,context,121,141,139,159);
    context.fillRect(121,141,18,18);
    /*---------------------------------*/
    var g = context;
    g.beginPath();
    context.fillStyle = getGradient(2,context,141,141,159,159);
    g.arc(150, 150, 9.5, 0, degToRad(360) /* Math.PI * 2 */, true);
    g.fill();
    g.stroke();
    /*---------------------------------*/
    g.beginPath();
    //Перемещаемся в начальную точку рисования
    g.moveTo(160.5, 140.5);
    g.lineTo(179.5, 140.5);
    g.lineTo(179.5, 159.5);
    g.lineTo(160.5, 159.5);
    g.lineTo(160.5, 140.5);
    context.fillStyle = getGradient(2,context,160,140,180,160);
    g.fill();
    //Не забываем про этот метод!
    g.stroke();
    /*---------------------------------*/
    g.beginPath();
    var tX, tY, bW, bH;
    tX=180; tY=140;
    bW=19; bH=19;
    tX+=0.5; tY+=0.5;
    //должна быть скруглена четверть меньшей стороны
    //вычисляем ширину высоту и радиус
    var rad=bW<bH?bW:bH;
    rad=Math.floor(rad/4);
    var horBord=bW-rad*2;
    var verBord=bH-rad*2;
//1st arc
    g.arc(tX+rad,tY+rad,rad,degToRad(180),degToRad(270),false);
    g.lineTo(tX+rad+horBord, tY);
//2nd arc
    g.arc(tX+horBord+rad,tY+rad,rad,degToRad(270),degToRad(0),false);
    g.lineTo(tX+horBord+rad*2, tY+rad+verBord);
//3rd arc
    g.arc(tX+rad+horBord,tY+rad+verBord,rad,degToRad(0),degToRad(90),false);
    g.lineTo(tX+rad, tY+verBord+rad*2);
//4 arc
    g.arc(tX+rad,tY+rad+verBord,rad,degToRad(90),degToRad(180),false);
    g.lineTo(tX, tY+rad);
    tX-=0.5;tY-=0.5;
    context.fillStyle = getGradient(2,context,tX,tY,tX+bW,tY+bH);
    g.fill();
    //Не забываем про этот метод!
    g.stroke();
    /*---------------------------------*/
    g.beginPath();
    var tX, tY, bW, bH;
    tX=200; tY=140;
    bW=19; bH=19;
    tX+=0.5; tY+=0.5;
    //должна быть скруглена четверть меньшей стороны
    //вычисляем ширину высоту и радиус
    var rad=bW<bH?bW:bH;
    rad=Math.floor(rad/2);
    var horBord=bW-rad*2;
    var verBord=bH-rad*2;
//1st arc
    g.arc(tX+rad,tY+rad,rad,degToRad(180),degToRad(270),false);
    g.lineTo(tX+rad+horBord, tY);
//2nd arc
    g.arc(tX+horBord+rad,tY+rad,rad,degToRad(270),degToRad(0),false);
    g.lineTo(tX+horBord+rad*2, tY+rad+verBord);
//3rd arc
    g.arc(tX+rad+horBord,tY+rad+verBord,rad,degToRad(0),degToRad(90),false);
    g.lineTo(tX+rad, tY+verBord+rad*2);
//4 arc
    g.arc(tX+rad,tY+rad+verBord,rad,degToRad(90),degToRad(180),false);
    g.lineTo(tX, tY+rad);
    tX-=0.5;tY-=0.5;
    context.fillStyle = getGradient(2,context,tX,tY,tX+bW,tY+bH);
    g.fill();
    //Не забываем про этот метод!
    g.stroke();
    /*---------------------------------*/
}

var colorsPresets=new Array();

colorsPresets[0]=[[0, '#f5f6f6'],[0.21, '#dbdce2'],[0.49, '#b8bac6'],[0.8, '#dddfe3'],[1, '#f5f6f6']];
colorsPresets[1]=[[0, '#efc5ca'],[0.5, '#d24b5a'],[0.51, '#ba2737'],[1, '#f18e99']];
colorsPresets[2]=[[0, '#b7deed'],[0.5, '#71ceef'],[0.51, '#21b4e2'],[1, '#b7deed']];
colorsPresets[3]=[[0, '#fceabb'],[0.5, '#fccd4d'],[0.51, '#f8b500'],[1, '#fbdf93']];
colorsPresets[4]=[[0, '#d2ff52'],[0.51, '#21ff00'],[1, '#0b9b01']];
colorsPresets[5]=[[0, '#cb60b3'],[0.5, '#c146a1'],[0.51, '#a80077'],[1, '#db36a4']];
