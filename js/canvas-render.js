/**
 * Created by EL.
 * User: EL
 * Date: 30.10.12
 * Time: 21:03
 * Canvas functions
 */

function cDraw(canvas,ballPos,fH,fW,color,round){
    if (color>10){
        if (color-10>5) {error(2);return;}
    }
    else{
        if (color>5) {error(2);return;}
    }
    var myCanvas = canvas;
    var context = myCanvas.getContext('2d');
    if (color==0){
        context.fillStyle = getGradient(color,context,0,0,fW,fH);
        context.fillRect(ballPos.tX,ballPos.tY,ballPos.bX-ballPos.tX,ballPos.bY-ballPos.tY);
    }else {
        if (round==0){//Без скругления
            context.fillStyle="black";
            context.fillRect(ballPos.tX,ballPos.tY,ballPos.bX-ballPos.tX,ballPos.bY-ballPos.tY);
            context.fillStyle = getGradient(color,context,ballPos.tX+1,ballPos.tY+1,ballPos.bX-1,ballPos.bY-1);
            context.fillRect(ballPos.tX+1,ballPos.tY+1,ballPos.bX-ballPos.tX-2,ballPos.bY-ballPos.tY-2);
        }
        if((round==1)||(round==2)){//скругление четверти или по максимуму
            var roundType=round==1?4:2;//если тип 1 значит делить на 4 (т.е. четверть), если тип 2 то делим на два
            context.beginPath();
            var tX, tY, bW, bH;
            tX=ballPos.tX; tY=ballPos.tY;
            bW=ballPos.bX-ballPos.tX-1; bH=ballPos.bY-ballPos.tY-1;
            tX+=0.5; tY+=0.5;
            //вычисляем ширину высоту и радиус
            var rad=bW<bH?bW:bH;
            rad=Math.floor(rad/roundType);
            var horBord=bW-rad*2;
            var verBord=bH-rad*2;
            context.arc(tX+rad,tY+rad,rad,degToRad(180),degToRad(270),false);
            context.lineTo(tX+rad+horBord, tY);
            context.arc(tX+horBord+rad,tY+rad,rad,degToRad(270),degToRad(0),false);
            context.lineTo(tX+horBord+rad*2, tY+rad+verBord);
            context.arc(tX+rad+horBord,tY+rad+verBord,rad,degToRad(0),degToRad(90),false);
            context.lineTo(tX+rad, tY+verBord+rad*2);
            context.arc(tX+rad,tY+rad+verBord,rad,degToRad(90),degToRad(180),false);
            context.lineTo(tX, tY+rad);
            tX-=0.5;tY-=0.5;
            context.fillStyle = getGradient(color,context,tX,tY,tX+bW,tY+bH);
            context.fill();
            context.stroke();
        }
    }
}

function canvClean(canvas,ballPos,color){
    var myCanvas = canvas;
    var context = myCanvas.getContext('2d');
    context.fillStyle = getGradient(color,context,ballPos.tX,ballPos.tY,ballPos.bX,ballPos.bY);
    context.fillRect(ballPos.tX,ballPos.tY,ballPos.bX-ballPos.tX,ballPos.bY-ballPos.tY);
}

function getGradient(colNum,cntx,x1,y1,x2,y2){
    var gradient = cntx.createLinearGradient(x1, y1, x2, y2);
    if (colNum>colorsPresets.length){return gradient;}
    for (var x=0;x<colorsPresets[colNum].length;x++){
        gradient.addColorStop(colorsPresets[colNum][x][0],colorsPresets[colNum][x][1]);
    }
    return gradient;
}

var colorsPresets=new Array();

colorsPresets[0]=[[0, '#f5f6f6'],[0.21, '#dbdce2'],[0.49, '#b8bac6'],[0.8, '#dddfe3'],[1, '#f5f6f6']];
colorsPresets[1]=[[0, '#efc5ca'],[0.5, '#d24b5a'],[0.51, '#ba2737'],[1, '#f18e99']];
colorsPresets[2]=[[0, '#b7deed'],[0.5, '#71ceef'],[0.51, '#21b4e2'],[1, '#b7deed']];
colorsPresets[3]=[[0, '#fceabb'],[0.5, '#fccd4d'],[0.51, '#f8b500'],[1, '#fbdf93']];
colorsPresets[4]=[[0, '#d2ff52'],[0.51, '#21ff00'],[1, '#0b9b01']];
colorsPresets[5]=[[0, '#cb60b3'],[0.5, '#c146a1'],[0.51, '#a80077'],[1, '#db36a4']];

colorsPresets[11]=[[0, '#f18e99'],[0.49, '#ba2737'],[0.5, '#d24b5a'],[1, '#efc5ca']];
colorsPresets[12]=[[0, '#b7deed'],[0.49, '#21b4e2'],[0.5, '#71ceef'],[1, '#b7deed']];
colorsPresets[13]=[[0, '#fbdf93'],[0.49, '#f8b500'],[0.5, '#fccd4d'],[1, '#fceabb']];
colorsPresets[14]=[[0, '#0b9b01'],[0.49, '#21ff00'],[1, '#d2ff52']];
colorsPresets[15]=[[0, '#db36a4'],[0.49, '#a80077'],[0.5, '#c146a1'],[1, '#cb60b3']];

